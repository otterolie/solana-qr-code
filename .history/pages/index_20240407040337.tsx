// pages/index.tsx
import React from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "./styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>SolBet - Home</title>
        <meta
          name="description"
          content="Welcome to SolBet, the premier betting platform."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to SolBet</h1>

        <p className={styles.description}>
          Your premier platform for secure and fair betting.
        </p>

        <div className={styles.banner}>
          {/* Update the src with the path to your large image */}
          <Image
            src="/images/banner.jpeg"
            alt="SolBet Banner"
            width={500}
            height={500}
            layout="responsive"
          />
        </div>
      </main>
    </>
  );
}
