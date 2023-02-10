import axios from "axios";
import { useCallback, useEffect, useState } from "react";

import { RGB } from "../pages/api/palette";

const API_ENDPOINT = "/api/palette";

const useColors = () => {
  const [colors, setColors] = useState([] as RGB[]);

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

  const saveColor = async (rgb: RGB) => {
    if (rgb.id) {
      await axios.put(API_ENDPOINT, rgb);
    } else {
      await axios.post(API_ENDPOINT, rgb);
    }
    await fetchColors();
  };

  const deleteColor = async (id: number) => {
    await axios.delete(API_ENDPOINT, { data: id });
    await fetchColors();
  };

  return { colors, saveColor, deleteColor };
};

export default useColors;
