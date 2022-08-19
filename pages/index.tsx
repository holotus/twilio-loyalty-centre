import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Toggle from 'react-toggle'
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";


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
        <div className='descriptions'>ⓘ Because: You browsed men`s product 5 out of 10 times.</div>


        <Swiper
        slidesPerView={"auto"}
        centeredSlides={true}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide><img src={'/p1.png'}></img></SwiperSlide>
        <SwiperSlide><img src={'/p2.png'}></img></SwiperSlide>
        <SwiperSlide><img src={'/p3.png'}></img></SwiperSlide>
      </Swiper>

      </div>

      <div className={styles.featureContainer}>
        <div className='header'>Join our newsletter</div>
        <div className='descriptions'>Subscribe to our newsletter to receive the latest news and products.</div>
        <div className='toggleContainer'>
          <Toggle className='toggle' id='channel-email' defaultChecked={checked} onChange={handleChecked} icons={false} />
          <label className='label' htmlFor='channel-email'>Email</label>
          <div className='value'>{"kristian@gmailx.com"}</div>
        </div>
        <div className='toggleContainer'>
          <Toggle  className='toggle' id='channel-sms' defaultChecked={checked} onChange={handleChecked} icons={false} />
          <label  className='label' htmlFor='channel-sms'>SMS</label>
          <div className='value'>{"no record"}</div>
        </div>
        <div className='toggleContainer'>
          <Toggle className='toggle'  id='channel-whatsapp' defaultChecked={checked} onChange={handleChecked} icons={false} />
          <label className='label'  htmlFor='channel-whatsapp'>WhatsApp</label>
          <div className='value'>{"no record"}</div>
        </div>
      </div>

      <div className={styles.featureContainer}>
        <div className='header'>My referral code</div>
        <div className='descriptions'>Scan to redeem swags.</div>
        <img className='qr' src="https://chart.googleapis.com/chart?chs=350x350&cht=qr&chl=Hello%20world&choe=UTF-8"></img>
      </div>

      <div className={styles.featureContainer}>
        <div className='header headerLine'>Contact personal shopper via WhatsApp</div>
        <div className='descriptions'>No assignment</div>
      </div>

      <div className={styles.featureContainer}>
        <div className='header headerLine'>My orders</div>
        <div className='descriptions'>View my previous and current orders (demo only).</div>
      </div>

    </div>
  )
}

export default Home
