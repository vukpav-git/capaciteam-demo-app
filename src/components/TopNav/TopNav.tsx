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
    setActivePage(page);

    if (activePage === "Favourited bills") {
      dispatch({ type: UNFILTER_BILLS_FAVORITES });
    } else {
      dispatch({ type: FILTER_BILLS_FAVORITES });
    }
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="sm">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "sans-serif",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: colors.lightGreen,
              textDecoration: "none",
            }}
          >
            {COMPANY_NAME}
            <FolderOpenIcon
              sx={{
                position: "relative",
                top: "4px",
              }}
            />
          </Typography>
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {COMPANY_NAME}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                sx={{
                  my: 2,
                  marginLeft: 1,
                  color: page === activePage ? colors.orange : colors.white,
                  fontWeight: page === activePage ? 700 : 400,
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
