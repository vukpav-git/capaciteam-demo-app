import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(4),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(2),
  },
}));

interface IBillDetailsModalProps {
  isOpen: boolean;
  handleClose(): void;
  billNo: string;
  billType: string;
  billStatus: string;
  billSponsor: string;
  favorites: boolean;
}

const BillDetailsModal = ({
  isOpen,
  handleClose,
  billNo,
  billType,
  billStatus,
  billSponsor,
  favorites,
}: IBillDetailsModalProps) => {
  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="dialog-title"
      open={isOpen}
      fullWidth
    >
      <DialogTitle fontSize={30} sx={{ m: 0, p: 2 }} id="dialog-title">
        Bill #{billNo} Details
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <Typography gutterBottom>
          <strong>Bill number:</strong> {billNo}
        </Typography>
        <Typography gutterBottom>
          <strong>Bill type:</strong> {billType}
        </Typography>
        <Typography gutterBottom>
          <strong>Bill status:</strong> {billStatus}
        </Typography>
        <Typography gutterBottom>
          <strong>Bill sponsor:</strong> {billSponsor}
        </Typography>
        <Typography gutterBottom>
          <strong>Favorites:</strong> {favorites ? "Yes" : "No"}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default BillDetailsModal;
