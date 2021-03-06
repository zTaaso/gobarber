import * as Yup from 'yup';
import { isBefore, parseISO, startOfHour, format, subHours } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Appointment from '../models/Appointment';
import User from '../models/User';
import File from '../models/File';
import Notification from '../schemas/Notification';

import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';

class AppointmentController {
    async index(req, res) {
        const { page = 1 } = req.query;

        const appointments = await Appointment.findAll({
            where: {
                user_id: req.userId,
                canceled_at: null,
            },
            limit: 20,
            offset: (page - 1) * 20,
            attributes: ['id', 'date', 'past', 'cancelable'],
            include: [
                {
                    model: User,
                    as: 'provider',
                    attributes: ['id', 'name'],
                    include: [
                        {
                            model: File,
                            as: 'avatar',
                            attributes: ['id', 'path', 'url'],
                        },
                    ],
                },
            ],
        });

        return res.json(appointments);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            date: Yup.date().required(),
            provider_id: Yup.number().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                err: 'Validation failed.',
            });
        }

        const { provider_id, date } = req.body;

        // Checks if user is trying to create an appointment with himself.
        if (provider_id === req.userId) {
            return res.status(400).json({
                error: "You can't create an appointment with yourself.",
            });
        }

        // Checks if the id is from a  provider
        const isProvider = await User.findOne({
            where: {
                id: provider_id,
                provider: true,
            },
        });

        if (!isProvider) {
            return res
                .status(401)
                .json({ error: "The received id is not a provider's one." });
        }

        const hourStart = startOfHour(parseISO(date));

        // Check for past dates
        if (isBefore(hourStart, new Date())) {
            return res.status(400).json({ error: 'Invalid date' });
        }

        const checkAvailability = await Appointment.findOne({
            where: {
                provider_id,
                canceled_at: null,
                date: hourStart,
            },
        });

        if (checkAvailability) {
            return res
                .status(400)
                .json({ error: 'Appointment date not avaliable.' });
        }

        const appointment = await Appointment.create({
            date: hourStart,
            provider_id,
            user_id: req.userId,
        });

        const user = await User.findByPk(req.userId);
        const formattedDate = format(
            hourStart,
            "'dia' dd 'de' MMMM', ás' H:mm'h'",
            {
                locale: pt,
            }
        );

        // await Notification.create({
        //     content: `Novo agendamento de ${user.name} para o ${formattedDate}.`,
        //     user: provider_id,
        // });

        return res.json(appointment);
    }

    async delete(req, res) {
        const { id } = req.params;

        const appointment = await Appointment.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'provider',
                    attributes: ['email', 'name'],
                },
                {
                    model: User,
                    as: 'user',
                    attributes: ['name'],
                },
            ],
        });

        if (!appointment) {
            return res
                .status(400)
                .json({ error: 'This appointment does not exist.' });
        }

        if (appointment.canceled_at) {
            return res
                .status(400)
                .json({ error: 'This appointment is already canceled.' });
        }

        if (appointment.user_id !== req.userId) {
            return res.status(401).json({
                error: "You don't have permission to cancel this appointment.",
            });
        }

        const subHour = subHours(appointment.date, 2);

        if (isBefore(subHour, new Date())) {
            return res
                .status(401)
                .json({ error: "You can't cancel this appointment anymore." });
        }

        appointment.canceled_at = new Date();
        await appointment.save();

        // await Queue.add(CancellationMail.key, {
        //     appointment,
        // });

        return res.json(appointment);
    }
}

export default new AppointmentController();
