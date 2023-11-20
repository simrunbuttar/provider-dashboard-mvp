import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  
  const navigate = useNavigate();

  const handlePersonButtonClick = () => {
    navigate('/form');
  };

  const handleHomeButtonClick = () => {
    navigate('/');
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton onClick = {handleHomeButtonClick}>
          <HomeIcon />
        </IconButton>
        <IconButton onClick = {handlePersonButtonClick}>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;