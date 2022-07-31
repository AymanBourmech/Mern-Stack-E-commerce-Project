import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginClient } from "../../Features/AuthSlice";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
const theme = createTheme({
  palette: {
    neutral: {
      main: "#8a1a50",
      contrastText: "#fff",
    },
  },
});
const LoginAccount = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    const objetuser = {
      email: encodeURIComponent(email),
      password: encodeURIComponent(password),
    };
    dispatch(loginClient(objetuser));
    navigate("/Cart");
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
          <Avatar sx={{ m: 1, bgcolor: "neutral.main" }}>
            {" "}
            <PersonIcon />{" "}
          </Avatar>
          <Typography component="h1" variant="h5">
            Connexion
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
              label={<PasswordIcon />}
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="neutral"
              sx={{ mt: 3, mb: 2 }}
              onClick={(event) => handleSubmit(event)}
            >
              Se Connecter
            </Button>
            <Grid container>
              <Link to="/RegisterAccount" variant="body2">
                {"Vous n'avez pas de compte ? S'inscrire"}
              </Link>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default LoginAccount;
