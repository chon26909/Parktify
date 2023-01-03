import { View, Text } from "react-native";
import Svg, { SvgProps, Rect, Path, Circle } from "react-native-svg";
import { colors } from "../components/colors";

interface Props {
  color: string;
  size: number;
}

const MyLocationIcon = (props: Props) => {
  return (
    <Svg viewBox="0 0 24 24" width={props.size} height={props.size}>
      <Path fill="none" d="M0 0h24v24H0V0z" />
      <Circle cx="12" cy="12" r="2" opacity=".3" />
      <Path
        fill={props.color}
        d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm8.94-3A8.994 8.994 0 0 0 13 3.06V1h-2v2.06A8.994 8.994 0 0 0 3.06 11H1v2h2.06A8.994 8.994 0 0 0 11 20.94V23h2v-2.06A8.994 8.994 0 0 0 20.94 13H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"
      />
    </Svg>
  );
};

export default MyLocationIcon;
