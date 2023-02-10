import { useCallback, useEffect, useState } from "react";

import { RGB } from "../../pages/api/palette";

import s from "./RGBForm.module.css";
import Button from "../layout/Button";

type RGBFormProps = {
  rgb: RGB;
  disabled?: boolean;
  onCancel: () => void;
  onColorChange: (rgb: RGB) => void;
  onSave: (rgb: RGB) => void;
}

enum RGBField {
  red,
  green,
  blue
}

export default function RGBForm({ disabled, rgb, onCancel, onColorChange, onSave }: RGBFormProps) {
  const [rgbValue, setRGBValue] = useState(rgb);

  useEffect(() => {
    setRGBValue(rgb);
  }, [rgb, setRGBValue]);

  const onChange = useCallback((value: string, field: RGBField) => {
    switch (field) {
      case RGBField.red:
        const newRed = {
          ...rgbValue,
          red: parseInt(value)
        }
        setRGBValue(newRed);
        onColorChange(newRed);
        break;

      case RGBField.green:
        const newGreen = {
          ...rgbValue,
          green: parseInt(value)
        }
        setRGBValue(newGreen);
        onColorChange(newGreen);
        break;

      case RGBField.blue:
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
  }, [rgbValue, setRGBValue, onColorChange]);

  return (
    <div className={s.wrapper}>
      <div className={s.inputs}>
        <div>
          <span>Red:</span>
          <input
            value={rgbValue.red.toString()}
            onChange={(event) => onChange(event.target.value, RGBField.red)}
            type="number"
            min={0}
            max={255}
            disabled={disabled}
          />
        </div>
        <div>
          <span>Green:</span>
          <input
            value={rgbValue.green.toString()}
            onChange={(event) => onChange(event.target.value, RGBField.green)}
            type="number"
            min={0}
            max={255}
            disabled={disabled}
          />
        </div>
        <div>
          <span>Blue:</span>
          <input
            value={rgbValue.blue.toString()}
            onChange={(event) => onChange(event.target.value, RGBField.blue)}
            type="number"
            min={0}
            max={255}
            disabled={disabled}
          />
        </div>
      </div>
      <div className={s.buttons}>
        <Button type="button" disabled={!rgbValue.id} onClick={() => onCancel()}>
          cancel
        </Button>

        <Button type="button" onClick={() => onSave(rgbValue)} disabled={disabled}>
          save
        </Button>
      </div>
    </div>
  );
};
