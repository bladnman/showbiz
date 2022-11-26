import Box from "@mui/material/Box";

export default function BoxAbsolute(props: any) {
  const { children, sx, ...otherProps } = props || {};
  return (
    <Box
      {...otherProps}
      sx={{
        width: "100%",
        ...sx,
        position: "absolute",
      }}
    >
      {children}
    </Box>
  );
}
