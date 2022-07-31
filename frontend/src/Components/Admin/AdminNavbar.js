import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSelector } from "react-redux";
import CottageIcon from "@mui/icons-material/Cottage";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LoginIcon from "@mui/icons-material/Login";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
const AdminNavbar = () => {
  const navigate = useNavigate();
  const { isLoggedInClient, isLoggedIn, user } = useSelector(
    (state) => state.auth
  );
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  return (
    <Box>
      <AppBar
        position="fixed"
        sx={{
          height: 75,
          color: "#712E71",
          backgroundColor: "#ECECEC",
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            E-Commerce
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              sx={{ marginRight: 5 }}
              color="inherit"
              onClick={() => {
                navigate("/");
              }}
            >
              <CottageIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {isLoggedIn ? (
              <>
                {/* <IconButton
                  size="small"
                  aria-label="show more"
                  aria-haspopup="true"
                  color="inherit"
                ></IconButton> */}
                <IconButton
                  size="large"
                  edge="end"
                  sx={{ marginRight: 5 }}
                  aria-label="account of current user"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={() => {
                    navigate("/Logout");
                  }}
                >
                  <LogoutIcon />
                </IconButton>
              </>
            ) : (
              <>
                <IconButton
                  size="large"
                  edge="end"
                  sx={{ marginRight: 5 }}
                  aria-label="account of current user"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={() => {
                    navigate("/Login");
                  }}
                >
                  <AccountCircle />
                </IconButton>
                <IconButton
                  size="large"
                  sx={{ marginRight: 5 }}
                  edge="end"
                  aria-label="account of current user"
                  aria-haspopup="true"
                  color="error"
                  onClick={() => {
                    navigate("/Cart");
                  }}
                >
                  <AddShoppingCartIcon sx={{ fontSize: 25 }} />
                  <Badge
                    badgeContent={cartTotalQuantity > 0 ? cartTotalQuantity : 0}
                    color="success"
                  ></Badge>
                </IconButton>
              </>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              sx={{ marginRight: 5 }}
              aria-label="show more"
              aria-haspopup="true"
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
          {isLoggedInClient ? (
            <>
              <IconButton
                sx={{ marginRight: 5 }}
                size="small"
                aria-label="show more"
                aria-haspopup="true"
                color="inherit"
                onClick={() => {
                  navigate("/LogoutAccount");
                }}
              >
                <ExitToAppIcon />
              </IconButton>
            </>
          ) : (
            <>
              {isLoggedIn ? (
                <></>
              ) : (
                <IconButton
                  sx={{ marginRight: 5 }}
                  size="small"
                  aria-label="show more"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={() => {
                    navigate("/LoginAccount");
                  }}
                >
                  <LoginIcon />
                </IconButton>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default AdminNavbar;
