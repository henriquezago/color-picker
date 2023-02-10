import type { MouseEventHandler } from "react";
import s from "./Button.module.css";

type ButtonProps = {
  type: "button" | "submit";
  children: React.ReactElement | string;
  disabled?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export default function Button({ type = "button", children, disabled, onClick }: ButtonProps) {
  return (
    <button disabled={disabled} className={s.button} type={type} onClick={onClick}>{children}</button>
  );
}