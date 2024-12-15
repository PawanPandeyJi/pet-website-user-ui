import { Card, CardContent, Grid, Typography, Avatar, Box, Button, Divider } from "@mui/material";
import { useDoctorQuery } from "../store/api/doctor-api";

const VetPage = () => {
  const { data: doctors } = useDoctorQuery();
  console.log(doctors);
  return (
    <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
      <Card
        sx={{
          maxWidth: 600,
          margin: "20px",
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          height: "370px",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: "center" }}>
              <Avatar
                src="/path/to/profileImage.jpg"
                alt="Doctor Profile"
                sx={{ width: 140, height: 140, margin: "0 auto" }}
              />
              <Typography variant="h6" sx={{ marginTop: 1, fontWeight: "bold" }}>
                Dr. Jane Doe
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Cardiologist
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Details
              </Typography>
              <Divider sx={{ marginBottom: 2 }} />
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                <strong>Gender:</strong> Female
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                <strong>Phone:</strong> +91 8451025698
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                <strong>Email:</strong> janedoe@example.com
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                <strong>Address:</strong> Sujata Pally, Sector 7, Ambuja Park, Jhrkhamd-741250
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                <strong>Qualification:</strong> BVSc & AH
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
        <Box sx={{ marginTop: 1 }}>
          <Divider sx={{ marginBottom: 1 }} />
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            Consult
          </Button>
        </Box>
      </Card>
    </div>
  );
};

export default VetPage;
