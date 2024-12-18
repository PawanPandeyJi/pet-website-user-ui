import { Box, TextField, MenuItem, Button, Grid, Snackbar, Avatar } from "@mui/material";
import { useState } from "react";
import { BackendError, useCreatePetsMutation } from "../store/api/pet-api";
import { PetsSharp } from "@mui/icons-material";

type ModalFormCloseProps = {
  onClose?: () => void;
};

const CreatePetForm = ({ onClose }: ModalFormCloseProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    petName: "",
    age: "",
    breed: "",
    weight: "",
    type: "",
    gender: "",
    color: "",
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [previewPet, setPreviewPet] = useState("");

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreviewPet(URL.createObjectURL(selectedFile));
    }
  };

  const [createPets] = useCreatePetsMutation();

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit: React.ChangeEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!file) {
      setErrorMessage("No file selected");
      setSnackbarOpen(true);
      return;
    }

    const data = new FormData();
    data.append("petName", formData.petName);
    data.append("age", formData.age);
    data.append("breed", formData.breed);
    data.append("weight", formData.weight);
    data.append("type", formData.type);
    data.append("gender", formData.gender);
    data.append("color", formData.color);
    data.append("image", file);

    try {
      await createPets(data).unwrap();
      setFormData({
        petName: "",
        age: "",
        breed: "",
        weight: "",
        type: "",
        gender: "",
        color: "",
      });
      setFile(null);
      setPreviewPet("");
      if (onClose) {
        onClose();
      }
    } catch (error) {
      const message = (error as BackendError)?.data?.message || "An unexpected error occurred.";
      setErrorMessage(message);
      setSnackbarOpen(true);
    }
  };
  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 500,
          margin: "15px auto",
          padding: 2,
          bgcolor: "background.paper",
          border: "1px solid #ccc",
          borderRadius: 2,
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
          {previewPet ? (
            <Avatar alt="Remy Sharp" src={previewPet} sx={{ width: 100, height: 100 }} />
          ) : (
            <>
              <Avatar sx={{ width: 100, height: 100 }}>
                <PetsSharp />
              </Avatar>
            </>
          )}
        </div>
        <TextField
          label="Pet Name"
          name="petName"
          fullWidth
          variant="outlined"
          value={formData.petName}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Age"
          name="age"
          fullWidth
          variant="outlined"
          value={formData.age}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Breed"
          name="breed"
          fullWidth
          variant="outlined"
          value={formData.breed}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Weight"
          name="weight"
          fullWidth
          variant="outlined"
          value={formData.weight}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
        <Grid container spacing={2} sx={{ marginBottom: 2 }}>
          <Grid item xs={4}>
            <TextField
              select
              label="Type"
              name="type"
              fullWidth
              variant="outlined"
              value={formData.type}
              onChange={handleChange}
            >
              <MenuItem value="Dog">Dog</MenuItem>
              <MenuItem value="Cat">Cat</MenuItem>
              <MenuItem value="Bird">Bird</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={4}>
            <TextField
              select
              label="Gender"
              name="gender"
              fullWidth
              variant="outlined"
              value={formData.gender}
              onChange={handleChange}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Color"
              name="color"
              fullWidth
              variant="outlined"
              value={formData.color}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Button variant="outlined" component="label" fullWidth sx={{ marginBottom: 2 }}>
          Upload Image
          <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
        </Button>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Pet
        </Button>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={errorMessage}
      />
    </>
  );
};

export default CreatePetForm;
