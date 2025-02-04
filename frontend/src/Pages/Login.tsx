import { useState } from "react";
import { Container, TextField, Button, Typography, Box, Alert } from "@mui/material";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    try {
      const { data } = await axios.post("http://localhost:3000/api/drivers/login", {
        phoneNumber,
        password,
      });
      login(data.driver); 
      navigate("/"); 
    } catch (error) {
      setError("Login failed. Please check your phone number and password." + error);
    }
  };

  return (
    <Container sx={{ textAlign: "center", mt: 5, maxWidth: "400px" }}>
      <Typography variant="h4" gutterBottom>
        Driver Login
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3 }}>
        <TextField
          label="Phone Number"
          variant="outlined"
          fullWidth
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button variant="contained" onClick={handleLogin} fullWidth>
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
