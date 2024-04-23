import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import ToggleOnOutlinedIcon from "@mui/icons-material/ToggleOnOutlined";
import LogoutIcon from "@mui/icons-material/Logout";

import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { MenuStructureType } from "../types/MenuStructureType.tsx";

export const useMenuStructure = () => {
  const auth = getAuth();
  const [user] = useAuthState(auth);

  const menuStructure: MenuStructureType[] = [
    {
      id: 0,
      target: "/",
      text: "Map",
      icon: <MapOutlinedIcon />,
    },
    {
      id: 1,
      target: "profile/8pVS1cDjBszgEUE0aug8",
      text: "Profile",
      icon: <InsertEmoticonIcon />,
    },
    {
      id: 2,
      target: "/settings",
      text: "Settings",
      icon: <ToggleOnOutlinedIcon />,
    },
    // Conditionally rendered, only when logged in
    ...(user !== null
      ? [
          {
            id: 3,
            target: "/logout",
            text: "Logout",
            icon: <LogoutIcon />,
          },
        ]
      : []),
  ];

  return menuStructure;
};
