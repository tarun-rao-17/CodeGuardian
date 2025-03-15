// const express = require('express');
// const cors = require('cors');
// const aiRoutes = require('./routes/ai.routes');

// const app = express();

// // Apply middlewares
// app.use(cors());
// app.use(express.json());

// app.get('/', (req, res) => {
//     res.send('Hello World');
// });

// app.use('/ai', aiRoutes);

// module.exports = app;



const express = require('express');
const cors = require('cors');
const aiRoutes = require('./routes/ai.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/ai', aiRoutes);

module.exports = app;