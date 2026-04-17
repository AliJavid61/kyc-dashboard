import { useState, useEffect, useCallback } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, MenuItem, Chip, CircularProgress, Alert, IconButton,
  Tooltip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const API = 'http://localhost:3001/api/kyc';

const DOCUMENT_TYPES  = ['Passport', 'National ID', "Driver's License"];
const STATUSES        = ['Pending', 'In Review', 'Approved', 'Rejected', 'Flagged'];
const RISK_LEVELS     = ['Low', 'Medium', 'High'];

const STATUS_COLOR = {
  Pending:    'warning',
  'In Review':'info',
  Approved:   'success',
  Rejected:   'error',
  Flagged:    'error',
};

const RISK_COLOR = {
  Low:    'success',
  Medium: 'warning',
  High:   'error',
};

const EMPTY_FORM = {
  client_name:   '',
  client_email:  '',
  document_type: '',
  status:        'Pending',
  assigned_to:   '',
  risk_level:    '',
  country:       '',
  notes:         '',
};

// ── shared MUI sx overrides to blend with dashboard dark/light theme ──
const inputSx = {
  '& .MuiInputBase-root':       { color: 'var(--text)' },
  '& .MuiInputLabel-root':      { color: 'var(--muted)' },
  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--border)' },
  '& .MuiSvgIcon-root':         { color: 'var(--muted)' },
  '& .MuiSelect-select':        { color: 'var(--text)' },
  mb: 2,
};

const dialogPaperSx = {
  background:   'var(--card-bg)',
  color:        'var(--text)',
  borderRadius: '12px',
  minWidth:     520,
};

