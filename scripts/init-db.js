const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { connectDatabase } = require('../server/config/database');
const User = require('../server/models/User');
const Category = require('../server/models/Category');
const Product = require('../server/models/Product');
const Blog = require('../server/models/Blog');
const Order = require('../server/models/Order');

async function initialize() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password || password.length < 12) throw new Error('Set ADMIN_EMAIL and ADMIN_PASSWORD (at least 12 characters).');
  await connectDatabase();
  await Promise.all([User.init(), Category.init(), Product.init(), Blog.init(), Order.init()]);
  const existing = await User.findOne({ email });
  if (existing && existing.role !== 'admin') throw new Error('This email already belongs to a non-admin. Choose a different administrator email.');
  if (!existing) {
    // Hash explicitly: update operations do not run the model save hook.
    await User.updateOne({ email }, { $setOnInsert: {
      name: process.env.ADMIN_NAME || 'AuraMed Administrator', email,
      password: await bcrypt.hash(password, 12), role: 'admin', isVerified: true,
    } }, { upsert: true });
  }
  for (const [name, slug, icon] of [
    ['Medicines', 'medicines', '💊'], ['Syrups', 'syrups', '🍶'],
    ['Creams & Ointments', 'creams', '🧴'], ['Serums', 'serums', '💧'],
    ['Vitamins & Supplements', 'supplements', '🌿'], ['Skin Care', 'skincare', '✨'],
  ]) {
    await Category.updateOne({ slug }, { $setOnInsert: { name, slug, icon, color: '#003b95', isActive: true } }, { upsert: true });
  }
  console.log('AuraMed database initialized. Existing records and passwords were preserved.');
}
initialize().catch((err) => {
  // Avoid printing connection errors containing private credentials.
  console.error('Database initialization failed. Check connectivity and administrator settings.');
  process.exitCode = 1;
}).finally(() => mongoose.disconnect());
