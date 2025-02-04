import { Box } from "@mui/material";

interface MainProps {
    children: React.ReactNode;
}
export const Main = ({ children }: MainProps) => {
  return (
    <Box>
      {children}
    </Box>
  );
};
