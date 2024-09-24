import style from "./button.module.css";
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";

interface ButtonInterface {
  title: string;
  use: string;
  arrow?: string;
  size: string;
  clickHandler?: () => void;
  disabled?: boolean;
}

function Button({ title, use, arrow, size, clickHandler, disabled }: ButtonInterface) {
  const sizeModificator = size && size !== "small" ? style[`btn--${size}`] : "";

  return (
    <button
      className={`${style.btn} ${use ? style[`btn--${use}`] : ""}
        ${sizeModificator}`}
      onClick={clickHandler}
      disabled={disabled}
    >
      {arrow && arrow === "left" && <BiArrowToLeft />}
      {title}

      {arrow && arrow !== "left" && <BiArrowToRight />}
    </button>
  );
}

export default Button;
