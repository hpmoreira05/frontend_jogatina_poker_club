import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "../styles/navbar.module.css";
import { GiSpades } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();
  return (
    <div>
      <div className={styles.navbar}>
        <button onClick={() => history.push("/")}>
          Home<span></span>
        </button>
        <button onClick={() => history.push("/createMatch")}>
          Nova Partida<span></span>
        </button>
        <button onClick={() => history.push("/createUser")}>
          Cadastrar Jogador<span></span>
        </button>
        <button onClick={() => history.push("/matches")}>
          Partidas<span></span>
        </button>
        <button onClick={() => history.push("/ranking")}>
          Ranking<span></span>
        </button>
      </div>
      <div className={styles.navbarMobile}>
        <div className={styles.headerMobile}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={styles.buttonSandwich}
          >
            {!isOpen ? <GiSpades /> : <IoMdClose />}
          </button>
          <p>Jogatina Poker Club</p>
        </div>
        {isOpen ? (
          <div className={styles.buttonsMobile}>
            <button onClick={() => history.push("/")}>
              Home<span></span>
            </button>
            <button onClick={() => history.push("/createMatch")}>
              Nova Partida<span></span>
            </button>
            <button onClick={() => history.push("/createUser")}>
              Cadastrar Jogador<span></span>
            </button>
            <button onClick={() => history.push("/matches")}>
              Partidas<span></span>
            </button>
            <button onClick={() => history.push("/ranking")}>
              Ranking<span></span>
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default NavBar;
