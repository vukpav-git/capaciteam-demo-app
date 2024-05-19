import CloseIcon from "@mui/icons-material/Close";
import { Box, Tab, Tabs } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";
import type { Dispatch } from "redux";

import type { TLanguage } from "../../models/Types";
import { SupportedLanguages } from "../../models/Types";
import { CHANGE_LOCALE } from "../../store/actions/ActionTypes";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(2),
  },
}));

const tabProps = (index: number) => {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
};

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
  const [value, setValue] = useState(0);
  const dispatch: Dispatch = useDispatch();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    const newLocale: TLanguage = newValue === 0 ? "en" : "ga";
    dispatch({ type: CHANGE_LOCALE, payload: newLocale });
  };

  const handleCloseDialog = () => {
    setValue(0);
    dispatch({ type: CHANGE_LOCALE, payload: "en" });
    handleClose();
  };

  return (
    <BootstrapDialog
      onClose={handleCloseDialog}
      aria-labelledby="dialog-title"
      open={isOpen}
      fullWidth
    >
      <DialogTitle fontSize={28} sx={{ m: 0, p: 2 }} id="dialog-title">
        <FormattedMessage id="modal.title" /> #{billNo}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleCloseDialog}
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
        <Box marginBottom="24px">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="language tabs"
          >
            <Tab label={SupportedLanguages.English} {...tabProps(0)} />
            <Tab label={SupportedLanguages.Gaeilge} {...tabProps(1)} />
          </Tabs>
        </Box>
        <Typography gutterBottom>
          <strong>
            <FormattedMessage id="bill.number" />:
          </strong>{" "}
          {billNo}
        </Typography>
        <Typography gutterBottom>
          <strong>
            <FormattedMessage id="bill.type" />:
          </strong>{" "}
          {billType}
        </Typography>
        <Typography gutterBottom>
          <strong>
            <FormattedMessage id="bill.status" />:
          </strong>{" "}
          {billStatus}
        </Typography>
        <Typography gutterBottom>
          <strong>
            <FormattedMessage id="bill.sponsor" />:
          </strong>{" "}
          {billSponsor}
        </Typography>
        <Typography gutterBottom>
          <strong>
            <FormattedMessage id="bill.favorites" />:
          </strong>{" "}
          {favorites ? (
            <FormattedMessage id="yes" />
          ) : (
            <FormattedMessage id="no" />
          )}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCloseDialog}>
          <FormattedMessage id="modal.close" />
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default BillDetailsModal;
