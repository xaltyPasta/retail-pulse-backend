import { processImages } from '../services/imageProcessor';
import { v4 as uuidv4 } from 'uuid';

interface Job {
    jobId: string;
    status: 'ongoing' | 'completed' | 'failed';
    error?: { store_id: string; error: string }[];
}

const jobs: Record<string, Job> = {};

export const addJob = (visits: any[]): string => {
    const jobId = uuidv4();
    jobs[jobId] = { jobId, status: 'ongoing' };

    processImages(jobId, visits)
        .then(() => (jobs[jobId].status = 'completed'))
        .catch((error) => {
            jobs[jobId].status = 'failed';
            jobs[jobId].error = error;
        });

    return jobId;
};

export const getJobStatusById = (jobId: string) => jobs[jobId] || { error: 'Job not found' };
