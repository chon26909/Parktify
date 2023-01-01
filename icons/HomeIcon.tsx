import Svg, { SvgProps, Rect, Path, Circle } from "react-native-svg";
import React from "react";

interface Props {
  color: string;
  size: number;
  focused: boolean;
}

const HomeIcon = (props: Props) => {
  return (
    <Svg viewBox="0 0 24 24" width={props.size} height={props.size}>
      {/* <Rect
        x={64}
        y={176}
        width={384}
        height={256}
        rx={28.87}
        ry={28.87}
        fill="none"
        stroke={props.color}
        strokeLinejoin="round"
        strokeWidth={32}
      /> */}
      <Path
        stroke={props.color}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={2}
        fill={props.color}
        d="M3 10v11h6v-7h6v7h6v-11L12,3z"
      />
    </Svg>
  );
};

export default HomeIcon;
