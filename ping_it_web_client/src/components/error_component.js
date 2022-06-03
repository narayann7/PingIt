import { Link } from "react-router-dom";

function Error() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <h2>404 Page Not Found ☹️</h2>
      <Link to={"/"}>go back</Link>
    </div>
  );
}
export default Error;
