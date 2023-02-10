import axios from "axios";
import { useCallback, useEffect, useState } from "react";

import { RGB } from "../../pages/api/palette";
import ColorList from "../rgb/ColorList";
import RGBDisplay from "../rgb/RGBDisplay";
import RGBForm from "../rgb/RGBForm";

import s from "./styles.module.css";

const API_ENDPOINT = "/api/palette";

const Welcome = () => {
  const [colors, setColors] = useState([] as RGB[]);
  const [currentColor, setCurrentColor] = useState({
    id: null,
    red: 255,
    green: 255,
    blue: 255,
  } as RGB);

  const isEditing = !!currentColor.id;
  const maxColorsReached = colors.length >= 5;

  const fetchColors = useCallback(async () => {
    const { status, data } = await axios.get(API_ENDPOINT);

    if (status === 200) {
      setColors(data as RGB[]);
    } else {
      throw new Error("Error connecting to server");
    }
  }, [setColors]);

  useEffect(() => {
    fetchColors();
  }, [fetchColors]);

  const onColorChange = useCallback(rgb => {
    setCurrentColor(rgb);
  }, [setCurrentColor]);

  const saveColor = useCallback(async (rgb: RGB) => {
    if (rgb.id) {
      await axios.put(API_ENDPOINT, rgb);
    } else {
      await axios.post(API_ENDPOINT, rgb);
    }
    await fetchColors();
  }, [fetchColors])

  const startEditingColor = useCallback((color: RGB) => {
    setCurrentColor(color);
  }, [setCurrentColor])

  const deleteColor = async (id: number) => {
    await axios.delete(API_ENDPOINT, { data: id });
    await fetchColors();
  }

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
