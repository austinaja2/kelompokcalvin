process.env.NODE_ENV = (process.env.NODE_ENV || 'development').toLowerCase();

const dotenv = require('dotenv');

const envFound = dotenv.config({ path: './public/config/.env' });
if (envFound.error) {
  throw new Error('Could not find .env file');
}

module.exports = {
  port: process.env.PORT || 5000,
  jwtSecretKey: process.env.JWT_SECRET_KEY || '',
};