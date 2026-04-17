const prisma = require('../prisma/client');

const getHealth = async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok', db: 'connected' });
  } catch (error) {
    res.status(500).json({ status: 'error', db: 'unreachable', message: error.message });
  }
};

module.exports = { getHealth };
