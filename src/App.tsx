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
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./firebase/firebase";
import loginIllustration from "./assets/login-illustration.svg";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);

  const validateForm = () => {
    let isValid = true;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    setEmailError("");
    setPasswordError("");

    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!emailPattern.test(email)) {
      setEmailError("Enter a valid email address");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must contain at least 6 characters");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validateForm()) {
      alert("Form validation successful!");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);

      const result = await signInWithPopup(auth, googleProvider);
      const accessToken = await result.user.getIdToken();

      sessionStorage.setItem("accessToken", accessToken);

      alert("Google login successful!");
    } catch (error) {
      console.error("Google login error:", error);
      alert("Google login failed. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  };

  const socialButtonStyle = {
    width: 58,
    height: 58,
    backgroundColor: "#000000",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#333333",
      transform: "translateY(-2px)",
    },
    transition: "all 0.2s ease",
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: { xs: 2, sm: 4, md: 6 },
        backgroundColor: "#ffffff",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1250px",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: { xs: 4, md: 8 },
          alignItems: "stretch",
        }}
      >
        {/* Login section */}
        <Box
          sx={{
            width: "100%",
            maxWidth: "500px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: { xs: 1, sm: 3 },
          }}
        >
          <Typography
            component="h1"
            sx={{
              fontSize: { xs: "2.3rem", sm: "3rem" },
              fontWeight: 700,
              color: "#111111",
              marginBottom: 2,
            }}
          >
            Welcome back!
          </Typography>

          <Typography
            sx={{
              color: "#707070",
              fontSize: { xs: "0.95rem", sm: "1.05rem" },
              lineHeight: 1.7,
              marginBottom: 4,
            }}
          >
            Simplify your workflow and boost your productivity
            <br />
            with Tuga&apos;s App. Get started for free.
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
           
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <TextField
              fullWidth
              placeholder="Email"
              type="email"
              value={email}
              error={Boolean(emailError)}
              helperText={emailError}
              onChange={(event) => {
                setEmail(event.target.value);

                if (emailError) {
                  setEmailError("");
                }
              }}
              slotProps={{
                htmlInput: {
                  "aria-label": "Email address",
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "30px",
                  backgroundColor: "#ffffff",
                  "&.Mui-focused fieldset": {
                    borderColor: "#6fa95d",
                  },
                },
              }}
            />

            <TextField
              fullWidth
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              error={Boolean(passwordError)}
              helperText={passwordError}
              onChange={(event) => {
                setPassword(event.target.value);

                if (passwordError) {
                  setPasswordError("");
                }
              }}
              slotProps={{
                htmlInput: {
                  "aria-label": "Password",
                },
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        type="button"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        onClick={() => setShowPassword((previous) => !previous)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "30px",
                  backgroundColor: "#ffffff",
                  "&.Mui-focused fieldset": {
                    borderColor: "#6fa95d",
                  },
                },
              }}
            />

            <Link
              href="#"
              underline="hover"
              sx={{
                alignSelf: "flex-end",
                color: "#111111",
                fontSize: "0.9rem",
              }}
            >
              Forgot Password?
            </Link>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                marginTop: 1,
                minHeight: "58px",
                borderRadius: "30px",
                backgroundColor: "#000000",
                color: "#ffffff",
                fontSize: "1rem",
                textTransform: "none",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#333333",
                  boxShadow: "none",
                },
              }}
            >
              Login
            </Button>
          </Box>

          <Divider
            sx={{
              marginY: 4,
              color: "#777777",
              "&::before, &::after": {
                borderColor: "#dddddd",
              },
            }}
          >
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
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              aria-label="Sign in with Google"
              sx={socialButtonStyle}
            >
              <Google />
            </IconButton>

            <IconButton
              aria-label="Sign in with Apple"
              sx={socialButtonStyle}
            >
              <Apple />
            </IconButton>

            <IconButton
              aria-label="Sign in with Facebook"
              sx={socialButtonStyle}
            >
              <Facebook />
            </IconButton>
          </Box>

          <Typography
            sx={{
              marginTop: { xs: 5, md: 8 },
              textAlign: "center",
              color: "#444444",
              fontSize: "0.95rem",
            }}
          >
            Not a member?{" "}
            <Link
              href="#"
              underline="hover"
              sx={{
                color: "#6fa95d",
                fontWeight: 500,
              }}
            >
              Register now
            </Link>
          </Typography>
        </Box>

        {/* Illustration section */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            minHeight: "700px",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 5,
            borderRadius: "30px",
            backgroundColor: "#f1f7ec",
            textAlign: "center",
          }}
        >
          <Box
            component="img"
            src={loginIllustration}
            alt="Person organizing work"
            sx={{
              width: "100%",
              maxWidth: "500px",
              maxHeight: "470px",
              objectFit: "contain",
            }}
          />

          <Typography
            sx={{
              marginTop: 3,
              fontSize: "1.7rem",
              color: "#111111",
            }}
          >
            Make your work easier and organized
          </Typography>

          <Typography
            sx={{
              marginTop: 0.5,
              fontSize: "1.7rem",
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

export default App;