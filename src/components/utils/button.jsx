import React, { useState } from "react";
import Button from "@mui/material/Button";
import { appTheme } from "./../../themes/theme";

function BlueButton(props) {
  const [hover, setHover] = useState(false);

  const handleMouseOver = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  return (
    <Button
      variant="contained"
      style={{
        backgroundColor: hover ? appTheme.palette.secondary.main : appTheme.palette.primary.main,
        color: "white",
        padding: "10px 20px",
        borderRadius: "5px",
        fontSize: "16px",
        transition: "background-color 0.3s ease",
      }}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      {...props}
    />
  );
}

export default BlueButton;

