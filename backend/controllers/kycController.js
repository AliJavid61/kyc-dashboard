const prisma = require('../prisma/client');

// GET /api/kyc
const getAllApplications = async (req, res) => {
  try {
    const applications = await prisma.kycApplication.findMany({
      orderBy: { created_at: 'desc' },
    });

    return res.status(200).json({
      success: true,
      data: applications,
      message: 'Applications retrieved successfully',
    });
  } catch (err) {
    console.error('[getAllApplications]', err);
    return res.status(500).json({
      success: false,
      data: null,
      message: 'Database error, please try again',
    });
  }
};

// POST /api/kyc
const createApplication = async (req, res) => {
  const {
    client_name,
    client_email,
    document_type,
    status,
    assigned_to,
    risk_level,
    country,
    notes,
  } = req.body;

  if (!client_name) {
    return res.status(400).json({
      success: false,
      data: null,
      message: 'Field client_name is required',
    });
  }

  if (!client_email) {
    return res.status(400).json({
      success: false,
      data: null,
      message: 'Field client_email is required',
    });
  }

  try {
    const application = await prisma.kycApplication.create({
      data: {
        client_name,
        client_email,
        document_type: document_type ?? null,
        status: status ?? 'Pending',
        assigned_to: assigned_to ?? null,
        risk_level: risk_level ?? null,
        country: country ?? null,
        notes: notes ?? null,
      },
    });

    return res.status(201).json({
      success: true,
      data: application,
      message: 'Application created successfully',
    });
  } catch (err) {
    console.error('[createApplication]', err);
    return res.status(500).json({
      success: false,
      data: null,
      message: 'Database error, please try again',
    });
  }
};

// PUT /api/kyc/:id
const updateApplication = async (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      data: null,
      message: 'Invalid id',
    });
  }

  const {
    client_name,
    client_email,
    document_type,
    status,
    assigned_to,
    risk_level,
    country,
    notes,
  } = req.body;

  try {
    const existing = await prisma.kycApplication.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({
        success: false,
        data: null,
        message: 'Record not found',
      });
    }

    const updated = await prisma.kycApplication.update({
      where: { id },
      data: {
        ...(client_name !== undefined && { client_name }),
        ...(client_email !== undefined && { client_email }),
        ...(document_type !== undefined && { document_type }),
        ...(status !== undefined && { status }),
        ...(assigned_to !== undefined && { assigned_to }),
        ...(risk_level !== undefined && { risk_level }),
        ...(country !== undefined && { country }),
        ...(notes !== undefined && { notes }),
      },
    });

    return res.status(200).json({
      success: true,
      data: updated,
      message: 'Application updated successfully',
    });
  } catch (err) {
    console.error('[updateApplication]', err);
    return res.status(500).json({
      success: false,
      data: null,
      message: 'Database error, please try again',
    });
  }
};

// DELETE /api/kyc/:id
const deleteApplication = async (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      data: null,
      message: 'Invalid id',
    });
  }

  try {
    const existing = await prisma.kycApplication.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({
        success: false,
        data: null,
        message: 'Record not found',
      });
    }

    await prisma.kycApplication.delete({ where: { id } });

    return res.status(200).json({
      success: true,
      data: null,
      message: 'Application deleted successfully',
    });
  } catch (err) {
    console.error('[deleteApplication]', err);
    return res.status(500).json({
      success: false,
      data: null,
      message: 'Database error, please try again',
    });
  }
};

module.exports = {
  getAllApplications,
  createApplication,
  updateApplication,
  deleteApplication,
};
