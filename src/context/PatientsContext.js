import { createContext, useEffect, useState } from "react";

import axios from "axios";

const PatientsContext = createContext({});

export const PatientsProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/patients"
        );
        setPatients(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handleDelete = async (id) => {
    console.log(id);
    try {
      await axios.delete(`http://localhost:3000/api/v1/patients/${id}`);
      setPatients(patients.filter((patient) => patient._id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <PatientsContext.Provider
      value={{ handleDelete, patients, loading, error, setPatients }}
    >
      {children}
    </PatientsContext.Provider>
  );
};

export default PatientsContext;
