import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import notesRouter from './routes/api/notes';
const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
const errorHandler = (err, req, res, next) => {
    res.status(500).json({ message: err.message });
};
app.use('/api/notes', notesRouter);
app.use('/error', errorHandler);
app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
});
export default app;
