import { Box, Stack } from "@mui/material";
import { Button } from "@mui/material/";
import { useNavigate, Outlet } from "react-router-dom";

export const SessionChoicePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box margin="auto" width="20%">
      <Stack marginTop="100px" spacing={3}>
        <Button sx={{ height: 50 }} variant="contained" onClick={() => navigate("login")}>
          Log in
        </Button>
      </Stack>
      <Outlet />
    </Box>
  );
};
