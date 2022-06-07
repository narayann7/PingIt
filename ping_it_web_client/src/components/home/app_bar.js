import { Avatar, CardMedia } from "@mui/material";
import { TiUserAddOutline } from "react-icons/ti";
import { BiSearchAlt, BiLogInCircle } from "react-icons/bi";
import { RiUser3Line } from "react-icons/ri";
import { React } from "react";
import { useNavigate } from "react-router-dom";
import common_styles from "../common_styles";
import UserService from "../../services/user";
import Auth from "../../services/auth";
import { useHomeContext } from "../../context_api/home_context";
const CenterCard = common_styles.CenterCard;
const Text = common_styles.Text;

function AppBar() {
  const navigate = useNavigate();
  const { user, setcurrentTab } = useHomeContext();

  // useEffect(() => {
  //   {
  //   }
  // }, []);

  const logout = () => {
    Auth.deleteRefreshToken();
    UserService.deleteMeLocalStorage();
    navigate("/login", { replace: true });
  };
  const allChat = () => {
    setcurrentTab(0);
  };
  const addFriend = () => {
    setcurrentTab(2);
  };
  const profile = () => {
    setcurrentTab(1);
  };
  // const search = () => {
  //   setcurrentTab(3);
  // };
  return (
    <CenterCard style={cardStyle}>
      <div onClick={allChat}>{Heading}</div>

      <Avatar
        style={{
          backgroundColor: user.displayPictureUrl ? "#1a1a2b" : "#030e21",
          color: "#fff",
        }}
        className="profile"
        onClick={profile}
        alt="user"
      >
        {user.displayPictureUrl ? (
          <CardMedia component="img" image={user.displayPictureUrl} />
        ) : (
          <RiUser3Line color="#d8a01f" />
        )}
      </Avatar>
      <Avatar
        style={{
          backgroundColor: "#030e21",
        }}
        className="add_friend"
        onClick={addFriend}
      >
        <TiUserAddOutline color="#d8a01f" />
      </Avatar>
      {/* <Avatar
        style={{
          backgroundColor: "#030e21",
        }}
        className="search"
        onClick={search}
      >
        <BiSearchAlt color="#d8a01f" />
      </Avatar> */}
      <Avatar
        className="logout"
        onClick={logout}
        style={{
          backgroundColor: "#030e21",
        }}
      >
        <BiLogInCircle color="#d8a01f" />
      </Avatar>
    </CenterCard>
  );
}

export default AppBar;

//------------------- static componets -------------------
const Heading = (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
    }}
  >
    <Text
      sx={{
        fontSize: "1.8rem",
      }}
    >
      Ping
    </Text>
    <Text
      sx={{
        fontSize: "1.8rem",
        color: "#d8a01f",
      }}
    >
      It
    </Text>
  </div>
);

const cardStyle = {
  width: "30vw",
  height: "10vh",
  marginLeft: "40px",
  minWidth: "250px",
  minHeight: "60px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
};
