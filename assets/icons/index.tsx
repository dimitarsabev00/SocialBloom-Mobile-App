import { View, Text } from "react-native";
import React from "react";
import Home from "./Home";
import Mail from "./Mail";
import Lock from "./Lock";
import User from "./User";
import Heart from "./Heart";
import Plus from "./Plus";
import Search from "./Search";
import Location from "./Location";
import Call from "./Call";
import { theme } from "../../constants/theme";
import Camera from "./Camera";
import Edit from "./Edit";
import ArrowLeft from "./ArrowLeft";
import ThreeDotsCircle from "./ThreeDotsCircle";
import ThreeDotsHorizontal from "./ThreeDotsHorizontal";
import Comment from "./Comment";
import Share from "./Share";
import Send from "./Send";
import Delete from "./Delete";
import Logout from "./logout";
import Image from "./Image";
import Video from "./Video";

const icons = {
  home: Home,
  mail: Mail,
  lock: Lock,
  user: User,
  heart: Heart,
  plus: Plus,
  search: Search,
  location: Location,
  call: Call,
  camera: Camera,
  edit: Edit,
  arrowLeft: ArrowLeft,
  threeDotsCircle: ThreeDotsCircle,
  threeDotsHorizontal: ThreeDotsHorizontal,
  comment: Comment,
  share: Share,
  send: Send,
  delete: Delete,
  logout: Logout,
  image: Image,
  video: Video,
};

interface IconProps {
  name: keyof typeof icons; // Restrict `name` to the keys of `icons`
  size?: number; // Optional size prop
  strokeWidth?: number; // Optional stroke width prop
  color?: string; // Optional color prop
  [key: string]: any; // Allow additional props (e.g., `style`, `className`)
}

const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  strokeWidth = 1.9,
  color = theme.colors.textLight,
  ...props
}) => {
  const IconComponent = icons[name];

  if (!IconComponent) return null;

  return (
    <IconComponent
      height={size}
      width={size}
      strokeWidth={strokeWidth}
      color={color}
      {...props}
    />
  );
};

export default Icon;