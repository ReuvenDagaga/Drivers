import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import axios from "axios";

const ActiveRide = () => {
  const { rideId } = useParams();
  const navigate = useNavigate();
  const [ride, setRide] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRideDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/rides/${rideId}`);
        setRide(res.data);
      } catch (err) {
        setError("Failed to fetch ride details.");
      } finally {
        setLoading(false);
      }
    };

    fetchRideDetails();
  }, [rideId]);

  const handleCompleteRide = () => {
    navigate("/");
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h4">Active Ride</Typography>
      <Typography variant="body1">Destination: {ride.destinationAddress}</Typography>
      <Typography variant="body1">Passenger: {ride.passengerName}</Typography>

      <Button variant="contained" onClick={handleCompleteRide} sx={{ mt: 2 }}>
        Arrived at Destination
      </Button>
    </Box>
  );
};

export default ActiveRide;
