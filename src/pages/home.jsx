import React from "react";
import NavBar from "../components/NavBar";
import "../styles/home.css";
import Logo from "../components/images/logo.jpeg";
import Smoke from "../components/images/smoke.mp4";
import Stack from "../components/images/stack.jpg";

function Home() {
  return (
    <div>
      <NavBar />
      <div className="home">
        <div className="hands">
          <div class="poker">
            <div class="cards">
              <div class="ace card"></div>
              <div class="king card"></div>
              <div class="queen card"></div>
              <div class="jack card"></div>
              <div class="ten card"></div>
            </div>
            <div class="hand">
              <div class="index finger"></div>
              <div class="middle finger"></div>
              <div class="ring finger"></div>
              <div class="pinky finger"></div>
            </div>
          </div>
        </div>
        <section className="jogatinaPokerClub">
          <video src={Smoke} autoPlay muted></video>
          <h1>
            <span>J</span>
            <span>O</span>
            <span>G</span>
            <span>A</span>
            <span>T</span>
            <span>I</span>
            <span>N</span>
            <span>A</span>
          </h1>
          <div className="pokerClubContainer">
            <h2>
              <span>POKER CLUB</span>
            </h2>
            <img src={Logo} />
          </div>
        </section>
      </div>
      <div className="homeMobile">
        <img src={Logo} className="logoMobile"></img>
        <img src={Stack} className="stackMobile"></img>
      </div>
    </div>
  );
}

export default Home;
