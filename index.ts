import express from 'express';
import bodyParser from 'body-parser';
import { calculateExercises } from './exerciseCalculator';
import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';

(express()).use('/api/patients', patientsRouter);


(express()).use('/api/diagnoses', diagnosesRouter);


const PORT = 3001;

(express()).get('/api/ping', (_req, res) => {
    res.send('pong');
});

(express()).listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


(express()).use(bodyParser.json());

(express()).post('/exercises', (req, res) => {
        const { daily_exercises, target }: any = req.body;

        if (!daily_exercises || target === undefined) {
            return res.status(400).json({ error: 'parameters missing' });
        }

        if (!Array.isArray(daily_exercises) ||
            daily_exercises.some(d => typeof d !== 'number') ||
            typeof target !== 'number') {
            return res.status(400).json({ error: 'malformatted parameters' });
        }

        const result = calculateExercises(daily_exercises, target);
        return res.json(result);
    });

