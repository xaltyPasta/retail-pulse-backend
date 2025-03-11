import { Request, Response } from 'express';
import { addJob, getJobStatusById } from '../utils/jobQueue';
import { getStoreById } from '../utils/csvLoader';

const submitJob = async (req: Request, res: Response): Promise<any> => {
    try {
        const { count, visits } = req.body;

        if (!count || !visits || count !== visits.length) {
            return res.status(400).json({ error: 'Invalid request payload' });
        }

        for (const visit of visits) {
            if (!getStoreById(visit.store_id)) {
                return res.status(400).json({ error: `Invalid store_id: ${visit.store_id}` });
            }
        }

        const jobId = addJob(visits);
        return res.status(201).json({ job_id: jobId });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getJobStatus = async (req: Request, res: Response): Promise<any> => {
    try {
        const jobId = req.query.jobid as string;

        if (!jobId) return res.status(400).json({ error: 'Missing jobid' });

        const status = getJobStatusById(jobId);
        return res.status(200).json(status);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default { submitJob, getJobStatus };
