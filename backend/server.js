



const express = require('express');
const cors = require('cors');
const aiRoutes = require('../backend/src/routes/ai.routes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Apply middlewares
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Increased limit for larger code submissions

app.get('/', (req, res) => {
    res.send('Code Review API is running');
});

app.use('/ai', aiRoutes);

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke! ' + err.message);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});




