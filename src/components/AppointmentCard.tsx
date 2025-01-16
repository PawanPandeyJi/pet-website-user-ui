import {
  Card,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Button,
  Box,
  Tooltip,
} from "@mui/material";
import { VaccinesOutlined } from "@mui/icons-material";

type AppointmentDataProps = {
  doctorImage: string;
  doctorName: string;
  petImage: string;
  petName: string;
  time: string;
  day: string;
  canceled: boolean;
  canleAppointment: () => void;
};

const ConfirmCard = (props: AppointmentDataProps) => {
  return (
    <Card
      sx={{
        maxWidth: 400,
        margin: "1rem",
        borderRadius: 2,
        boxShadow: 3,
        padding: 2,
        position: "relative",
      }}
    >
      <Box display="flex" justifyContent="center" alignItems="center" gap={2} marginBottom={2}>
        <Avatar sx={{ bgcolor: "primary.main", height: 80, width: 80 }} src={props.doctorImage} />
        <VaccinesOutlined color="disabled" sx={{ height: 40, width: 40 }} />
        <Avatar sx={{ bgcolor: "secondary.main", height: 80, width: 80 }} src={props.petImage} />
      </Box>

      <CardContent>
        <Typography variant="h6" gutterBottom>
          Appointment Details
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Doctor: Dr. {props.doctorName}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Pet: {props.petName}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Date: 2024-12-20
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Time: {props.time}, Day: {props.day}
        </Typography>
      </CardContent>

      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="outlined"
          color="error"
          onClick={props.canleAppointment}
          disabled={props.canceled}
        >
          Cancel
        </Button>
        <Tooltip title={`Join link will available on ${props.day}`}>
          <span>
            <Button variant="contained" color="primary" disabled>
              Join
            </Button>
          </span>
        </Tooltip>
      </CardActions>
      {props.canceled ? (
        <Typography
          variant="h3"
          color="error"
          sx={{
            position: "absolute",
            transform: "rotate(-40deg)",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            top: 0,
            left: "0rem",
          }}
        >
          Canceled
        </Typography>
      ) : null}
    </Card>
  );
};

export default ConfirmCard;
