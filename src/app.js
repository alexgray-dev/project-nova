const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const usersRouter = require('./routes/users');

const app = express();

app.use(express.json());
app.use(logger);
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/api/users', usersRouter);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Project Nova listening on port ${PORT}`);
  });
}

module.exports = app;
