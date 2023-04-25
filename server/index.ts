import express, {Request, Response, NextFunction } from 'express';
import monzoRoutes from './routes/monzoRoutes';
import sterlingRoutes from './routes/sterlingRoutes';
import createHttpError from 'http-errors';

const app = express();
const port = 5000;

app.use(express.json());

app.use("/api/monzo", monzoRoutes);
app.use("/api/sterling", sterlingRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
    next(createHttpError(404, "Endpoint not found"));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

export default app;