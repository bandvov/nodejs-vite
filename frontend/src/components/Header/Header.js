import React from "react";
import "./Header.css";
import { useAuth } from "../../providers/AuthProvider";

const Header = () => {
  const { userName, userImage } = useAuth();

  return (
    <section className="header-section">
      <header className="header">
        <a href="/" className="logo">
          DriveSmart
        </a>
        <nav className="main-nav">
          <ul className="main-nav-list">
            <li className="main-nav-list-item">
              <a href="/catalog" className="main-nav-link">
                Пропозиції
              </a>
            </li>

            <li className="main-nav-list-item">
              <a href="./page-3.html" className="main-nav-link">
                Мапа
              </a>
            </li>

            <li className="main-nav-list-item">
              <a href="./page-3.html" className="main-nav-link">
                Форум
              </a>
            </li>

            <li>
              <button type="button" className="header-btn">
                Завантажити додаток
              </button>
            </li>

            <li className="main-nav-list-item">
              {userName ? (
                <a className="main-nav-link" href="/profile">
                  <img
                    src={userImage}
                    alt="Avatar"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                  />
                </a>
              ) : (
                <a href="/auth/login" className="main-nav-link">
                  Увійти
                </a>
              )}
            </li>
          </ul>
        </nav>
      </header>
    </section>
  );
};

export default Header;
