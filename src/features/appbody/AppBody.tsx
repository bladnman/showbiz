import { Box, Typography } from "@mui/material";
import useMegaStore from "../../store/MegaStore";

const AppBody = () => {
  const drawerWidth = useMegaStore((state) => state.drawerWidth);
  return (
    <Box
      flex="1"
      display="flex"
      flexDirection={"column"}
      overflow={"none"}
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        pt: 8,
        height: "100vh",
      }}
    >
      <Typography>Hiya... I'm the body</Typography>
    </Box>
  );
};
export default AppBody;
