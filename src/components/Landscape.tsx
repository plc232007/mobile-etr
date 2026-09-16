import React from "react";
import Svg, { Path, Circle, G, Rect, Line, Ellipse } from "react-native-svg";
export function Landscape({ height = 145 }: { height?: number }) {
  return (
    <Svg
      width="100%"
      height={height}
      viewBox="0 0 400 170"
      preserveAspectRatio="xMidYMid slice"
      accessibilityLabel="Ilustração de campos e montanhas do Cerrado"
      role="img"
    >
      <Rect width="400" height="170" fill="#EAF0DE" />
      <Circle cx="311" cy="38" r="22" fill="#E7C66E" />
      <Path
        d="M0 101 Q65 28 135 85 Q200 15 288 78 Q358 41 400 81 V170 H0Z"
        fill="#AAC29C"
      />
      <Path d="M0 108 Q74 70 180 111 Q273 65 400 106 V170 H0Z" fill="#789A6C" />
      <Path
        d="M0 143 Q111 83 235 127 Q315 151 400 111 V170 H0Z"
        fill="#426D4C"
      />
      <Path
        d="M119 170 Q188 139 267 119 Q304 110 333 108"
        fill="none"
        stroke="#E8D7AB"
        strokeWidth="14"
      />
      <Path
        d="M0 149 Q75 120 160 128 M0 161 Q79 129 143 138 M270 151 Q339 173 400 146"
        fill="none"
        stroke="#79965C"
        strokeWidth="2"
      />
      <G transform="translate(65,66)">
        <Rect x="19" y="27" width="4" height="37" rx="2" fill="#725F42" />
        <Ellipse cx="21" cy="18" rx="21" ry="24" fill="#365F41" />
        <Circle cx="8" cy="25" r="13" fill="#365F41" />
        <Circle cx="33" cy="25" r="14" fill="#365F41" />
      </G>
      <G transform="translate(320,103)">
        <Path d="M0 8 L14 0 L28 8 V25 H0Z" fill="#F3E9CB" />
        <Path
          d="M-4 8 L14 -3 L32 8"
          stroke="#735B3E"
          strokeWidth="5"
          fill="none"
        />
        <Rect x="12" y="13" width="6" height="12" fill="#8B9874" />
      </G>
    </Svg>
  );
}
export function PropertyMap() {
  return (
    <Svg
      width="100%"
      height={240}
      viewBox="0 0 400 240"
      accessibilityLabel="Mapa ilustrativo, sem precisão geográfica, com o polígono do imóvel destacado"
      role="img"
    >
      <Rect width="400" height="240" fill="#E9EFDE" />
      <Path
        d="M0 20L155 90L80 240M170 0L230 110L400 145M400 215L225 145L170 240"
        stroke="#D2DDBC"
        strokeWidth="30"
        fill="none"
      />
      <Path
        d="M10 0Q130 90 260 65T390 240"
        stroke="#B9D5DA"
        strokeWidth="13"
        fill="none"
      />
      <Path
        d="M0 205L140 133L280 185L400 50"
        stroke="#FFFDF7"
        strokeWidth="12"
        fill="none"
      />
      <Path
        d="M115 68L239 42L294 127L183 172L108 131Z"
        fill="#447C4C"
        fillOpacity="0.28"
        stroke="#285D39"
        strokeWidth="3"
        strokeDasharray="6 3"
      />
      <Circle cx="194" cy="107" r="12" fill="#174B39" />
      <Circle cx="194" cy="107" r="4" fill="white" />
      <Line
        x1="358"
        y1="42"
        x2="358"
        y2="17"
        stroke="#174B39"
        strokeWidth="2"
      />
      <Path d="M353 23L358 14L363 23" fill="#174B39" />
    </Svg>
  );
}
