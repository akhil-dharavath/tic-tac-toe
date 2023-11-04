import React, { useEffect, useState } from "react";
import AlertMessage from "./Alert";

const match = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

const Game = () => {
  const [wins, setWins] = useState({ person1: 0, person2: 0 });
  const [person, setPerson] = useState(1);
  const [option, setOption] = useState({});
  const [first, setFirst] = useState([]);
  const [second, setSecond] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const handleSubmit = (place) => {
    // const winId = Date.now();
    const values = Object.values(option);
    if (values.includes(place) === false) {
      if (person === 1) {
        setOption({ ...option, [`one${place}`]: place });
        setPerson(2);
      }
      if (person === 2) {
        setOption({ ...option, [`two${place}`]: place });
        setPerson(1);
      }
    }
  };

  const isInputMatch = (input) => {
    const filteredMatch = match.filter((arr) => arr.length <= input.length);

    return filteredMatch.some((arr) => {
      return arr.every((num) => input.includes(num));
    });
  };
  useEffect(() => {
    for (const [key, value] of Object.entries(option)) {
      if (key.startsWith("one")) {
        setFirst([...first, value]);
      } else setSecond([...second, value]);
    }
    // eslint-disable-next-line
  }, [option]);
  useEffect(() => {
    if (isInputMatch(first)) {
      setWins((prevWins) => ({
        ...prevWins,
        person1: prevWins.person1 + 1,
      }));
      setOption({});
      setFirst([]);
      setSecond([]);
      // alert("Person 1 won");
      setAlertMessage("Person 1 won");
      setTimeout(() => {
        setAlertMessage("");
      }, 1500);
    }

    if (isInputMatch(second)) {
      setWins((prevWins) => ({
        ...prevWins,
        person2: prevWins.person2 + 1,
      }));
      setOption({});
      setFirst([]);
      setSecond([]);
      // alert("Person 2 won");
      setAlertMessage("Person 2 won");
      setTimeout(() => {
        setAlertMessage("");
      }, 1500);
    }
    if (Object.keys(option).length === 9) {
      setOption({});
      setFirst([]);
      setSecond([]);
      // alert("No one won");
      setAlertMessage("No one Won");
      setTimeout(() => {
        setAlertMessage("");
      }, 1500);
    }
    // eslint-disable-next-line
  }, [first || second]);

  const findOut = (number, check) => {
    return check.includes(number);
  };
  return (
    <div
      className="d-flex justify-content-center align-items-center mainDiv"
      style={{ height: "100vh", width: "100vw" }}
    >
      {alertMessage !== "" && <AlertMessage message={alertMessage} />}
      <div>
        {[0, 1, 2].map((num1) => (
          <div key={num1} className="d-flex">
            {[1, 2, 3].map((num2) => (
              <div
                key={num1 * 3 + num2}
                className={`text-center border border-dark ${
                  findOut(num1 * 3 + num2, first)
                    ? "oPerson"
                    : findOut(num1 * 3 + num2, second)
                    ? "xPerson"
                    : "Normal"
                }`}
                onClick={() => handleSubmit(num1 * 3 + num2)}
              >
                {findOut(num1 * 3 + num2, first) && "O"}
                {findOut(num1 * 3 + num2, second) && "X"}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="winsHeading">
        <h1>Person 1(0): {wins.person1} win(s)</h1>
        <h1>Person 2(X): {wins.person2} win(s)</h1>
      </div>
    </div>
  );
};

export default Game;
