import { Button, Snackbar } from "@mui/material";
import { useState } from "react";
import { BackendError, useDeletePetMutation, useGetPetsQuery } from "../store/api/pet-api";
import CreatePetForm from "../components/CreatePetForm";

const MyPet = () => {
  const { data: allPets } = useGetPetsQuery();
  const [deletePet] = useDeletePetMutation();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleDelete = async (id: string) => {
    try {
      await deletePet(id);
    } catch (error) {
      const message = (error as BackendError)?.data?.message || "An unexpected error occurred.";
      setErrorMessage(message);
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <div className="myPetContainer">
        <div className="myPetsCards">
          {allPets &&
            allPets.map((val) => {
              return (
                <div className="petCard" key={val.id}>
                  <div className="petDetail">
                    <img src={val.image} alt={val.image} />
                    <div>
                      <h1>{val.petName}</h1>
                      <p>
                        <strong>Pet Type:</strong>
                        {val.type}
                      </p>
                      <p>
                        <strong>Pet Gender:</strong>
                        {val.gender}
                      </p>
                      <p>
                        <strong>Pet Age:</strong>
                        {val.age}
                      </p>
                      <p>
                        <strong>Pet Weight:</strong>
                        {val.weight}
                      </p>
                    </div>
                  </div>
                  <div className="muibtns">
                    <Button variant="contained" color="success">
                      View
                    </Button>
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() => handleDelete(val.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="myPetForm">
            <CreatePetForm/>
        </div>
      </div>
      <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={errorMessage}
        />
    </>
  );
};
export default MyPet;
