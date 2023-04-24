import { useState, useEffect } from "react";
import {
  AppBar,
  Badge,
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AndroidIcon from "@mui/icons-material/Android";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getTotals } from "../redux/features/cart/cartSlice";
import {
  clearCredentials,
  selectCurrentUser,
} from "../redux/features/auth/authSlice";
import Searchbar from "./Searchbar";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const { cartTotalQuantity, cartItems } = useSelector((state) => state.cart);
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    dispatch(getTotals());
  }, [cartItems, dispatch]);

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
          <AndroidIcon sx={{ display: "flex", mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
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

          <Searchbar />

          <Box
            sx={{ display: "flex", flexGrow: 1, justifyContent: "flex-end" }}
          >
            <IconButton
              component={RouterLink}
              to="/cart"
              sx={{ mr: "10px", color: "white" }}
            >
              <Badge badgeContent={cartTotalQuantity} color="secondary">
                <LocalMallOutlinedIcon />
              </Badge>
            </IconButton>

            {userButton()}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
