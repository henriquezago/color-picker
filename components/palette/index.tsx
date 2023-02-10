import { useCallback, useState } from "react";

import useColors from "../../hooks/useColors";
import { RGB } from "../../pages/api/palette";
import ColorList from "../rgb/ColorList";
import RGBDisplay from "../rgb/RGBDisplay";
import RGBForm from "../rgb/RGBForm";

import s from "./styles.module.css";

const Welcome = () => {
  const { colors, saveColor, deleteColor } = useColors();

  const [currentColor, setCurrentColor] = useState({
    id: null,
    red: 255,
    green: 255,
    blue: 255,
  } as RGB);

  const isEditing = !!currentColor.id;
  const maxColorsReached = colors.length >= 5;

  const onColorChange = useCallback(rgb => {
    setCurrentColor(rgb);
  }, [setCurrentColor]);

  const startEditingColor = useCallback((color: RGB) => {
    setCurrentColor(color);
  }, [setCurrentColor])

  const cancelEditing = useCallback(() => {
    setCurrentColor({
      id: null,
      red: 255,
      green: 255,
      blue: 255,
    })
  }, [setCurrentColor]);

  return (
    <div className={s.welcomeContainer}>
      <h1 className={s.title}>Palette</h1>
      {isEditing ? <h2 className={s.subTitle}>Editing: color {currentColor.id}</h2> : null}
      <div className={s.content}>
        <RGBDisplay rgb={currentColor} />

        <RGBForm
          disabled={!isEditing && maxColorsReached}
          rgb={currentColor}
          onColorChange={onColorChange}
          onSave={saveColor}
          onCancel={cancelEditing}
        />

        <ColorList colors={colors} onDelete={deleteColor} onEdit={startEditingColor} />
      </div>
    </div>
  );
};

export default Welcome;
