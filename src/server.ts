import express from 'express';
import { loadStoresFromCSV } from './utils/csvLoader';
import routes from './routes';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Load CSV before starting server
loadStoresFromCSV().then(() => {
    console.log('Stores data loaded from CSV');
    app.use('/api', routes);
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((err) => {
    console.error('Error loading stores data:', err);
});
