const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());

// App routes
app.use('/api/v1/resource-a', require('./controllers/resource-a'));
app.use('/api/v1/resource-b', require('./controllers/resource-b'));
app.use('/api/v1/resource-c', require('./controllers/resource-c'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
