import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import EmojiFlagsIcon from "@mui/icons-material/EmojiFlags";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import ToggleOnOutlinedIcon from "@mui/icons-material/ToggleOnOutlined";
import { MenuStructureType } from "../types/MenuStructureType.tsx";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";

export const menuStrucutre: MenuStructureType[] = [
  {
    id: 0,
    target: "/",
    text: "Map",
    icon: <MapOutlinedIcon />,
  },
  {
    id: 1,
    target: "/statistics",
    text: "Statistics",
    icon: <BubbleChartIcon />,
  },
  // {
  //   id: 2,
  //   target: "profile/SEkyqNajL0Yvp9AATRZI",
  //   text: "Profile 1",
  //   icon: <InsertEmoticonIcon />,
  // },
  {
    id: 2,
    target: "/settings",
    text: "Settings",
    icon: <ToggleOnOutlinedIcon />,
  },
];
