import { Avatar, Typography } from "@mui/material";

const AvatarLetras = ({ name, surname }) => {
  return (
    <Avatar sx={{ width: "220px", height: "220px", backgroundColor: "#0C6F4B" }}>
      <Typography variant="h4" sx={{ fontSize: "100px" }}>
        {name?.trim()[0]} {surname?.trim()[0]}
      </Typography>
    </Avatar>
  );
};

export default AvatarLetras;
