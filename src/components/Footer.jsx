import { Stack } from "@mui/material";

const Footer = () => {
  const d = new Date();
  let year = d.getFullYear();

  return (
    <Stack
      direction="row"
      sx={{
        marginTop: "auto",
        padding: "10px",
        justifyContent: "center",
        bgcolor: "#1976d2",
        color: "#FFFFFF",
      }}
    >
      <p>© {year} All rights reserved</p>
    </Stack>
  );
};

export default Footer;
