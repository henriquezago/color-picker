import { RGB } from '../../pages/api/palette';

import s from "./ColorList.module.css";

type Props = {
  colors: RGB[];
  onEdit: (rgb: RGB) => void;
  onDelete: (rgbId: number) => void;
}

export default function ColorList({ colors, onEdit, onDelete }: Props) {
  const colorItems = colors.map(
    (color: RGB) =>
      <li className={s.colorItem} key={color.id}>
        {color.id} -

        <div
          className={s.colorBadge}
          style={{ backgroundColor: `rgb(${color.red}, ${color.green}, ${color.blue}, 1)` }}
        />

        <button type="button" onClick={() => onEdit(color)}>edit</button>
        <button type="button" onClick={() => onDelete(color.id)}>delete</button>
      </li>
  );

  return (
    <ul className={s.list}>
      {colorItems}
    </ul>
  )
}
