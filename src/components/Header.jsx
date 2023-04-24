import { useState } from "react";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AndroidIcon from "@mui/icons-material/Android";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import {
  clearCredentials,
  selectCurrentUser,
} from "../redux/features/auth/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const currentUser = useSelector(selectCurrentUser);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(clearCredentials());
    navigate("/");
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const userButton = () => {
    if (currentUser) {
      return (
        <>
          <Button
            onClick={handleOpenNavMenu}
            endIcon={<KeyboardArrowDownIcon />}
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#673ab7",
              "&:hover": {
                backgroundColor: "#512da8",
              },
            }}
          >
            {currentUser.username}
          </Button>

          <Menu
            sx={{ mt: "35px" }}
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            keepMounted
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </>
      );
    } else {
      return (
        <Button
          component={RouterLink}
          variant="contained"
          size="small"
          to="/login"
          sx={{
            backgroundColor: "#673ab7",
            "&:hover": {
              backgroundColor: "#512da8",
            },
          }}
        >
          Login
        </Button>
      );
    }
  };

  return (
    <AppBar position="fixed">
      <Container>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: "flex" }}>
            <IconButton
              size="large"
              aria-label="Menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => {}}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <AndroidIcon />
          <Typography
            variant="h5"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              ml: 2,
              display: "flex",
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Shop
          </Typography>

          {userButton()}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
