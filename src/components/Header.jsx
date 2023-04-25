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
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { setProductItems } from "../redux/features/product/productSlice";
import { getTotals } from "../redux/features/cart/cartSlice";
import {
  clearCredentials,
  selectCurrentUser,
} from "../redux/features/auth/authSlice";
import Searchbar from "./Searchbar";
import { useGetAllProductCategoriesQuery } from "../redux/api/productApi";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [drawer, setDrawer] = useState(false);
  const { cartTotalQuantity, cartItems } = useSelector((state) => state.cart);
  const currentUser = useSelector(selectCurrentUser);
  const { data: dataCategories } = useGetAllProductCategoriesQuery();

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

  const handleNavigateHomepage = () => {
    if (window.location.hash !== "#/") {
      navigate("/");
    }

    fetch("https://dummyjson.com/products?limit=10")
      .then((res) => res.json())
      .then((res) => {
        dispatch(setProductItems(res.products));
      });
  };

  const handleSelection = (category, closeMenu = false) => {
    fetch(`https://dummyjson.com/products/category/${category}?limit=10`)
      .then((res) => res.json())
      .then((res) => {
        dispatch(setProductItems(res.products));
      });

    if (closeMenu) {
      handleCloseNavMenu();
    }

    if (window.location.hash !== "#/products") {
      navigate("/products");
    }
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawer(open);
  };

  const drawerList = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {dataCategories?.map((item, index) => (
          <span key={index}>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleSelection(item)}>
                <ListItemText
                  primary={item}
                  sx={{
                    fontWeight: 400,
                    textTransform: "uppercase",
                  }}
                />
              </ListItemButton>
            </ListItem>
            <Divider />
          </span>
        ))}
      </List>
    </Box>
  );

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
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={toggleDrawer(true)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Drawer anchor="left" open={drawer} onClose={toggleDrawer(false)}>
              {drawerList()}
            </Drawer>
          </Box>

          <Typography
            variant="h5"
            noWrap
            // to="/"
            // component={RouterLink}
            onClick={handleNavigateHomepage}
            sx={{
              mr: 2,
              display: "flex",
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
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
