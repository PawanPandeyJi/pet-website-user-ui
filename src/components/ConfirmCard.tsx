
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Divider,
} from "@mui/material";

const ConfirmCard = () => {
  return (
    <Card sx={{ maxWidth: 400, borderRadius: 2, boxShadow: 3, margin: "auto" }}>
      <CardMedia
        component="img"
        image="https://picsum.photos/400"
        alt="Square Photo"
        sx={{
          width: "100%", // Full width
          height: 0,
          paddingTop: "100%", // 1:1 Aspect Ratio for square
          objectFit: "cover",
        }}
      />

      {/* Card Content with Row Data */}
      <CardContent>
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography variant="body1" fontWeight="bold">
            Name:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            John Doe
          </Typography>
        </Box>
        <Divider />

        <Box display="flex" justifyContent="space-between" mt={1} mb={1}>
          <Typography variant="body1" fontWeight="bold">
            Age:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            28
          </Typography>
        </Box>
        <Divider />

        <Box display="flex" justifyContent="space-between" mt={1} mb={1}>
          <Typography variant="body1" fontWeight="bold">
            Location:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            New York
          </Typography>
        </Box>
        <Divider />

        <Box display="flex" justifyContent="space-between" mt={1}>
          <Typography variant="body1" fontWeight="bold">
            Status:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Active
          </Typography>
        </Box>
      </CardContent>

      {/* Full-Width Button */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ borderTop: "1px solid #ddd", borderRadius: 0 }}
      >
        Confirm
      </Button>
    </Card>
  );
};

export default ConfirmCard;
