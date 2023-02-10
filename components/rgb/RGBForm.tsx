import { useCallback, useState } from "react";

import { RGB } from "../../pages/api/palette";

import s from "./RGBForm.module.css";

interface RGBFormProps {
  rgb: RGB;
  onColorChange: (rgb: RGB) => void;
  onSave: (rgb: RGB) => void;
}

enum RGBField {
  red,
  green,
  blue
}

export default function RGBForm({ rgb, onColorChange, onSave }: RGBFormProps) {
  const { red, green, blue } = rgb;

  const [rgbValue, setRGBValue] = useState(rgb);

  const onChange = (value: string, field: RGBField) => {
    switch (field) {
      case red:
        const newRed = {
          ...rgbValue,
          red: parseInt(value)
        }
        setRGBValue(newRed);
        onColorChange(newRed);
        break;

      case green:
        const newGreen = {
          ...rgbValue,
          green: parseInt(value)
        }
        setRGBValue(newGreen);
        onColorChange(newGreen);
        break;

      case blue:
        const newBlue = {
          ...rgbValue,
          blue: parseInt(value)
        }
        setRGBValue(newBlue);
        onColorChange(newBlue);
        break;

      default:
        console.error("invalid field");
        break;
    }
  };

  return (
    <div className={s.wrapper}>
      <input
        value={rgbValue.red.toString()}
        onChange={(event) => onChange(event.target.value, red)}
        type="number"
        min={0}
        max={255}
      />
      <input
        value={rgbValue.green.toString()}
        onChange={(event) => onChange(event.target.value, green)}
        type="number"
        min={0}
        max={255}
      />
      <input
        value={rgbValue.blue.toString()}
        onChange={(event) => onChange(event.target.value, blue)}
        type="number"
        min={0}
        max={255}
      />
      <button type="button" onClick={() => onSave(rgbValue)}>save</button>
    </div>
  );
};
