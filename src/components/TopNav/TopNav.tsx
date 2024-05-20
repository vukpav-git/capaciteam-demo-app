import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import type { Dispatch } from "redux";

import { COMPANY_NAME } from "../../constants/Constants";
import {
  FILTER_BILLS_FAVORITES,
  UNFILTER_BILLS_FAVORITES,
} from "../../store/actions/ActionTypes";
import { colors } from "../../styles/colors";

const TopNav = () => {
  const dispatch: Dispatch = useDispatch();
  const pages = ["All bills", "Favourited bills"];

  const [activePage, setActivePage] = useState(pages[0]);

  const toggleFavoritesView = (page: string) => {
    if (page !== activePage) {
      if (page === "Favourited bills") {
        dispatch({ type: FILTER_BILLS_FAVORITES });
      } else {
        dispatch({ type: UNFILTER_BILLS_FAVORITES });
      }
    }

    setActivePage(page);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: colors.charcoal,
      }}
    >
      <Container maxWidth="sm">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              fontSize: 24,
              letterSpacing: ".15rem",
              color: colors.lightGreen,
              textDecoration: "none",
            }}
          >
            {COMPANY_NAME}
            <FolderOpenIcon
              sx={{
                position: "relative",
                top: "8px",
              }}
            />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                sx={{
                  my: 2,
                  marginLeft: 1,
                  color: colors.orange,
                  fontWeight: page === activePage ? 700 : 400,
                  opacity: page === activePage ? 1 : 0.6,
                  fontSize: page === activePage ? 16 : 15,
                }}
                onClick={() => toggleFavoritesView(page)}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default TopNav;
