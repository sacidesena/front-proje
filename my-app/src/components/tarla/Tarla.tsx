"use client";

import { useState, useEffect } from "react";
import styles from "./Tarla.module.css";

export default function Tarla() {
  const gridSize = 4;
  const cards = Array.from({ length: gridSize * gridSize }, (_, i) => i);

  const letters = [" ", "t", "f", "b", "ç","k"];

  
  const [clickCounts, setClickCounts] = useState<{ [key: number]: number }>({});

  
  const [grownCards, setGrownCards] = useState<number[]>([]);

  function handleClick(id: number) {
    setClickCounts(prev => {
      const currentCount = prev[id] ?? 0;
     if (currentCount === 4) {
  setGrownCards(prevCards => prevCards.filter(cardId => cardId !== id));
  return {
    ...prev,
    [id]: 0,
  };
} else if (currentCount === 5) {
    setGrownCards(prevCards => prevCards.filter(cardId => cardId !== id));
  
  return {
    ...prev,
    [id]: 0,
  };
} else {

  return {
    ...prev,
    [id]: currentCount + 1,
  };
  }
  });

    setGrownCards(prev => {
      if (!prev.includes(id)) {
        return [...prev, id];
      }
      return prev;
    });
  }

  useEffect(() => {
  if (grownCards.length === 0) return;
  
  let delay = 2000;

  for (const id of grownCards) {
    const currentCount = clickCounts[id] ?? 0;
    if (currentCount === 4) {
      delay = 4000;
      break;
    }
  }

  const timer = setTimeout(() => {
    setClickCounts(prev => {
      const newCounts = { ...prev };
      let newGrownCards = [...grownCards];

      newGrownCards.forEach((id) => {
        const currentCount = prev[id] ?? 0;
        if(currentCount === 5){
            return;
        }

        if (currentCount === letters.length - 1) {
          newGrownCards = newGrownCards.filter(cardId => cardId !== id);
          newCounts[id] = 0;
        } else {
          newCounts[id] = currentCount + 1;
        }
      });

      if (newGrownCards.length !== grownCards.length) {
        setGrownCards(newGrownCards);
      }

      return newCounts;
    });
  }, delay);

  return () => clearTimeout(timer);
}, [clickCounts, grownCards, letters.length]);




  return (
    <div className={styles.container}>
      {cards.map((id) => {
        const count = clickCounts[id];
        const isGrown = grownCards.includes(id);

        return (
          <div
            key={id}
            onClick={() => handleClick(id)}
            className={`${styles.card} ${
              count !== undefined && count !== 0 ? styles.cardClicked : styles.cardDefault
            } ${isGrown ? styles.cardGrow : ""}`}
          >
            {count !== undefined ? letters[count] : " "}
          </div>
        );
      })}
    </div>
  );
}
