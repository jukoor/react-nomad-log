import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import EmojiFlagsIcon from "@mui/icons-material/EmojiFlags";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import ToggleOnOutlinedIcon from "@mui/icons-material/ToggleOnOutlined";
import Face4Icon from "@mui/icons-material/Face4";
import { MenuStructureType } from "../types/MenuStructureType.tsx";

export const menuStrucutre: MenuStructureType[] = [
  {
    id: 0,
    target: "/",
    text: "Map",
    icon: <MapOutlinedIcon />,
  },
  {
    id: 1,
    target: "/country/de",
    text: "Countries",
    icon: <EmojiFlagsIcon />,
  },
  {
    id: 2,
    target: "profile/SEkyqNajL0Yvp9AATRZI",
    text: "Profile 1",
    icon: <InsertEmoticonIcon />,
  },
  {
    id: 3,
    target: "profile/8pVS1cDjBszgEUE0aug8",
    text: "Profile 2",
    icon: <Face4Icon />,
  },
  {
    id: 4,
    target: "/settings",
    text: "Settings",
    icon: <ToggleOnOutlinedIcon />,
  },
  {
    id: 5,
    target: "/chart",
    text: "Chart",
    icon: <ToggleOnOutlinedIcon />,
  },
];
