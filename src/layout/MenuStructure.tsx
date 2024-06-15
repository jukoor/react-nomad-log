import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import ToggleOnOutlinedIcon from "@mui/icons-material/ToggleOnOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import GoogleIcon from "@mui/icons-material/Google";

import { MenuStructureType } from "../types/MenuStructureType.tsx";
import { useAppSelector } from "../hooks/reduxHooks.tsx";

export const useMenuStructure = () => {
  const userData = useAppSelector((state) => state.User);

  // Return menu structure each for logged in and logged out state
  const menuStructure: MenuStructureType[] = userData.isLoggedIn
    ? [
        {
          id: 0,
          target: "/",
          text: "Map",
          icon: <MapOutlinedIcon />,
        },
        {
          id: 1,
          target: `/profile/${userData?.selectedUser?.uid}`,
          text: "Profile",
          icon: <InsertEmoticonIcon />,
        },
        {
          id: 2,
          target: "/settings",
          text: "Settings",
          icon: <ToggleOnOutlinedIcon />,
        },
        {
          id: 3,
          target: "/logout",
          text: "Logout",
          icon: <LogoutIcon />,
        },
      ]
    : [
        {
          id: 0,
          target: "/login",
          text: "Sign in",
          icon: <GoogleIcon />,
        },
      ];

  return menuStructure;
};
