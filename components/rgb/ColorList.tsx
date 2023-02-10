import { RGB } from '../../pages/api/palette';
import Button from '../layout/Button';

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

        <Button type="button" onClick={() => onEdit(color)}>edit</Button>
        <Button type="button" onClick={() => onDelete(color.id)}>delete</Button>
      </li>
  );

  return (
    <ul className={s.list}>
      {colorItems}
    </ul>
  )
}