export default function KYCApplications() {
  const [rows, setRows]           = useState([]);
  const [loading, setLoading]     = useState(true);
  const [pageError, setPageError] = useState('');

  // form dialog
  const [dialogOpen, setDialogOpen]   = useState(false);
  const [editingId, setEditingId]     = useState(null); // null = create
  const [form, setForm]               = useState(EMPTY_FORM);
  const [formError, setFormError]     = useState('');
  const [formLoading, setFormLoading] = useState(false);

  // delete dialog
  const [deleteId, setDeleteId]       = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  // ── fetch all ──────────────────────────────────────────────────────────
  const fetchAll = useCallback(async () => {
    setLoading(true);
    setPageError('');
    try {
      const res  = await fetch(API);
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      setRows(json.data);
    } catch (err) {
      setPageError(err.message || 'Database error, please try again');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  // ── form helpers ───────────────────────────────────────────────────────
  function openCreate() {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setFormError('');
    setDialogOpen(true);
  }

  function openEdit(row) {
    setForm({
      client_name:   row.client_name   ?? '',
      client_email:  row.client_email  ?? '',
      document_type: row.document_type ?? '',
      status:        row.status        ?? 'Pending',
      assigned_to:   row.assigned_to   ?? '',
      risk_level:    row.risk_level    ?? '',
      country:       row.country       ?? '',
      notes:         row.notes         ?? '',
    });
    setEditingId(row.id);
    setFormError('');
    setDialogOpen(true);
  }

  function handleFieldChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    setFormError('');
    setFormLoading(true);
    try {
      const url    = editingId ? `${API}/${editingId}` : API;
      const method = editingId ? 'PUT' : 'POST';
      const res    = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!json.success) {
        setFormError(json.message);
        return;
      }
      setDialogOpen(false);
      fetchAll();
    } catch {
      setFormError('Database error, please try again');
    } finally {
      setFormLoading(false);
    }
  }

  // ── delete helpers ─────────────────────────────────────────────────────
  function openDelete(id) {
    setDeleteId(id);
    setDeleteError('');
  }

  async function handleDelete() {
    setDeleteLoading(true);
    setDeleteError('');
    try {
      const res  = await fetch(`${API}/${deleteId}`, { method: 'DELETE' });
      const json = await res.json();
      if (!json.success) {
        setDeleteError(json.message);
        return;
      }
      setDeleteId(null);
      fetchAll();
    } catch {
      setDeleteError('Database error, please try again');
    } finally {
      setDeleteLoading(false);
    }
  }

  // ── render ─────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Page header ── */}
      <div className="page-header">
        <div>
          <h2>KYC Applications</h2>
          <p>All client KYC records — create, edit, or remove entries</p>
        </div>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={openCreate}
          sx={{ background: 'var(--blue)', textTransform: 'none', fontWeight: 600, borderRadius: '8px', boxShadow: 'none', '&:hover': { background: 'var(--blue)', filter: 'brightness(1.12)', boxShadow: 'none' } }}
        >
          Add New
        </Button>
      </div>

      {/* ── Page-level error ── */}
      {pageError && (
        <Alert severity="error" sx={{ mb: 2, borderRadius: '8px' }} onClose={() => setPageError('')}>
          {pageError}
        </Alert>
      )}

      {/* ── Table ── */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}>
            <CircularProgress size={32} sx={{ color: 'var(--blue)' }} />
          </div>
        ) : (
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ '& th': { color: 'var(--muted)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)', background: 'var(--card-bg)', whiteSpace: 'nowrap' } }}>
                  <TableCell>Client</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Document</TableCell>
                  <TableCell>Country</TableCell>
                  <TableCell>Risk</TableCell>
                  <TableCell>Assigned To</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center" sx={{ color: 'var(--muted)', py: 4, borderBottom: 'none' }}>
                      No records yet. Click "Add New" to create one.
                    </TableCell>
                  </TableRow>
                ) : (
                  rows.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ '& td': { borderBottom: '1px solid var(--border)', color: 'var(--text)', fontSize: 13, py: 1.2 }, '&:last-child td': { borderBottom: 'none' }, '&:hover': { background: 'var(--card-hover)' } }}
                    >
                      <TableCell sx={{ fontWeight: 600 }}>{row.client_name}</TableCell>
                      <TableCell sx={{ color: 'var(--muted)' }}>{row.client_email}</TableCell>
                      <TableCell>{row.document_type || <span style={{ color: 'var(--muted)' }}>—</span>}</TableCell>
                      <TableCell>{row.country || <span style={{ color: 'var(--muted)' }}>—</span>}</TableCell>
                      <TableCell>
                        {row.risk_level ? (
                          <Chip label={row.risk_level} size="small" color={RISK_COLOR[row.risk_level] || 'default'} sx={{ fontWeight: 600, fontSize: 11 }} />
                        ) : <span style={{ color: 'var(--muted)' }}>—</span>}
                      </TableCell>
                      <TableCell>{row.assigned_to || <span style={{ color: 'var(--muted)' }}>Unassigned</span>}</TableCell>
                      <TableCell>
                        <Chip label={row.status} size="small" color={STATUS_COLOR[row.status] || 'default'} sx={{ fontWeight: 600, fontSize: 11 }} />
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="Edit">
                          <IconButton size="small" onClick={() => openEdit(row)} sx={{ color: 'var(--blue)', mr: 0.5 }}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton size="small" onClick={() => openDelete(row.id)} sx={{ color: 'var(--danger)' }}>
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>

      {/* ── Create / Edit dialog ── */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} PaperProps={{ sx: dialogPaperSx }}>
        <form onSubmit={handleFormSubmit}>
          <DialogTitle sx={{ borderBottom: '1px solid var(--border)', pb: 2, fontWeight: 700 }}>
            {editingId ? 'Edit Application' : 'New KYC Application'}
          </DialogTitle>

          <DialogContent sx={{ pt: 3, display: 'flex', flexDirection: 'column', gap: 0 }}>
            {formError && (
              <Alert severity="error" sx={{ mb: 2, borderRadius: '8px' }}>
                {formError}
              </Alert>
            )}

            <TextField required label="Client Name" name="client_name" value={form.client_name} onChange={handleFieldChange} size="small" sx={inputSx} />
            <TextField required label="Client Email" name="client_email" type="email" value={form.client_email} onChange={handleFieldChange} size="small" sx={inputSx} />

            <TextField select label="Document Type" name="document_type" value={form.document_type} onChange={handleFieldChange} size="small" sx={inputSx}>
              <MenuItem value=""><em>— None —</em></MenuItem>
              {DOCUMENT_TYPES.map((d) => <MenuItem key={d} value={d}>{d}</MenuItem>)}
            </TextField>

            <TextField select label="Status" name="status" value={form.status} onChange={handleFieldChange} size="small" sx={inputSx}>
              {STATUSES.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
            </TextField>

            <TextField select label="Risk Level" name="risk_level" value={form.risk_level} onChange={handleFieldChange} size="small" sx={inputSx}>
              <MenuItem value=""><em>— None —</em></MenuItem>
              {RISK_LEVELS.map((r) => <MenuItem key={r} value={r}>{r}</MenuItem>)}
            </TextField>

            <TextField label="Assigned To" name="assigned_to" value={form.assigned_to} onChange={handleFieldChange} size="small" sx={inputSx} />
            <TextField label="Country" name="country" value={form.country} onChange={handleFieldChange} size="small" sx={inputSx} />
            <TextField label="Notes" name="notes" value={form.notes} onChange={handleFieldChange} size="small" multiline rows={3} sx={{ ...inputSx, mb: 0 }} />
          </DialogContent>

          <DialogActions sx={{ borderTop: '1px solid var(--border)', px: 3, py: 2, gap: 1 }}>
            <Button onClick={() => setDialogOpen(false)} disabled={formLoading} sx={{ color: 'var(--muted)', textTransform: 'none' }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" disabled={formLoading} sx={{ background: 'var(--blue)', textTransform: 'none', fontWeight: 600, boxShadow: 'none', '&:hover': { background: 'var(--blue)', filter: 'brightness(1.12)', boxShadow: 'none' } }}>
              {formLoading ? <CircularProgress size={18} sx={{ color: '#fff' }} /> : editingId ? 'Save Changes' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* ── Delete confirmation dialog ── */}
      <Dialog open={!!deleteId} onClose={() => setDeleteId(null)} PaperProps={{ sx: { ...dialogPaperSx, minWidth: 360 } }}>
        <DialogTitle sx={{ fontWeight: 700 }}>Delete Application</DialogTitle>
        <DialogContent>
          <p style={{ color: 'var(--muted)', fontSize: 14 }}>
            This action cannot be undone. Are you sure you want to delete this record?
          </p>
          {deleteError && (
            <Alert severity="error" sx={{ mt: 2, borderRadius: '8px' }}>{deleteError}</Alert>
          )}
        </DialogContent>
        <DialogActions sx={{ borderTop: '1px solid var(--border)', px: 3, py: 2, gap: 1 }}>
          <Button onClick={() => setDeleteId(null)} disabled={deleteLoading} sx={{ color: 'var(--muted)', textTransform: 'none' }}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={handleDelete} disabled={deleteLoading} sx={{ textTransform: 'none', fontWeight: 600, boxShadow: 'none' }}>
            {deleteLoading ? <CircularProgress size={18} sx={{ color: '#fff' }} /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
