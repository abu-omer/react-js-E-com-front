import { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
// import AccountCircle from "@mui/icons-material/AccountCircle";
// import Switch from "@mui/material/Switch";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import FormGroup from "@mui/material/FormGroup";
// import MenuItem from "@mui/material/MenuItem";
// import Menu from "@mui/material/Menu";
// import { Link } from "@mui/material";
import TemporaryDrawer from "./TemporaryDrawer";
import StoreContext from "../context/storeContext";
import Cart from "./Cart";
import "./nav.css";
import Logout from "./logout/Logout";

const NavBar = () => {
  //   const [auth, setAuth] = React.useState(true);
  // const [anchorEl, setAnchorEl] = useState(null);
  const { setCategoryName } = useContext(StoreContext);

  //   const handleChange = (event) => {
  //     setAuth(event.target.checked);
  //   };

  // const handleMenu = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  const handleSelect = (event) => {
    setCategoryName(event.target.value);
  };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  return (
    <Box sx={{ flexGrow: 1 }} className="navbar">
      {/* <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={auth ? "Logout" : "Login"}
        />
      </FormGroup> */}
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <TemporaryDrawer />
          </IconButton>
          {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link color="secondary" href="/" underline="none">
              Home
            </Link>
          </Typography> */}
          <div className="optios">
            <label className="categories" htmlFor="category-select">
              categories:
            </label>
            <select id="category-select" onChange={handleSelect}>
              <option value="all">ALL</option>
              <option value="category/sport">Men</option>
              <option value="category/women">Women</option>
              <option value="category/kids">Kids</option>
            </select>

            <div className="item">
              <Cart />
              <Logout />
            </div>
            {/* <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
            </Menu> */}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
