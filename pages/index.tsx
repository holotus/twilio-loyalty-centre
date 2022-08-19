import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Toggle from 'react-toggle'
import React from 'react'

import styles from '../styles/Home.module.css'



const Home: NextPage = () => {

  const [checked, setChecked] = React.useState(false);

  function handleChecked(event: React.ChangeEvent<HTMLInputElement>){
    setChecked(event.target.checked)
  }

  return (
    <div className={styles.container}>

      <Head>
        <title>Loyalty Centre</title>
        <meta name="description" content="Twilio Transform Together Demo" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width" />
        <meta name="viewport" content="initial-scale=1.0" />
      </Head>

      <h1 className={styles.header}>Ecommerce.</h1>

      <div className={styles.menuItem}>Loyalty Centre</div>

      <div className={styles.featureContainer}>
        <div className='header'>Specially for you {"Kristian"}.</div>
        <div className='descriptions'>ⓘ Because: You browsed men's product 5 out of 10 times.</div>
        <img></img>
      </div>

      <div className={styles.featureContainer}>
        <div>Join our newsletter</div>
        <div>Subscribe to our newsletter to receive the latest news and products.</div>
        <div>
          <Toggle id='cheese-status' defaultChecked={checked} onChange={handleChecked} />
          <label htmlFor='cheese-status'>Email</label>
          <div>{"kristian@gmailx.com"}</div>
        </div>
        <div>
          <Toggle id='cheese-status' defaultChecked={checked} onChange={handleChecked} />
          <label htmlFor='cheese-status'>SMS</label>
          <div>{"no record"}</div>
        </div>
        <div>
          <Toggle id='cheese-status' defaultChecked={checked} onChange={handleChecked} />
          <label htmlFor='cheese-status'>WhatsApp</label>
          <div>{"no record"}</div>
        </div>
      </div>

      <div className={styles.featureContainer}>
        <div>My referral code</div>
        <div>Scan to redeem swags.</div>
        <img></img>
      </div>

      <div className={styles.featureContainer}>
        <div>Contact personal shopper via WhatsApp</div>
        <div>No assignment</div>
      </div>

      <div className={styles.featureContainer}>
        <div>My orders</div>
        <div>View my previous and current orders (demo only).</div>
      </div>

    </div>
  )
}

export default Home
