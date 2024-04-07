import React from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "./styles/Home.module.css";

const Home = () => {
  return (
    <>
      <Head>
        <title>SolBet - Decentralized Betting on Solana</title>
        <meta
          name="description"
          content="SolBet - Experience secure and fair decentralized betting on the Solana blockchain. Fast, transparent, and trustless sports and games betting."
        />
        <link rel="icon" href="/solana-favicon.ico" />
        <meta
          property="og:title"
          content="SolBet - Decentralized Betting on Solana"
        />
        <meta
          property="og:description"
          content="Join the future of betting with SolBet on Solana - Enjoy the benefits of decentralized finance in gaming."
        />
        <meta property="og:image" content="/images/solana-social-preview.png" />
        <meta property="og:type" content="website" />
        <link rel="preload" href="/images/solana-banner.jpeg" as="image" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to SolBet on Solana</h1>
        <p className={styles.description}>
          Your premier platform for secure and fair betting—now on the Solana
          blockchain.
        </p>
        <img
          src="/images/banner.jpeg"
          alt="SolBet - Your gateway to a premier betting experience with secure and fair practices."
          width="500"
          height="300"
        />

        <div className={styles.solanaIndicator}>
          <p>
            Blockchain Status: <strong>Live</strong> - Last Block Time:{" "}
            <strong>0.4s</strong>
          </p>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Powered by Solana Blockchain</p>
      </footer>
    </>
  );
};

export default Home;
