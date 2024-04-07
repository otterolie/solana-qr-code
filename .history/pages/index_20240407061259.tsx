"use client";

import React from "react";
import styles from "../styles/Home.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <header className={`${styles.header} flicker`}>
        <h1 className={`${styles.title} glitch`}>
          Welcome to SolBet on Solana
        </h1>
      </header>

      <div className={styles.marquee}>
        Your premier platform for secure and fair betting — now on the Solana
        blockchain.
      </div>

      <div className={styles.banner}>
        <img
          src="/images/banner.jpeg"
          alt="SolBet Banner"
          className={styles.bannerImage}
        />
        <div className={styles.overlayText}>Bet on the Future</div>{" "}
        {/* Example text */}
      </div>

      <div className={styles.status}>
        Blockchain Status: Down - Last Block Time: unknown
      </div>

      <footer className={styles.footer}>Powered by Solana Blockchain</footer>
    </div>
  );
};

export default Home;
