import { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

import PatientsContext from "../context/PatientsContext";
export const Search = () => {
  // const [searchResult, setSearchResul] = useState([]);
  const [key, setKey] = useState("");
  const { setPatients } = useContext(PatientsContext);

  const handleSearch = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/patients/search?key=${key}`
      );
      setPatients(response.data);
      // console.log(response.data);
      // console.log(searchResult);
    } catch (error) {
      console.log("Error fetching search results");
    }
  };

  const handleSearchChange = (e) => {
    setKey(e.target.value);
  };
  return (
    <TextField
      variant="outlined"
      fullWidth
      placeholder="Search..."
      value={key}
      onChange={handleSearchChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => {
                handleSearch();
              }}
            >
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
