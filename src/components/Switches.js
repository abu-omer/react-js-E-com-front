// import { useState, useContext, useRef } from "react";
// import FormLabel from "@mui/material/FormLabel";
// import FormControl from "@mui/material/FormControl";
// import FormGroup from "@mui/material/FormGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import FormHelperText from "@mui/material/FormHelperText";
// import Switch from "@mui/material/Switch";
// import StoreContext from "../context/storeContext";

// export default function SwitchesGroup() {
//   const [state, setState] = useState({
//     sport: false,
//     women: false,
//     kids: true,
//   });

//   const previousState = useRef(state);
//   const { setCategoryName } = useContext(StoreContext);

//   const handleChange = (event) => {
//     const { name, checked } = event.target;

//     previousState.current = state;

//     setState({
//       ...state,
//       [name]: checked,
//     });

//     setCategoryName(name);
//   };

//   const revertToPreviousState = () => {
//     // Revert to the previous state
//     setState(previousState.current);

//     // Optionally, update the context with the previous category (you could manage this based on your needs)
//     const revertedCategory = Object.keys(previousState.current).find(
//       (key) => previousState.current[key]
//     );
//     setCategoryName(revertedCategory);
//   };

//   return (
//     <FormControl component="fieldset" variant="standard">
//       <FormLabel component="legend">Assign responsibility</FormLabel>
//       <FormGroup>
//         <FormControlLabel
//           control={
//             <Switch
//               checked={state.sport}
//               onChange={handleChange}
//               name="sport"
//             />
//           }
//           label="sport"
//         />
//         <FormControlLabel
//           control={
//             <Switch
//               checked={state.women}
//               onChange={handleChange}
//               name="women"
//             />
//           }
//           label="WOMEN"
//         />
//         <FormControlLabel
//           control={
//             <Switch checked={state.kids} onChange={handleChange} name="kids" />
//           }
//           label="KIDS"
//         />
//       </FormGroup>
//       <FormHelperText>Be careful</FormHelperText>
//     </FormControl>
//   );
// }
