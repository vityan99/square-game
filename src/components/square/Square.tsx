import style from "./square.module.css";
import cn from "classnames";

interface SquareInterface {
  value: number;
  active: boolean;
  clickHandler: (prop: number) => void;
}

function Square({ value, active, clickHandler }: SquareInterface) {
  return (
    <div
      className={cn(style.square, style[`square--${value}`], active ? style[`square--active`] : "")}
      onClick={() => active && clickHandler(value)}
    >
      {value}
    </div>
  );
}

export default Square;
