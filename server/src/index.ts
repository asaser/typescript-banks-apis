import express, { Request, Response } from "express";
import cors from 'cors';
import monzoRoutes from './routes/monzoRoutes';
import sterlingRoutes from './routes/sterlingRoutes';
import revolutRoutes from './routes/revolutRoutes';
import transactionsRoutes from './routes/transactionsRoutes';
import createHttpError, { isHttpError } from 'http-errors';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use("/api/monzo", monzoRoutes);
app.use("/api/sterling", sterlingRoutes);
app.use("/api/revolut", revolutRoutes);
app.use("/transactions", transactionsRoutes);

app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found"));
});

app.use((error: unknown, req: Request, res: Response) => {
    let errorMessage = "An unknow error occured";
    let statusCode = 500;
    
    if(isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage})
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

export default app;