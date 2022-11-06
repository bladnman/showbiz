import { Stack, Box, Typography } from "@mui/material";

export default function SampleHeader({
  title,
  total,
}: {
  title: string;
  total: number;
}) {
  return (
    <Stack direction={"row"} alignItems={"center"}>
      <Box mr={2}>
        <Typography variant="h6">{title}</Typography>
      </Box>
      <TotalBox total={total} />
    </Stack>
  );
}
function TotalBox({ total }: { total: number }) {
  if (!total) return null;
  return (
    <Box paddingX={1} paddingY={0} borderRadius={1} bgcolor={"#404040"}>
      <Typography>{total}</Typography>
    </Box>
  );
}
