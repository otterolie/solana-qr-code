import React from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "./styles/Home.module.css";

const Home = () => {
  return (
    <>
      <Head>
        <title>SolBet - Home</title>
        <meta
          name="description"
          content="Join SolBet, your premier platform for secure and fair betting. Enjoy a seamless betting experience with the latest games and live sports action."
        />
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:title"
          content="SolBet - Secure and Fair Betting Platform"
        />
        <meta
          property="og:description"
          content="Join SolBet to experience the best in online betting. Secure transactions, fair play, and exciting games await you."
        />
        <meta property="og:image" content="/images/social-preview.png" />
        <meta property="og:type" content="website" />
        <link rel="preload" href="/images/banner.jpeg" as="image" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to SolBet</h1>
        <p className={styles.description}>
          Your premier platform for secure and fair betting.
        </p>

        <div className={styles.banner}>
          <Image
            src="/images/banner.jpeg"
            alt="SolBet - Your gateway to a premier betting experience with secure and fair practices."
            width={500}
            height={300}
            layout="responsive"
            priority
          />
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </>
  );
};

export default Home;
