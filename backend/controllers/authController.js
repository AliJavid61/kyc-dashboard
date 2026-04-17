const bcrypt = require('bcrypt');
const prisma = require('../prisma/client');

const SALT_ROUNDS = 12;

// POST /api/auth/register
const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({
      success: false,
      data: null,
      message: 'All fields are required',
    });
  }

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({
        success: false,
        data: null,
        message: 'Email already registered',
      });
    }

    const password_hash = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await prisma.user.create({
      data: { name, email, password_hash, role },
    });

    return res.status(201).json({
      success: true,
      data: { id: user.id, name: user.name, role: user.role },
      message: 'User registered successfully',
    });
  } catch (err) {
    console.error('[register]', err);
    return res.status(500).json({
      success: false,
      data: null,
      message: 'Registration failed. Please try again.',
    });
  }
};

// POST /api/auth/login
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      data: null,
      message: 'All fields are required',
    });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({
        success: false,
        data: null,
        message: 'No account found with this email',
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        data: null,
        message: 'Incorrect password',
      });
    }

    return res.status(200).json({
      success: true,
      data: { name: user.name, role: user.role },
      message: 'Login successful',
    });
  } catch (err) {
    console.error('[login]', err);
    return res.status(500).json({
      success: false,
      data: null,
      message: 'Login failed. Please try again.',
    });
  }
};

module.exports = { register, login };
