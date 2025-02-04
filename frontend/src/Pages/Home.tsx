import { Typography, Container } from "@mui/material";
import { useAuth } from "../Context/AuthContext";
import ListOfRides from "../Components/ListOfRide";
import AddRide from "../Components/AddRide";

const Home = () => {
  const { user, isDriver, isPassenger } = useAuth();
  console.log(user);
  

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Welcome to DRIVERS
      </Typography>

      {isDriver && <ListOfRides />}
      {isPassenger && <AddRide />}

      {!user && (
        <Typography variant="body1" color="textSecondary">
          Please log in to continue.
        </Typography>
      )}
    </Container>
  );
};

export default Home;
