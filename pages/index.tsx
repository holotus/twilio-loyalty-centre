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

      <h1>Ecommerce.</h1>



      <Toggle id='cheese-status' defaultChecked={checked} onChange={handleChecked} /><label htmlFor='cheese-status'>Adjacent label tag</label>



    </div>
  )
}

export default Home
