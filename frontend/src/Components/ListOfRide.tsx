import { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, List, ListItem, ListItemText, ListItemButton } from "@mui/material";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ListOfRides = () => {
  const { user } = useAuth();
  const [rides, setRides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRides = async () => {
      if (!user?.address) {
        setError("Driver address is missing.");
        setLoading(false);
        return;
      }

      try {
        const geoRes = await axios.get(`https://nominatim.openstreetmap.org/search`, {
          params: { q: user.address, format: "json", limit: 1 },
        });

        if (!geoRes.data.length) {
          setError("Could not find location for the given address.");
          setLoading(false);
          return;
        }

        const { lat, lon } = geoRes.data[0];

        const ridesRes = await axios.get(`http://localhost:3000/api/rides/closest`, {
          params: { latitude: lat, longitude: lon },
        });

        setRides(ridesRes.data);
      } catch (err) {
        setError("Failed to fetch rides.");
      } finally {
        setLoading(false);
      }
    };

    fetchRides();
  }, [user]);

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h5">Available Rides</Typography>

      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}

      <List>
        {rides.map((ride, index) => (
          <ListItem key={index} divider>
            <ListItemButton onClick={() => navigate(`/ride/${ride._id}`)}>
              <ListItemText
                primary={`${ride.originAddress} ➝ ${ride.destinationAddress}`}
                secondary={`Price: $${ride.price} | Distance: ${ride.distance.toFixed(2)} meters`}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ListOfRides;
