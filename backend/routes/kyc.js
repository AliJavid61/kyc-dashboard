const express = require('express');
const router = express.Router();
const {
  getAllApplications,
  createApplication,
  updateApplication,
  deleteApplication,
} = require('../controllers/kycController');

router.get('/', getAllApplications);
router.post('/', createApplication);
router.put('/:id', updateApplication);
router.delete('/:id', deleteApplication);

module.exports = router;
