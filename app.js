const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const next = require('next');
const { connectDatabase } = require('./server/config/database');
const { createApi } = require('./server');

async function start() {
  await connectDatabase();
  const nextApp = next({ dev: process.env.NODE_ENV !== 'production', dir: path.join(__dirname, 'client') });
  await nextApp.prepare();
  const app = createApi();
  const handle = nextApp.getRequestHandler();
  app.all('*', (req, res) => handle(req, res));
  app.listen(process.env.PORT || 3000, () => console.log('AuraMed application ready'));
}
start().catch(() => {
  console.error('AuraMed startup failed. Check MongoDB, JWT_SECRET, and the production build.');
  process.exit(1);
});
