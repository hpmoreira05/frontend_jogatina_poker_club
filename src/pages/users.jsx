import React, { useState } from "react";
import NavBar from "../components/NavBar";
import style from "../styles/users.module.css";
import {
  GiCard10Spades,
  GiCardAceSpades,
  GiCardJackSpades,
  GiCardKingSpades,
  GiCardQueenSpades,
} from "react-icons/gi";

import { BsArrowRightShort } from "react-icons/bs";

function Users() {
  const [user, setUser] = useState("");
  const [semester, setSemester] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const createUser = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        name: user,
      }),
    };
    try {
      const request = await fetch(
        `https://jogaina-poker-club-backend.herokuapp.com/users`,
        requestOptions
      );
      const response = await request.json();
      return response;
    } catch (err) {
      return err;
    }
  };

  const createSemester = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        semester,
      }),
    };
    try {
      const request = await fetch(
        `https://jogaina-poker-club-backend.herokuapp.com/matches/semester`,
        requestOptions
      );
      const response = await request.json();
      return response;
    } catch (err) {
      return err;
    }
  };

  const buttonClick = async () => {
    const response = await createUser();
    alert(response.message);
    setIsLoading(false);
    document.getElementById("playerForm").reset();
  };

  const buttonClickSemester = async () => {
    const response = await createSemester();
    alert(response.message);
    setIsLoading(false);
    document.getElementById("semesterForm").reset();
  };

  return (
    <div>
      <NavBar />
      <div className={style.users}>
        <div className={style.usersContainer}>
          <h1>Criar novo jogador</h1>
          <form id="playerForm">
            <label>
              <div>Nome:</div>
              <input type="text" onChange={(e) => setUser(e.target.value)} />
            </label>
            <button type="button" onClick={() => buttonClick()}>
              <GiCard10Spades />
              <GiCardJackSpades />
              <GiCardQueenSpades />
              <GiCardKingSpades />
              <GiCardAceSpades />
              <BsArrowRightShort />
            </button>
          </form>
          <h1>Criar novo semestre</h1>
          <form id="semesterForm">
            <label>
              <div>Semestre:</div>
              <input
                type="text"
                onChange={(e) => setSemester(e.target.value)}
              />
            </label>
            <button type="button" onClick={() => buttonClickSemester()}>
              <BsArrowRightShort />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Users;
