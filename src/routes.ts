import express, { Request, Response, NextFunction } from 'express';
import jobController from './controllers/jobController';

const router = express.Router();

router.use(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        switch (req.path) {
            case '/submit':
                if (req.method === 'POST') return await jobController.submitJob(req, res);
                break;

            case '/status':
                if (req.method === 'GET') return await jobController.getJobStatus(req, res);
                break;

            default:
                return res.status(404).json({ error: 'Endpoint not found' });
        }

        return res.status(405).json({ error: `Method ${req.method} not allowed for ${req.path}` });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
