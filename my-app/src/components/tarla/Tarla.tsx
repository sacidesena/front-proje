"use client";

import { useState } from "react";
import styles from "./Tarla.module.css";

export default function Tarla() {
  const gridSize = 4;
  const cards = Array.from({ length: gridSize * gridSize }, (_, i) => i);

  const letters = [" ","t", "f", "ç", "ö"];  

  const [clickCounts, setClickCounts] = useState<{ [key: number]: number }>({});

  function handleClick(id: number) {
    setClickCounts(prev => {
      const currentCount = prev[id] ?? 0; 
      return {
        ...prev,
        [id]: (currentCount + 1) % letters.length,
      };
    });
  }

  return (
    <div className={styles.container}>
      {cards.map((id) => {
        const count = clickCounts[id];
        return (
          <div
            key={id}
            onClick={() => handleClick(id)}
            className={`${styles.card} ${
              count !== undefined && count !== 0 ? styles.cardClicked : styles.cardDefault
            }`}
          >
            {count !== undefined ? letters[count] : " "}
          </div>
        );
      })}
    </div>
  );
}
