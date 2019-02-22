import React from "react";

type HeaderProps = {
  title?: string,
  logoURL: string,
};

function Header(props: HeaderProps): JSX.Element {
  return (
    <header className="App-header">
      <nav className="navbar bg-light">
        <div className="navbar-brand">
          <img src={props.logoURL} className="App-logo" alt="logo" height="50vmin"/>
        </div>
        <div className="navbar-text mr-auto">
          <h2>{props.title !== undefined && props.title + " "}Office Hours Queue</h2>
        </div>
      </nav>
    </header>
  );
}

export default Header;
