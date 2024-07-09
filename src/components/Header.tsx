import React from "react";

const Header = () => {
  return (
    <header>
      <p>CyTunes</p>
      <div>
        <input type="text" placeholder="검색어를 입력해 주세요" autoFocus />
      </div>
    </header>
  );
};

export default Header;
