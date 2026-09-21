import { useState } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

function TokenPage() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const accessToken =
    sessionStorage.getItem("accessToken") ?? "No access token found.";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(accessToken);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleLogout = async () => {
    await signOut(auth);
    sessionStorage.removeItem("accessToken");
    navigate("/");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f1f7ec",
        padding: 3,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: "100%",
          maxWidth: "800px",
          padding: { xs: 3, sm: 5 },
          borderRadius: "24px",
        }}
      >
        <Typography
          component="h1"
          sx={{
            fontSize: { xs: "2rem", sm: "2.5rem" },
            fontWeight: 700,
            marginBottom: 1,
          }}
        >
          Login Successful
        </Typography>

        <Typography color="text.secondary" sx={{ marginBottom: 3 }}>
          Your Firebase access token is displayed below.
        </Typography>

        <Box
          sx={{
            padding: 2,
            borderRadius: "12px",
            backgroundColor: "#f5f5f5",
            border: "1px solid #dddddd",
            overflowWrap: "anywhere",
            maxHeight: "280px",
            overflowY: "auto",
            fontFamily: "monospace",
            fontSize: "0.85rem",
          }}
        >
          {accessToken}
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            marginTop: 3,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Button
            variant="contained"
            onClick={handleCopy}
            sx={{
              backgroundColor: "#000000",
              textTransform: "none",
              "&:hover": { backgroundColor: "#333333" },
            }}
          >
            {copied ? "Copied!" : "Copy Token"}
          </Button>

          <Button
            variant="outlined"
            onClick={handleLogout}
            sx={{
              color: "#000000",
              borderColor: "#000000",
              textTransform: "none",
              "&:hover": {
                borderColor: "#333333",
                backgroundColor: "#eeeeee",
              },
            }}
          >
            Logout
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default TokenPage;