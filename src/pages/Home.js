import React from "react";
// import Patients from "./Patients";
// import { Search } from "../components/Search";
// import Reducer from "../reducer/Reducer";
import Products from "./Products";
import AddProduct from "../components/addform/AddProduct";
// import SwitchesGroup from "../components/Switches";

export const Home = () => {
  return (
    <div>
      {/* <Reducer /> */}

      {/* <SwitchesGroup /> */}
      <Products />
      <AddProduct />
      {/* <Search />
      <Patients /> */}
    </div>
  );
};
