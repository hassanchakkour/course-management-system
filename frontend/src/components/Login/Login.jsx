import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { Container, Paper, Grid, Button, Typography } from "@mui/material";
import Input from "./Input";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#03C9D7",
    },
  },
});

const Login = () => {
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      console.log("navigate");
    }
  }, [userInfo]);
  useEffect(() => {
    const typingDelay = 100; // Delay between each character typing
    const welcomeMessage = "Welcome to the future of education";
    let currentIndex = 0;
    let tempWelcome = "";

    const typingInterval = setInterval(() => {
      tempWelcome += welcomeMessage[currentIndex];
      setShowWelcome(tempWelcome);
      currentIndex++;

      if (currentIndex === welcomeMessage.length) {
        clearInterval(typingInterval);
      }
    }, typingDelay);

    return () => {
      clearInterval(typingInterval);
    };
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showWelcome, setShowWelcome] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({
        email,
        password,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
    } catch (error) {
      toast.error(error?.data.message || error.error);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <div style={{ backgroundColor: "#333" }}>
        <Container
          maxWidth="sm"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 4,
              borderRadius: "12px",
              height: "auto",
            }}
          >
            {showWelcome && (
              <Typography
                variant="h4"
                align="center"
                sx={{
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: "bold",
                  color: "#03C9D7",
                  marginBottom: "2rem",
                }}
              >
                {showWelcome}
              </Typography>
            )}
            <Typography
              variant="h5"
              align="center"
              gutterBottom
              sx={{
                fontFamily: "Montserrat, sans-serif",
                color: "#fff",
                position: "relative",
              }}
            >
              Log In
              <span
                style={{
                  width: "20%",
                  height: "3px",
                  backgroundColor: "#03C9D7",
                  position: "absolute",
                  bottom: "-4px",
                  left: "40%",
                }}
              />
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sx={{ marginTop: "1rem" }}>
                  <Input
                    label="Email"
                    type="text"
                    value={email}
                    handleChange={(e) => setEmail(e.target.value)}
                    inputProps={{
                      style: { color: "#03C9D7" },
                    }}
                    InputLabelProps={{
                      style: { color: "#03C9D7" },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Input
                    label="Password"
                    type="password"
                    value={password}
                    handleChange={(e) => setPassword(e.target.value)}
                    inputProps={{
                      style: { color: "#03C9D7" },
                    }}
                    InputLabelProps={{
                      style: { color: "#03C9D7" },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{
                      marginTop: "1rem",
                      backgroundColor: "#03C9D7",
                      color: "#fff",
                      transition: "letter-spacing 0.3s ease-in-out",
                      "&:hover": {
                        letterSpacing: "2px",
                      },
                    }}
                  >
                    Sign In
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default Login;
