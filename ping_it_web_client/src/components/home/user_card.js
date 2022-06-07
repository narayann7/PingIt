import { Avatar, Card, CardContent, CardMedia, Skeleton } from "@mui/material";
import React from "react";
import { RiUser3Line } from "react-icons/ri";
import { TiUserAddOutline } from "react-icons/ti";
import common_styles from "../common_styles";
import { useHomeContext } from "../../context_api/home_context";
const Text = common_styles.Text;

function UserCard({ user }) {
  const { addUser } = useHomeContext();
  return (
    <Card
      style={{
        marginBottom: "12px",
        width: "25vw",
        height: "10vh",
        borderRadius: "10px",
        minWidth: "220px",
        minHeight: "75px",
        backgroundColor: "#030e21",
      }}
    >
      <CardContent
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Avatar
          style={{
            backgroundColor: user.displayPictureUrl ? "#1a1a2b" : "#fff",
            color: "#fff",
          }}
          alt="user"
        >
          {user.displayPictureUrl ? (
            <CardMedia component="img" image={user.displayPictureUrl} />
          ) : (
            <RiUser3Line color="#1a1a2b" />
          )}
        </Avatar>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "start",
            paddingLeft: "10px",
          }}
        >
          <Text>{user.username}</Text>
          <Text>{user.email}</Text>
        </div>
        <div onClick={() => addUser(user)}>
          <Avatar
            style={{
              backgroundColor: "#030e21",
            }}
            className="add_friend"
          >
            <TiUserAddOutline color="#d8a01f" />
          </Avatar>
        </div>
      </CardContent>
    </Card>
  );
}

export function UserCardSkeleton() {
  return (
    <div
      style={{
        marginTop: "12px",
        marginLeft: "10px",
        width: "25vw",
        height: "10vh",
        borderRadius: "10px",
        minWidth: "220px",
        minHeight: "75px",
        backgroundColor: "transparent",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Skeleton variant="circular" width={40} height={40} />
      <div
        style={{
          display: "flex",
          paddingLeft: "10px",
          flexDirection: "column",
          width: "20vw",
        }}
      >
        <Skeleton
          variant="text"
          style={{
            width: "60%",
          }}
        />
        <Skeleton variant="text" />
      </div>
    </div>
  );
}

export default UserCard;
