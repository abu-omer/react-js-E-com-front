import { useContext, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import {
  TextField,
  Button,
  FormControl,
  FormGroup,
  Typography,
  Paper,
  Container,
} from "@mui/material";
import PatientsContext from "../context/PatientsContext";

const PatientUpdateForm = () => {
  const { id } = useParams();
  const { patients, setPatients } = useContext(PatientsContext);
  const navigate = useNavigate();

  const [patient, setPatient] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPatient((prevPatient) => ({ ...prevPatient, [name]: value }));
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:3000/api/v1/patients/${id}`, patient);
      setPatients({ ...patients, patient });
      navigate("/");
    } catch (error) {
      console.log(`Update patient with id ${id}`);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Patient Form
        </Typography>
        <form onSubmit={handleUpdate}>
          <FormGroup>
            <FormControl margin="normal">
              <TextField
                label="Name"
                name="name"
                value={patient.name}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl margin="normal">
              <TextField
                label="Phone"
                name="phone"
                value={patient.phone}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl margin="normal">
              <TextField
                label="Address"
                name="address"
                value={patient.address}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl margin="normal">
              <TextField
                label="Age"
                name="age"
                type="number"
                value={patient.age}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl margin="normal">
              <TextField
                label="Profile"
                name="profile"
                value={patient.profile}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl margin="normal">
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </FormControl>
          </FormGroup>
        </form>
      </Paper>
    </Container>
  );
};

export default PatientUpdateForm;
