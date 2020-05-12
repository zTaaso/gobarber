import { Router } from 'express';

const routes = Router();

routes.get('/pimba', (req, res) => {
    const { name } = req.body;

    return res.json({ message: `${name} eh nome de viado seu filha da puta` });
});

export default routes;
