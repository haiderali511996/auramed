const express = require('express');
const path = require('path');

function createApi() {
  const app = express();
  app.disable('x-powered-by');
  app.use(express.json({ limit: '100kb' }));
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
  for (const route of ['admin', 'products', 'categories', 'orders', 'blogs', 'auth', 'contact', 'upload']) {
    app.use(`/api/${route}`, require(`./routes/${route}`));
  }
  app.get('/api/health', (req, res) => res.json({ status: 'ok', brand: 'AuraMed Pharma' }));
  app.use('/api', (req, res) => res.status(404).json({ message: 'API route not found.' }));
  return app;
}
module.exports = { createApi };

if (require.main === module) {
  require('dotenv').config({ path: path.join(__dirname, '../.env') });
  const { connectDatabase } = require('./config/database');
  connectDatabase().then(() => createApi().listen(process.env.PORT || 5001))
    .catch(() => { console.error('AuraMed API startup failed. Check database and JWT configuration.'); process.exit(1); });
}
