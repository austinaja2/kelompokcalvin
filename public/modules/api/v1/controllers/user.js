const jwt = require('jsonwebtoken');

const config = require('../../../core/config');
const { Users } = require('../../../models');
const { Jobs } = require('../../../models');
const { hashPassword, comparePassword } = require('../../../helpers/crypto');

async function create(email, fullName, password) {
  const hashedPassword = await hashPassword(password);

  const newUser = new Users({
    email,
    full_name: fullName,
    password: hashedPassword,
  });

  return newUser.save();
}

async function createJobs(title, description) {
  const newJobs = new Jobs({
    title,
    description,
  });

  return newJobs.save();
}

async function findByEmail(email) {
  return Users.findOne({ email }).exec();
}

async function login(email, password) {
  const user = await findByEmail(email);
  if (!user) {
    return null;
  }

  // compare password
  const passwordMatched = await comparePassword(
    password,
    user.password,
  );

  return passwordMatched ? user : null;
}

async function generateToken(id) {
  const payload = { id };
  return jwt.sign(payload, config.jwtSecretKey);
}

async function findById(id) {
  return Users.findById(id);
}

async function updateUser(id) {
  //get the user
  const userToUpdate = await Users.findById(id)
  //check if the user is already an admin
  if(userToUpdate.role === 'Admin'){
      throw new Error('The user is already an admin')
  }
  userToUpdate.role = "Admin"
  userToUpdate.save()

  return userToUpdate
}

module.exports = {
  create,
  findByEmail,
  login,
  generateToken,
  findById,
  updateUser,
  createJobs
};
