import React, { useCallback, useEffect, useState } from "react";
import FF from "../img/Final-Fantasy-Logo.jpg";
import FFVIII from "../img/FFVIII_logo.jpg";
import FFX from "../img/FFX&X-2_logo.png";
import FFXIII from "../img/FFXIII_logo.png";
import FFXV from "../img/FFXV_logo.png";
import FFXVI from "../img/Final_Fantasy_XVI_Logo.png";
import Card from "./Card";

const Cards = ({ title }) => {
  const [items, setItems] = useState(
    [
      { id: 1, image: FF, isFlipped: false },
      { id: 1, image: FF, isFlipped: false },
      { id: 8, image: FFVIII, isFlipped: false },
      { id: 8, image: FFVIII, isFlipped: false },
      { id: 10, image: FFX, isFlipped: false },
      { id: 10, image: FFX, isFlipped: false },
      { id: 13, image: FFXIII, isFlipped: false },
      { id: 13, image: FFXIII, isFlipped: false },
      { id: 15, image: FFXV, isFlipped: false },
      { id: 15, image: FFXV, isFlipped: false },
      { id: 16, image: FFXVI, isFlipped: false },
      { id: 16, image: FFXVI, isFlipped: false },
    ].sort(() => Math.random() - 0.5)
  );

  const [flippedCards, setFlippedCards] = useState([]);
  let [messageWin, setMessageWin] = useState();
  let [score, setScore] = useState(0);
  let [countError, setCountError] = useState(0);

  const handleClick = (id) => {
    if (!items[id].isFlipped) {
      const updatedItems = items.map((item, index) => {
        if (index === id) {
          console.log(item);
          return { ...item, isFlipped: true }; // Marque la carte comme retournée
        }
        return item;
      });

      setItems(updatedItems);

      setFlippedCards((prevIsRevert) => {
        const updatedFlippedCards = [...prevIsRevert, { ...updatedItems[id] }];
        return updatedFlippedCards;
      });
    }
  };

  const checkSameCards = useCallback(() => {
    if (flippedCards.length === 2) {
      const [card1, card2] = flippedCards;
      const increment = 1;
      if (card1.id === card2.id) {
        setScore((current) => {
          return current + increment;
        });
      } else {
        const updatedItems = items.map((item) => {
          if (item.id === card1.id || item.id === card2.id) {
            return { ...item, isFlipped: false };
          }
          return item;
        });
        setCountError((current) => {
          return current + increment;
        });
        setTimeout(function () {
          setItems(updatedItems);
        }, 2000);
      }
      setFlippedCards([]);
    }
  }, [flippedCards, items]);

  const Win = useCallback(() => {
    if (score === 6) {
      setMessageWin("Vous avez gagné!");
    }
  }, [score]);

  useEffect(() => {
    checkSameCards();
    Win();
  }, [checkSameCards, Win]);

  return (
    <div className="container d-flex justify-content-center flex-column mt-5 text-white">
      <h1>{title}</h1>
      {messageWin && (
        <span className="bg-success rounded m-auto p-3">{messageWin}</span>
      )}
      <div className="d-flex w-100 justify-content-evenly mt-5">
        <div id="score">
          <h2>Score</h2>
          {score && <span className="h2">{score}</span>}
        </div>
        <div id="error-counting">
          <h2>Nombre d'erreur</h2>
          {countError && <span className="h2">{countError}</span>}
        </div>
      </div>
      <div className="d-flex align-items-center row mt-5">
        {items.map((item, index) => (
          <div key={index} className="col-6 col-md-4 col-xl-2 mt-5">
            <Card item={item} id={index} handleClick={handleClick} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
