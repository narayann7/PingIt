import { styled } from "@mui/material/styles";
import background from "../../assets/images/pingit_bg.png";
import { Card, Typography, Box } from "@mui/material";
const BackgroundBox = styled(Box)({
  height: "100vh",
  width: "100vw",
  backgroundImage: `url(${background})`,
  backgroundSize: "cover",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const styles = {
  BackgroundBox,

}

export default styles