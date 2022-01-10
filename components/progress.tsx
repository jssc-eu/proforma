import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography';

export default function Progress({
  invoiceId,
  eventId,
  loading,
  open,
  onClose
}) {

  return (
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        { loading && ("Creating proforma invoice...")}
        { !loading && ("Proforma invoice completed")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"  sx={{ fontSize: 16 }} color="text.primary">
            The proforma invoice with the id <strong>{invoiceId}</strong> was created successfully.
          </DialogContentText>
          <DialogContentText sx={{ marginTop: 1,  fontSize: 16 }} color="text.secondary">
            Click the link below to download the invoice pdf.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} autoFocus>
            { loading && (
                <>
                  <CircularProgress
                    color="inherit"
                    size={18}
                    sx={{
                      marginRight: '1rem',
                    }}/>
                  Working...
                </>
              ) }
              { !loading && (
                <a href={`/api/invoice/${invoiceId}.pdf?eventId=${eventId}`} download>
                  Download Invoice
                </a>
              ) }
          </Button>
        </DialogActions>
      </Dialog>
  );
}
