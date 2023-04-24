import express from 'express';

const app = express();
const port = 5000;

app.get('/api/resources', () => {
    console.log(`Server running on port ${port}`);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});