import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography 
          variant="h6" 
          sx={{ flexGrow: 1, cursor: "pointer" }} 
          onClick={() => navigate("/")}
        >
          DRIVERS
        </Typography>

        {user ? (
          <>
            <Typography variant="body1" sx={{ mx: 2 }}>
              {user.name}
            </Typography>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          <Button color="inherit" onClick={() => navigate("/login")}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
