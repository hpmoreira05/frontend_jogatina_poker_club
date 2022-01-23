import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import style from "../styles/createMatch.module.css";

function MatchForm(props) {
  const { players, setPlayers } = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);

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

  const fetchUsers = async () => {
    const response = await getUsers();
    setUsers(response);
    setIsLoading(false);
    return;
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  function playersInfo(e) {
    const key = e.target.name;
    let array = players;
    array[props.teste][key] = e.target.value;
    setPlayers(array);
  }

  return (
    <div className={style.matchUser}>
      {!isLoading ? (
        <>
          <label>
            <div>Jogador:</div>
            <select name="name" onChange={(e) => playersInfo(e)}>
              <option value=""></option>
              {users.map((item) => (
                <option value={item.name} key={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            <div>Total:</div>
            <input
              type="number"
              name="total"
              onChange={(e) => playersInfo(e)}
            />
          </label>
          <label>
            <div>Buy-in:</div>
            <input
              type="number"
              name="buyin"
              onChange={(e) => playersInfo(e)}
            />
          </label>
        </>
      ) : null}
    </div>
  );
}

export default MatchForm;
