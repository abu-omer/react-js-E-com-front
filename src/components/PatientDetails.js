import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
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
import { useState, useEffect, useContext } from "react";
import PatientsContext from "../context/PatientsContext";

const PatientDeatils = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [patient, setPatient] = useState([{}]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { handleDelete } = useContext(PatientsContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/patients/${id}`
        );
        setPatient(response.data);
        console.log(id);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setError("Error fetching patient details");
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

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
          <TableRow>
            <TableCell>{patient.name || "N/A"}</TableCell>
            <TableCell>{patient.age || "N/A"}</TableCell>
            <TableCell>{patient.phone || "N/A"}</TableCell>
            <TableCell>{patient.address || "N/A"}</TableCell>
            <TableCell>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleNavigate(patient._id)}
              >
                Update
              </Button>
              <Button
                variant="contained"
                color="secondary"
                style={{ marginLeft: "10px" }}
                onClick={() => handleDelete(patient._id)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PatientDeatils;
