import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import MatchForm from "../components/MatchForm";
import NavBar from "../components/NavBar";
import AppContext from "../context/AppContext";
import style from "../styles/createMatch.module.css";
import { FiUserPlus, FiUserMinus } from "react-icons/fi";
import { BsArrowRightShort } from "react-icons/bs";
import LoadingIcons from "react-loading-icons";

function MatchCreate() {
  const { players, setPlayers } = useContext(AppContext);
  const [player, setPlayer] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [match, setMatch] = useState("");
  const [semester, setSemester] = useState("");
  const [actualSemester, setActualSemester] = useState("");
  const history = useHistory();

  const getSemesters = async () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-type": "application/json" },
    };
    try {
      const request = await fetch(
        `https://jogaina-poker-club-backend.herokuapp.com/matches/semester`,
        requestOptions
      );
      const response = await request.json();
      console.log(response);
      return response;
    } catch (err) {
      return err;
    }
  };

  const fetchSemesters = async () => {
    const response = await getSemesters();
    setSemester(response);
    setIsLoading(false);
    return;
  };

  useEffect(() => {
    fetchSemesters();
  }, []);

  function addPlayer() {
    setPlayer(player + 1);
    setPlayers([...players, { name: "", total: "", buyin: "" }]);
  }

  function deletePlayer() {
    setPlayer(player - 1);
    players.pop();
    setPlayers(players);
  }

  const pushPlayerInfo = async (name, match, total, buyin) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        name,
        match,
        total,
        buyin,
        semester: actualSemester,
      }),
    };
    try {
      const request = await fetch(
        `https://jogaina-poker-club-backend.herokuapp.com/matches/results`,
        requestOptions
      );
      const response = await request.json();
      return response;
    } catch (err) {
      return err;
    }
  };

  const createMatch = async (match) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        match,
      }),
    };
    try {
      const request = await fetch(
        `https://jogaina-poker-club-backend.herokuapp.com/matches`,
        requestOptions
      );
      const response = await request.json();
      return response;
    } catch (err) {
      return err;
    }
  };

  const fetchPushPlayer = async (name, match, total, buyin) => {
    setIsLoading(true);
    const response = await pushPlayerInfo(name, match, total, buyin);
    if (response.status === 201) {
      console.log(response.message);
      return;
    }
    console.log(response.message);
  };

  const buttonClick = async () => {
    for (let play in players) {
      console.log(players[play].name);
      await fetchPushPlayer(
        players[play].name,
        match,
        players[play].total,
        players[play].buyin
      );
    }
    await createMatch(match);
    setIsLoading(false);
    history.push("ranking");
  };
  return (
    <div>
      <NavBar />
      <div className={style.createMatch}>
        <div className={style.createMatchContainer}>
          <h1>Nova partida</h1>
          <div className={style.date}>
            {!isLoading ? (
              <label>
                <div>Semestre:</div>
                <select
                  name="semester"
                  onChange={(e) => setActualSemester(e.target.value)}
                >
                  <option value=""></option>
                  {semester.map((item) => (
                    <option value={item.semester} key={item.semester}>
                      {item.semester}
                    </option>
                  ))}
                </select>
              </label>
            ) : null}

            <span>Data da partida:</span>
            <input type="text" onChange={(e) => setMatch(e.target.value)} />
            <div className={style.buttonsAddPlayer}>
              <button
                type="button"
                onClick={() => addPlayer()}
                className={style.buttonAddPlayer}
              >
                <FiUserPlus />
              </button>
              {player !== 0 ? (
                <button
                  type="button"
                  onClick={() => deletePlayer()}
                  className={style.buttonRemovePlayer}
                >
                  <FiUserMinus />
                </button>
              ) : null}
            </div>
          </div>

          {[...Array(player)].map((e, i) => (
            <div key={i} className={style.inputMatch}>
              <MatchForm teste={i} />
            </div>
          ))}
          <button
            type="button"
            onClick={() => buttonClick()}
            className={style.send}
          >
            {isLoading ? <LoadingIcons.Rings /> : <BsArrowRightShort />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MatchCreate;
