"use client";

import React from "react";
import Home.module.css from "./Home.module.css";

const Home = () => {
  // Corrected inline styles with specific types for CSS properties
  const styles = {
    container: {
      fontFamily: "'Times New Roman', Times, serif",
      backgroundColor: "#008080",
      color: "#ffff00",
      margin: "0",
      padding: "0",
      border: "5px solid #ff00ff",
    },
    header: {
      backgroundColor: "#ff00ff",
      padding: "5px",
      textAlign: "center" as const, // Corrected type
      borderBottom: "5px double #ffff00",
    },
    title: {
      fontSize: "36px",
      color: "#ffffff",
    },
    marquee: {
      backgroundColor: "#ffff00",
      color: "#ff00ff",
      padding: "5px",
    },
    banner: {
      textAlign: "center" as const, // Corrected type
      padding: "10px",
      backgroundColor: "#ffffff",
    },
    bannerImage: {
      width: "100%",
      height: "auto",
      border: "3px inset #ff00ff",
    },
    status: {
      backgroundColor: "#ff00ff",
      color: "#ffffff",
      padding: "5px",
      fontWeight: "bold",
    },
    footer: {
      backgroundColor: "#ffff00",
      color: "#ff00ff",
      textAlign: "center" as const, // Corrected type
      padding: "5px",
      borderTop: "5px double #ff00ff",
    },
  };

  return (
    <div style={styles.container}>
      <header style={styles.header} className="flicker">
        <h1 style={styles.title} className="glitch">Welcome to SolBet on Solana</h1>
      </header>

      <div style={styles.marquee}>
        Your premier platform for secure and fair betting — now on the Solana
        blockchain.
      </div>

      <div style={styles.banner}>
        <img
          src="/images/banner.jpeg"
          alt="SolBet Banner"
          style={styles.bannerImage}
        />
      </div>

      <div style={styles.status}>
        Blockchain Status: Down - Last Block Time: unknown
      </div>

      <footer style={styles.footer}>Powered by Solana Blockchain</footer>
    </div>
  );
};

export default Home;
