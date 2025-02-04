import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import RideDetails from "../Components/RideDetails";
import ActiveRide from "../Components/ActiveRide";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/ride/:rideId" element={<RideDetails />} />
      <Route path="/active-ride/:rideId" element={<ActiveRide />} />
    </Routes>
  );
};
