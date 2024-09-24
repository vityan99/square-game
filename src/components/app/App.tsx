import { useEffect, useState } from "react";
import style from "./app.module.css";
import cn from "classnames";

import Square from "../square/Square";
import Button from "../button/Button";

function App() {
  const [values, setValues] = useState<number[]>([10, 20, 30, 100, 50, 70, 65, 45, 15]);
  const [active, setActive] = useState<boolean[]>([false, false, false, false, false, false, false, false, false]);
  const [total, setTotal] = useState<number>(0);
  const [timer, setTimer] = useState<number>(5);
  const [gameStart, setGameStart] = useState<boolean>(false);

  const setTimerHandler = (): void =>
    setTimer((current) => {
      if (current > 0) {
        return current - 1;
      }
      return 0;
    });

  const setValuesHandler = (): void => {
    const shuffledArray = [...values].sort(() => Math.random() - 0.5);
    setValues(shuffledArray);
  };

  const setActiveHandler = (): void => {
    const randomIndex = Math.floor(Math.random() * active.length);
    const newActive = active.map((item, index) => (index === randomIndex ? true : item));

    setActive(newActive);
  };

  const resetActiveHandler = (): void => setActive([false, false, false, false, false, false, false, false, false]);

  const resetTimer = (): void => setTimer(5);

  const setGameStartHandler = (): void => {
    setGameStart((current) => !current);
  };

  const setTotalHandler = (value: number): void => {
    gameStart && setTotal((current) => current + value);
  };

  const resetTotalHandler = (): void => setTotal(0);

  useEffect(() => {
    if (!gameStart) {
      return;
    }

    const stopGameId: NodeJS.Timeout = setTimeout(() => {
      setGameStartHandler();
    }, 5000);

    const randomShuffle: NodeJS.Timer = setInterval(() => {
      setActiveHandler();
      setValuesHandler();
      setTimerHandler();
    }, 1000);

    return () => {
      clearTimeout(stopGameId);
      clearInterval(randomShuffle);
      resetActiveHandler();
      resetTimer();
    };
  }, [gameStart]);

  return (
    <div className={cn(style["game-area"])}>
      <div className={cn(style["game-area__btn"])}>
        <Button use="pay" size="large" title="Начать игру" clickHandler={setGameStartHandler} />
        <Button use="primary" size="large" title="Сбросить счёт" clickHandler={resetTotalHandler} />
      </div>
      <div className={cn(style["game-area__timer"])}>Время: {timer} секунд (-ы)</div>
      <span className={cn(style["game-area__total"])}>Счёт: {total}</span>
      <div className={cn(style["game-area__wrapper"], !gameStart && style["game-area__wrapper--not-active"])}>
        {values.length > 0 && values.map((value, i) => <Square value={value} active={active[i]} clickHandler={setTotalHandler} key={i} />)}
      </div>
    </div>
  );
}

export default App;
