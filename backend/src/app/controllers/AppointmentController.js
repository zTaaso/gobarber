import * as Yup from 'yup';
import { isBefore, parseISO, startOfHour } from 'date-fns';

import Appointment from '../models/Appointment';
import User from '../models/User';
import File from '../models/File';

class AppointmentController {
    async index(req, res) {
        const appointments = await Appointment.findAll({
            where: {
                user_id: req.userId,
                canceled_at: null,
            },
            attributes: ['id', 'date'],
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

        return res.json(appointment);
    }
}

export default new AppointmentController();
