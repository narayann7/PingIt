import { Button } from "@mui/material";
import { React, useState, useContext } from "react";
import {RootContext} from "../context_api/root_context";

function TestComp() {
  //   const hello = () => {
  //     console.log("hello");
  //   };
  const { isAuthenticated, setIsAuthenticated } = useContext(RootContext);

  const [message, setMessage] = useState("hello");
  const bye = () => {
    setMessage("bye world");
  };

  const [funny, setFunny] = useState(() => () => {
    setMessage("hello world");
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Button
        onClick={() => {
          setIsAuthenticated(true);
          console.log(isAuthenticated);
        }}
      >
        click me 1
      </Button>
      <Button
        onClick={() => {
          setIsAuthenticated(false);
        }}
      >
        click me 2
      </Button>
      <Button
        onClick={() => {
          setMessage(isAuthenticated.toString());
        }}
      >
        click me 3
      </Button>
      <Button>click me 4</Button>
      <Button>click me 5</Button>

      <div
        style={{
          display: "flex",
          height: "30vh",
          width: "50vw",
          backgroundColor: "#000000",
          color: "#ffffff",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {message}
        </p>
      </div>
    </div>
  );
}

export default TestComp;
