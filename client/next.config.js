const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

/** @type {import('next').NextConfig} */
module.exports = {
  // cPanel runs the root custom server; standalone output is incompatible with it.
  outputFileTracingRoot: path.join(__dirname, '..'),
  experimental: { cpus: 1, workerThreads: true },
  images: { unoptimized: true },
};
