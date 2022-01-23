import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import style from "../styles/matches.module.css";
import { FiSearch } from "react-icons/fi";
import LoadingIcons from "react-loading-icons";

function Matches() {
  const [isLoading, setIsLoading] = useState(true);
  const [matches, setMatches] = useState([]);
  const [match, setMatch] = useState();
  const [results, setResults] = useState([]);

  const getMatches = async () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-type": "application/json" },
    };
    try {
      const request = await fetch(
        `https://jogaina-poker-club-backend.herokuapp.com/matches/created/all`,
        requestOptions
      );
      const response = await request.json();
      return response;
    } catch (err) {
      return err;
    }
  };

  const getMatch = async () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-type": "application/json" },
    };
    try {
      const request = await fetch(
        `https://jogaina-poker-club-backend.herokuapp.com/matches/${match}`,
        requestOptions
      );
      const response = await request.json();
      return response;
    } catch (err) {
      return err;
    }
  };

  const fetchMatches = async () => {
    const response = await getMatches();
    setMatches(response);
    setIsLoading(false);
    return;
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  const buttonClick = async (match) => {
    setIsLoading(true);
    const matchesFound = await getMatch(match);
    setResults(matchesFound);
    console.log(matchesFound);
    setIsLoading(false);
  };

  return (
    <div>
      <NavBar />
      {!isLoading ? (
        <>
          <div className={style.matches}>
            <div className={style.matchesContainer}>
              <div className={style.matchesForm}>
                <select name="match" onChange={(e) => setMatch(e.target.value)}>
                  <option value=""></option>
                  {matches.map((item) => (
                    <option value={item.match} key={item.match}>
                      {item.match}
                    </option>
                  ))}
                </select>
                <button type="button" onClick={() => buttonClick()}>
                  <FiSearch />
                </button>
              </div>
              <h2>
                {results.length > 0
                  ? results[0].match.replace(/-/g, "/")
                  : null}
              </h2>
              <div className={style.allResults}>
                <div className={style.matchesHeader}>
                  <div>Jogador</div>
                  <div>Total</div>
                  <div>Buy-in</div>
                </div>
                {results.map((result) => (
                  <div key={result.name} className={style.results}>
                    <div>{result.name}</div>
                    <div>
                      <span
                        className={
                          result.total >= 0
                            ? style.positiveResult
                            : style.negativeResult
                        }
                      >
                        {result.total}
                      </span>
                    </div>
                    <div>{result.buyin}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className={style.spinner}>
          <LoadingIcons.BallTriangle />
        </div>
      )}
    </div>
  );
}

export default Matches;
