import React from "react";
import common_styles from "../common_styles";
const CenterCard = common_styles.CenterCard;
function AllChats() {
  return (
    <CenterCard
      style={{
        width: "30vw",
        height: "75vh",
        marginLeft: "40px",
        marginTop: "30px",
        minWidth: "250px",
        minHeight: "60px",
      }}
    ></CenterCard>
  );
}

export default AllChats;
