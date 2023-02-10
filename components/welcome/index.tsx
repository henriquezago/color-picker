import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import RGBForm from "../rgb/RGBForm";
import RGBDisplay from "../rgb/RGBDisplay";
import { RGB } from "../../pages/api/palette";

import s from "./styles.module.css";
import ColorList from "../rgb/ColorList";

const API_ENDPOINT = "/api/palette";

const Welcome = () => {
  const [colors, setColors] = useState([] as RGB[]);
  const [currentColor, setCurrentColor] = useState({
    red: 255,
    green: 255,
    blue: 255,
  });

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

  const saveColor = async (rgb: RGB) => {
    if (rgb.id) {
      await axios.put(API_ENDPOINT, rgb);
    } else {
      await axios.post(API_ENDPOINT, rgb);
    }
    await fetchColors();
  }

  const deleteColor = async (id: number) => {
    await axios.delete(API_ENDPOINT, { data: id });
    await fetchColors();
  }

  return (
    <div className={s.welcomeContainer}>
      <h1 className={s.title}>Palette</h1>
      <div className={s.content}>
        <RGBDisplay rgb={currentColor} />
        <RGBForm rgb={currentColor} onColorChange={onColorChange} onSave={saveColor} />
        <ColorList colors={colors} onDelete={deleteColor} />
      </div>
    </div>
  );
};

export default Welcome;
