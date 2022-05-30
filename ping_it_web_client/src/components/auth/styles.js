import { styled } from "@mui/material/styles";
import background from "../../assets/images/pingit_bg.png";
import { Card, Box } from "@mui/material";
const BackgroundBox = styled(Box)({
  height: "100vh",
  width: "100vw",
  backgroundImage: `url(${background})`,
  backgroundSize: "cover",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundPosition: "center",

});

const CenterCard = styled(Card)(({ theme }) => ({
  width: "30vw",
  height: "65vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  borderRadius: "12px",
  backgroundColor: theme.palette.background.paper,

}));

const styles = {
  BackgroundBox,
  CenterCard,
};

export default styles;
