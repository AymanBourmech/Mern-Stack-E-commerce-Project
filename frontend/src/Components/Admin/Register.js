import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { register, reset } from "../../Features/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    neutral: {
      main: "#8a1a50",
      contrastText: "#fff",
    },
  },
});
const Register = () => {
  const navigate = useNavigate();
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const dispatch = useDispatch();
  const { user, isSuccess, isError } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isError) {
      alert("error");
    }
    if (isSuccess || user) {
      navigate("/login");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, navigate, dispatch]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      alert("Passwords do not match");
    } else {
      const userData = {
        nom,
        email,
        password,
      };
      dispatch(register(userData));
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "solid 2px gray",
            padding: "40px",
            width: "500px",
          }}
        >
          <Typography component="h1" variant="h5">
            Inscription
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="nom"
              label={<PersonIcon />}
              name="nom"
              autoComplete="nom"
              autoFocus
              onChange={(event) => setNom(event.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={<EmailIcon />}
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={<VpnKeyIcon />}
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password2"
              label="Retape password"
              type="password"
              id="password2"
              onChange={(event) => setPassword2(event.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="neutral"
              sx={{ mt: 3, mb: 2 }}
              onClick={(event) => handleSubmit(event)}
            >
              S'inscrire
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default Register;
