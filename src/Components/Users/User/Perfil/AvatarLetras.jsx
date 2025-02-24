import { Avatar, Typography } from "@mui/material";

const AvatarLetras = ({ user }) => {
  return (
    <Avatar sx={{ width: "220px", height: "220px", backgroundColor: "#0C6F4B" }}>
      <Typography variant="h4" sx={{ fontSize: "100px" }}>
        {user ? `${user?.split(" ")[0]?.trim()[0]} ${user?.split(" ")[1]?.trim()[0]}` : ""}
      </Typography>
    </Avatar>
  );
};

export default AvatarLetras;
