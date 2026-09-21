import { useState, type FormEvent } from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import {
  Apple,
  Facebook,
  Google,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import loginIllustration from "./assets/login-illustration.svg";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let formIsValid = true;

    if (!email) {
      setEmailError("Email is required");
      formIsValid = false;
    } else if (!emailPattern.test(email)) {
      setEmailError("Enter a valid email address");
      formIsValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      formIsValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must contain at least 6 characters");
      formIsValid = false;
    } else {
      setPasswordError("");
    }

    if (formIsValid) {
      alert("Form validation successful");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
        p: { xs: 2, md: 4 },
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1100px",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1.15fr" },
          minHeight: { md: "650px" },
        }}
      >
        {/* Left login section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            px: { xs: 2, sm: 6, md: 7 },
            py: { xs: 4, md: 6 },
          }}
        >
          <Typography
            component="h1"
            sx={{
              fontSize: { xs: "2rem", md: "2.5rem" },
              fontWeight: 700,
              color: "#111111",
              mb: 1.5,
            }}
          >
            Welcome back!
          </Typography>

          <Typography
            sx={{
              color: "#777777",
              fontSize: "0.9rem",
              lineHeight: 1.6,
              mb: 4,
            }}
          >
            Simplify your workflow and boost your productivity
            <br />
            with Tuga&apos;s App. Get started for free.
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              fullWidth
              size="small"
              placeholder="Email"
              type="email"
              value={email}
              error={Boolean(emailError)}
              helperText={emailError}
              onChange={(event) => {
                setEmail(event.target.value);
                setEmailError("");
              }}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "24px",
                },
              }}
            />

            <TextField
              fullWidth
              size="small"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              error={Boolean(passwordError)}
              helperText={passwordError}
              onChange={(event) => {
                setPassword(event.target.value);
                setPasswordError("");
              }}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        aria-label="Show or hide password"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                mb: 1,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "24px",
                },
              }}
            />

            <Box sx={{ textAlign: "right", mb: 2.5 }}>
              <Link
                href="#"
                underline="hover"
                color="inherit"
                sx={{ fontSize: "0.8rem" }}
              >
                Forgot Password?
              </Link>
            </Box>

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                height: 46,
                borderRadius: "24px",
                backgroundColor: "#000000",
                color: "#ffffff",
                textTransform: "none",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#222222",
                  boxShadow: "none",
                },
              }}
            >
              Login
            </Button>
          </Box>

          <Divider sx={{ my: 3, color: "#777777", fontSize: "0.85rem" }}>
            or continue with
          </Divider>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <IconButton
              aria-label="Continue with Google"
              sx={socialButtonStyle}
            >
              <Google />
            </IconButton>

            <IconButton
              aria-label="Continue with Apple"
              sx={socialButtonStyle}
            >
              <Apple />
            </IconButton>

            <IconButton
              aria-label="Continue with Facebook"
              sx={socialButtonStyle}
            >
              <Facebook />
            </IconButton>
          </Box>

          <Typography
            sx={{
              textAlign: "center",
              mt: 7,
              color: "#555555",
              fontSize: "0.85rem",
            }}
          >
            Not a member?{" "}
            <Link href="#" color="#6f9f67" underline="hover">
              Register now
            </Link>
          </Typography>
        </Box>

        {/* Right illustration section */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            m: 2,
            borderRadius: "24px",
            backgroundColor: "#f1f7ed",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            p: 5,
            textAlign: "center",
          }}
        >
          <Box
            component="img"
            src={loginIllustration}
            alt="Organizing work illustration"
            sx={{
              width: "85%",
              maxWidth: "430px",
              maxHeight: "400px",
              mb: 4,
            }}
          />

          <Typography sx={{ fontSize: "1.4rem", color: "#222222" }}>
            Make your work easier and organized
          </Typography>

          <Typography
            sx={{
              fontSize: "1.4rem",
              fontWeight: 700,
              color: "#111111",
            }}
          >
            with Tuga&apos;s App
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

const socialButtonStyle = {
  width: 48,
  height: 48,
  backgroundColor: "#000000",
  color: "#ffffff",
  "&:hover": {
    backgroundColor: "#222222",
  },
};

export default App;