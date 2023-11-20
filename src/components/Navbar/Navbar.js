/* eslint-disable jsx-a11y/label-has-associated-control */
import "./Navbar.scss";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faBars,
  faRightToBracket,
  faRightFromBracket,
  faUserPlus,
  faXmark,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { persistor } from "../../redux/store/store";
import { removeCookies } from "../../utils/Cookies";

function Navbar() {
  const checkedRef = useRef(false);
  const [q, setQ] = useState("");
  const [checked, setChecked] = useState(true);

  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);

  // persistor 세션 값삭 제.
  const purge = async () => {
    await persistor.purge();
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      if (q.length >= 1) {
        navigate(`/search?q=${q}`);
      }
    }
  };

  const handleLogout = () => {
    removeCookies("token", {
      maxAge: 0,
      path: "/",
    });
    navigate("/");
  };

  const handleChecked = () => {
    setChecked(!checked);
    checkedRef.current.checked = checked;
    setQ("");
  };

  useEffect(() => {}, [checked]);

  return (
    <nav className="navbar">
      <input
        onClick={() => {
          handleChecked();
        }}
        ref={checkedRef}
        type="checkbox"
        id="nav-menu"
      />
      <div className="nav-left">
        <Link to="/">
          <button
            onClick={() => {
              checkedRef.current.checked = false;
              setChecked(true);
              setQ("");
            }}
            className="nav-logo"
            type="button"
          >
            Blog
          </button>
        </Link>
        <div className="search-bar">
          <i className="search-icon">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </i>
          <input
            onKeyDown={onKeyDown}
            onChange={(e) => setQ(e.target.value)}
            value={q}
            className="search-input"
            type="search"
            placeholder="검색"
          />
        </div>
      </div>
      {!currentUser ? (
        <div className="nav-right">
          <Link to="/login">
            <button onClick={handleChecked} type="button">
              <i>
                <FontAwesomeIcon
                  className="right-icon"
                  icon={faRightToBracket}
                />
              </i>
              로그인
            </button>
          </Link>
          <Link to="/register">
            <button onClick={handleChecked} type="button">
              <i>
                <FontAwesomeIcon className="right-icon" icon={faUserPlus} />
              </i>
              회원가입
            </button>
          </Link>
        </div>
      ) : (
        <div className="nav-right">
          <Link to="/add">
            <button onClick={handleChecked} type="button">
              <i>
                <FontAwesomeIcon className="right-icon" icon={faPenToSquare} />
              </i>
              글작성
            </button>
          </Link>
          <hr />
          <button
            onClick={() => {
              handleLogout();
              purge();
              handleChecked();
            }}
            type="button"
          >
            <i>
              <FontAwesomeIcon
                className="right-icon"
                icon={faRightFromBracket}
              />
            </i>
            로그아웃
          </button>
        </div>
      )}
      {!checkedRef.current.checked ? (
        <label htmlFor="nav-menu">
          {!currentUser ? (
            <FontAwesomeIcon icon={faBars} />
          ) : (
            <h4>{currentUser.name}</h4>
          )}
        </label>
      ) : (
        <label htmlFor="nav-menu">
          <FontAwesomeIcon icon={faXmark} />
        </label>
      )}
    </nav>
  );
}

export default Navbar;
