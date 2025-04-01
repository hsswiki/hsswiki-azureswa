import React from "react";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="logo">Wikipedia</div>
      <input
        type="text"
        className="search-bar"
        placeholder="Search Wikipedia"
      />
      <button className="donate-button">Donate</button>
    </header>
  );
}

export default Header;
