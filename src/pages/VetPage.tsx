import { Card, CardContent, Grid, Typography, Avatar, Box, Button, Divider } from "@mui/material";
import { useDoctorQuery } from "../store/api/doctor-api";
import { Link } from "react-router-dom";

const VetPage = () => {
  const { data: doctors } = useDoctorQuery();
  return (
    <div style={{ display: "flex",  flexWrap: "wrap",justifyContent: "space-around" }}>
      {doctors &&
        doctors.map((val) => {
          return (
            <Card key={val.id}
              sx={{
                maxWidth: 700,
                margin: "20px",
                padding: 1,
                borderRadius: 2,
                boxShadow: 3,
                height: "383px",
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: "center" }}>
                    <Avatar
                      src={val.profileImage}
                      alt={val.profileImage}
                      sx={{ width: 180, height: 180, margin: "0 auto" }}
                    />
                    <Typography variant="h6" sx={{ marginTop: 1, fontWeight: "bold" }}>
                     {`${val.userAsDoctor.firstName} ${val.userAsDoctor.lastName}`}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {val.specialization}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} md={8}>
                  <CardContent sx={{marginLeft: "2rem"}}>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                      Details
                    </Typography>
                    <Divider sx={{ marginBottom: 2 }} />
                    <Typography variant="body1" sx={{ marginBottom: 1 }}>
                      <strong>Phone:</strong> +91 {val.phone}
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: 1 }}>
                      <strong>Email:</strong> {val.userAsDoctor.email}
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: 1 }}>
                      <strong>Address:</strong> {val.address}
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: 1 }}>
                      <strong>Qualification:</strong> {val.qualification}
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: 1 }}>
                      <strong>Available Days:</strong> {val.DoctorShedule.map((val) => val.availableDays.join(","))}
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: 1 }}>
                      <strong>Available Time:</strong> {val.DoctorShedule.map((val) => `${val.availableTimeFrom} - ${val.availableTimeTo}`)}
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
                  component={Link}
                  to={`/appointment/${val.id}`}
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
          );
        })}
    </div>
  );
};

export default VetPage;
