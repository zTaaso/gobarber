import Notification from '../schemas/Notification';
import User from '../models/User';

class NotificationController {
    async index(req, res) {
        const isProvider = await User.findOne({
            where: { id: req.userId, provider: true },
        });

        if (!isProvider) {
            return res
                .status(401)
                .json({ error: 'Only providers can load notifications.' });
        }

        const notifications = await Notification.find({
            user: req.userId,
        }).sort({ createdAt: 'desc' });

        return res.json(notifications);
    }

    async update(req, res) {
        const isProvider = await User.findOne({
            where: { id: req.userId, provider: true },
        });

        if (!isProvider) {
            return res
                .status(401)
                .json({ error: 'Only providers can read notifications.' });
        }

        const { id } = req.params;
        const notifications = await Notification.findByIdAndUpdate(
            id,
            {
                read: true,
            },
            { new: true }
        );

        return res.json(notifications);
    }
}

export default new NotificationController();
