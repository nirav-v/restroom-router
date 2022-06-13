import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../util/auth";
import pinkToiletPaper from "../images/pink-paper.jpg";
import Paper from "@mui/material/Paper";
import CssBaseline from "@mui/material/CssBaseline";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const styles = {
  formControl: {
    display: "flex",
    padding: "0.25em",
  },
  label: {
    flex: "0 1 6em",
    paddingRight: "0.25em",
  },
  paperContainer: {
    backgroundImage: `url(${pinkToiletPaper})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
};

const initialFormState = {
  username: "",
  email: "",
  password: "",
};

export default function SignUp2() {
  const { isLoggedIn, signup, loading, error } = useAuth();
  const [formState, setFormState] = useState(initialFormState);

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    signup(formState);
  };

  if (isLoggedIn) {
    // navigate to the user page
    return <Navigate to="/userPage" replace />;
  }
  return (
    <Paper style={styles.paperContainer} sx={{ height: "100%" }}>
      <CssBaseline />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
        style={{ minHeight: "100vh" }}
      >
        <Card
          style={{
            maxWidth: 650,
            padding: "20px 5px",
            borderRadius: "16px",
            opacity: 0.9,
          }}
        >
          <CardContent>
            <Typography gutterBottom variant="h5">
              Sign Up
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid xs={12} item>
                  <Typography
                    gutterBottom
                    variant="body2"
                    component="p"
                    color="textSecondary"
                  >
                    Username
                  </Typography>
                  <TextField
                    placeholder="Enter username"
                    fullWidth
                    required
                    autoFocus
                    value={formState.username.value}
                    onChange={handleInputChange}
                    disabled={loading}
                    name="username"
                  />
                </Grid>
                <Grid xs={12} item>
                  <Typography
                    gutterBottom
                    variant="body2"
                    component="p"
                    color="textSecondary"
                  >
                    Email
                  </Typography>
                  <TextField
                    placeholder="Enter email"
                    fullWidth
                    required
                    type="email"
                    name="email"
                    disabled={loading}
                    value={formState.email.value}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid xs={12} item>
                  <Typography
                    gutterBottom
                    variant="body2"
                    component="p"
                    color="textSecondary"
                  >
                    Password
                  </Typography>
                  <TextField
                    placeholder="Enter password"
                    fullWidth
                    required
                    type="password"
                    name="password"
                    disabled={loading}
                    value={formState.password.value}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid xs={12} item>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Submit"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Paper>
  );
}
