import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import style from "../styles/ranking.module.css";
import { IoMdTrophy } from "react-icons/io";
import LoadingIcons from "react-loading-icons";

function Ranking() {
  const [players, setPlayers] = useState([]);
  // const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [ranking, setRanking] = useState([]);
  const [semester, setSemester] = useState("");
  const [actualSemester, setActualSemester] = useState("");
  const [canGenerateRanking, setCanGenerateRanking] = useState(false);
  const [loadingRanking, setLoadingRanking] = useState(false);

  const getUsers = async () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-type": "application/json" },
    };
    try {
      const request = await fetch(
        `https://jogaina-poker-club-backend.herokuapp.com/users/all`,
        requestOptions
      );
      const response = await request.json();
      return response;
    } catch (err) {
      return err;
    }
  };
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

  const generateRanking = async () => {
    let rank = [];

    for (let player in players) {
      const playerRequest = await fetch(
        `https://jogaina-poker-club-backend.herokuapp.com/matches/player/${players[player].name}/${actualSemester}`
      );
      const playerResult = await playerRequest.json();
      if (playerResult.length > 0) {
        // let playerInfos = results.filter(
        //   (result) => result.name === players[player].name
        // );
        const sum = playerResult.reduce(function (r, a) {
          return r + Number(a.total);
        }, 0);

        rank.push({ name: playerResult[0].name, total: sum });
        rank.sort((a, b) => b.total - a.total);
      }
    }
    setRanking(rank);

    // setIsLoading(false);
  };

  const fetchUsersAndResults = async () => {
    const users = await getUsers();
    const semesters = await getSemesters();
    setPlayers(users);
    setSemester(semesters);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUsersAndResults();
  }, []);

  const getRanking = async () => {
    setCanGenerateRanking(false);
    setLoadingRanking(true);
    await generateRanking();
    setCanGenerateRanking(true);
    setLoadingRanking(false);
  };

  // useEffect(() => {
  //   generateRanking();
  // }, [players]);

  return (
    <>
      <NavBar />
      {!isLoading ? (
        <div className={style.ranking}>
          <div className={style.rankingContainer}>
            <div className={style.rankingHeader}>
              <h1>Ranking {actualSemester}</h1>
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
                <button type="button" onClick={() => getRanking()}>
                  <IoMdTrophy />
                </button>
              </label>
            </div>
            {canGenerateRanking ? (
              <ol>
                {ranking.map((el) => (
                  <li key={el.name}>
                    <span>{el.name}</span>
                    <span>{el.total}</span>
                  </li>
                ))}
              </ol>
            ) : null}
            {loadingRanking ? (
              <div className={style.spinner}>
                <LoadingIcons.BallTriangle />
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <div className={style.spinner}>
          <LoadingIcons.BallTriangle />
        </div>
      )}
    </>
  );
}

export default Ranking;
