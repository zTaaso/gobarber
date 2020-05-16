import * as Yup from 'yup';
import Appointment from '../models/Appointment';
import User from '../models/User';

class AppointmentController {
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

        const isProvider = await User.findOne({
            where: {
                id: provider_id,
                provider: true,
            },
        });

        if (!isProvider) {
            return res
                .status(401)
                .json({ err: "The received id is not a provider's one." });
        }

        const appointment = await Appointment.create({
            date,
            provider_id,
            user_id: req.userId,
        });

        return res.json(appointment);
    }
}

export default new AppointmentController();
