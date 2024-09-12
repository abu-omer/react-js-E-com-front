import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import NavBar from "./components/AppBar";
// import PatientUpdateForm from "./components/UpdateForm";
// import PatientDeatils from "./components/PatientDetails";
import Login from "./components/login/Login";
import Layout from "./pages/Layout";
import Admin from "./pages/Admin";
import Tech from "./pages/Tech";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./pages/Unauthorized";

function App() {
  return (
    <main className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route element={<RequireAuth allowedRoles={["admin", "user"]} />}>
            <Route path="/" element={<Home />} />
            <Route path="/tech" element={<Tech />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Route>
        {/* <Route path="/update/:id" element={<PatientUpdateForm />} />
        <Route path="/details/:id" element={<PatientDeatils />} /> */}
      </Routes>
    </main>
  );
}

export default App;
