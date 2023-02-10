import { RGB } from "../../pages/api/palette";

import s from "./RGBDisplay.module.css";

interface RGBDisplayProps {
  rgb: RGB;
}

const RGBDisplay = ({ rgb }: RGBDisplayProps) => {
  const rgbStyle = `rgb(${rgb.red}, ${rgb.green}, ${rgb.blue}, 1)`;
  return <div className={s.display} style={{ backgroundColor: rgbStyle }} />;
};

export default RGBDisplay;
