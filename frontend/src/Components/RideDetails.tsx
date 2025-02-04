import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";

const RideDetails = () => {
  const { rideId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [ride, setRide] = useState<any>(null);
  const [passenger, setPassenger] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRideDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/rides/${rideId}`
        );
        setRide(res.data);
        const passenger = await axios.get(
          `http://localhost:3000/api/passengers/${res.data.createdBy}`
        );
        setPassenger(passenger.data);
      } catch (err) {
        setError("Failed to fetch ride details.");
      } finally {
        setLoading(false);
      }
    };
    fetchRideDetails();
  }, [rideId]);

  console.log(user?._id, rideId);
  console.log(user);

  const handleAcceptRide = async () => {
    if (user)
      try {
        await axios.post("http://localhost:3000/api/rides/take", {
          driverId: user?._id,
          rideId,
        });
        navigate(`/active-ride/${rideId}`);
      } catch (err) {
        setError("Failed to accept the ride.");
      }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h4">Ride Details</Typography>
      <Typography variant="body1">Origin: {ride.origin.address}</Typography>
      <Typography variant="body1">
        Destination: {ride.destination.address}
      </Typography>
      <Typography variant="body1">Passenger: {ride.passengers}</Typography>
      <Typography variant="body1">Passenger Phone: {passenger.name}</Typography>
      <Typography variant="body1">Price: ${ride.price}</Typography>

      <Button variant="contained" onClick={handleAcceptRide} sx={{ mt: 2 }}>
        Accept Ride
      </Button>
      <Button
        variant="outlined"
        onClick={() => navigate("/")}
        sx={{ mt: 2, ml: 2 }}
      >
        Back
      </Button>
    </Box>
  );
};

export default RideDetails;
