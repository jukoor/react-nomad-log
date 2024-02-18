import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import ToggleOnOutlinedIcon from "@mui/icons-material/ToggleOnOutlined";
import { MenuStructureType } from "../types/MenuStructureType.tsx";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";

export const menuStructure: MenuStructureType[] = [
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
  {
    id: 2,
    target: "profile/8pVS1cDjBszgEUE0aug8",
    text: "Profile",
    icon: <InsertEmoticonIcon />,
  },
  {
    id: 3,
    target: "/settings",
    text: "Settings",
    icon: <ToggleOnOutlinedIcon />,
  },
];
