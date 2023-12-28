import Footerfour from "./Footerfour";
import Footerone from "./footerone";
import Footertwo from "./Footertwo";
import Footerthree from "./Footerthree";
import { Box, colors } from "@mui/material";
import FooterNavigation from "./FooterNavigation";

const Footer = () => {
  return (
    <Box
      component={"footer"}
      sx={{ width: "100%", bgcolor: colors.grey[900], mt: 2, p: 3, py: 5 }}
    >
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          py: 2,

          justifyContent: "space-between",
          alignItems: "center",
          color: "white",
          gap:6
        }}
      >
        <Footerone />
        <FooterNavigation
          title={"About us"}
          data={Array.from(Array(5).keys())}
        />
        <FooterNavigation
          title={"Customer Care"}
          data={Array.from(Array(5).keys())}
        />

        <Footerfour />
      </Box>
    </Box>
  );
};

export default Footer;
