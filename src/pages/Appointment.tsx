import React, { useMemo, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Modal,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Snackbar,
  Typography,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useParams } from "react-router-dom";
import { useDoctorQuery } from "../store/api/doctor-api";
import {
  AppointmentError,
  useCreateAppointmentMutation,
  useGetPetsQuery,
} from "../store/api/pet-api";
import Loader from "../components/Loader";
import { useLoginUserDataQuery } from "../store/api/auth-api";
import NoDataMassage from "../components/NoDataMessage";
import CreatePetForm from "../components/CreatePetForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  p: 1,
};

const Appointment = () => {
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedPet, setSelectedPet] = useState("");
  const [open, setOpen] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [createAppointments] = useCreateAppointmentMutation();
  const { data: userId } = useLoginUserDataQuery();
  const { data: allPets } = useGetPetsQuery();
  const { data: doctors, isLoading } = useDoctorQuery();
  const { id: doctorId } = useParams();

  const doctor = useMemo(() => {
    return doctors?.find((doctor) => doctor.id === doctorId);
  }, [doctors, doctorId]);

  const appointmentDays = doctor?.DoctorShedule.map((availableDays) => availableDays.availableDays);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userId?.id) return;
    try {
      await createAppointments({
        userId: userId.id,
        petId: selectedPet,
        doctorId,
        appointmentDay: selectedDay,
      }).unwrap();
      setSelectedDay("");
      setSelectedPet("");
    } catch (error) {
      const message = (error as AppointmentError).data.message || "An unexpected error occured";
      setErrorMessage(message);
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!userId || !doctor) {
    return (
      <>
        <NoDataMassage
          message={
            <>
              No User or doctor data found!
              <br /> Login To Book Appointments
            </>
          }
        />
      </>
    );
  }

  if (!appointmentDays) {
    return <>No available days!</>;
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{ padding: 3, display: "flex", alignItems: "center" }}
            key={doctor.id}
          >
            <Avatar
              sx={{ bgcolor: deepPurple[500], width: 220, height: 220, marginRight: 3 }}
              src={doctor.profileImage}
              alt={doctor.userAsDoctor.firstName}
            />
            <Box>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Dr. {`${doctor.userAsDoctor.firstName} ${doctor.userAsDoctor.lastName}`}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Specialization: {doctor.specialization}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Experience:</strong> 10+ years
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Address:</strong> {doctor.address}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Contact:</strong> +91 {doctor.phone}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Email:</strong> {doctor.userAsDoctor.email}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Available Days:</strong>{" "}
                {doctor.DoctorShedule.map((doctor) => doctor.availableDays.join(","))}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Available Time:</strong>{" "}
                {doctor.DoctorShedule.map(
                  (doctor) => `${doctor.availableTimeFrom} - ${doctor.availableTimeTo}`
                )}
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <form onSubmit={handleFormSubmit}>
            <Paper elevation={3} sx={{ padding: 3 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Book an Appointment
              </Typography>
              <Divider sx={{ marginY: 2 }} />

              <Box sx={{ marginBottom: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Select Your Pet
                </Typography>
                <Select
                  fullWidth
                  value={selectedPet}
                  onChange={(e) => setSelectedPet(e.target.value)}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Select your pet
                  </MenuItem>
                  {allPets &&
                    allPets.map((pet) => {
                      return (
                        <MenuItem value={pet.id} sx={{ display: "flex", gap: "1rem" }} key={pet.id}>
                          <Avatar alt={pet.petName} src={pet.image} />
                          {pet.petName}
                        </MenuItem>
                      );
                    })}
                </Select>
              </Box>

              <Button onClick={handleOpen} variant="contained" sx={{ marginBottom: 2 }}>
                Add Pet
              </Button>

              <Box sx={{ marginBottom: 2 }}>
                <FormLabel>Appointment Days</FormLabel>

                <RadioGroup
                  row
                  name="appointmentDay"
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                >
                  {appointmentDays[0]?.map((days, index) => (
                    <FormControlLabel key={index} value={days} control={<Radio />} label={days} />
                  ))}
                </RadioGroup>
              </Box>
              <Button variant="contained" color="primary" fullWidth type="submit">
                Submit
              </Button>
            </Paper>
          </form>
        </Grid>
      </Grid>
      <div>
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <CreatePetForm />
          </Box>
        </Modal>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={errorMessage}
      />
    </Box>
  );
};

export default Appointment;
