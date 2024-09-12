import { useNavigate } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { useContext } from "react";
import PatientsContext from "../context/PatientsContext";

const Patients = () => {
  const { patients, handleDelete } = useContext(PatientsContext);
  const navigate = useNavigate();

  const handleDetails = (id) => {
    navigate(`/details/${id}`);
  };

  const handleNavigate = (id) => {
    navigate(`/update/${id}`); // Navigate to the update component
  };
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients.map((patient) => (
            <TableRow key={patient._id}>
              <TableCell
                onClick={() => {
                  handleDetails(patient._id);
                }}
              >
                {patient.name}
              </TableCell>
              <TableCell>{patient.age}</TableCell>
              <TableCell>{patient.phone}</TableCell>
              <TableCell>{patient.address}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleNavigate(patient._id)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete(patient._id)}
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Patients;
