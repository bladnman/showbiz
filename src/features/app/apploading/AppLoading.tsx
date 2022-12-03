import { Box, Typography } from "@mui/material";

export default function AppLoading() {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"100vh"}
    >
      <Typography sx={{ opacity: 0.2 }} variant={"h4"}>
        loading...
      </Typography>
    </Box>
  );
}
