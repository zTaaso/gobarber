class AvailableController {
    async index(req, res) {
        return res.json({ oi: 'me chupa' });
    }
}

export default new AvailableController();
