import React from "react";

const Home = () => {
  // Inline styles to mimic the 1998 aesthetic
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
      textAlign: "center",
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
      textAlign: "center",
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
      textAlign: "center",
      padding: "5px",
      borderTop: "5px double #ff00ff",
    },
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Welcome to SolBet on Solana</h1>
      </header>

      <div style={styles.marquee}>
        Your premier platform for secure and fair betting — now on the Solana
        blockchain.
      </div>

      <div style={styles.banner}>
        {/* You would use the Image component from 'next/image' in a real project */}
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
