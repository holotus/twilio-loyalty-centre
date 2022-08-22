import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Toggle from 'react-toggle'
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import useSWR from 'swr'

import { useRouter } from 'next/router'


import styles from '../styles/Home.module.css'



const Home: NextPage = () => {
  
  // get profile on page load
  const router = useRouter()
  const [data, setData] = React.useState(null)
  const [isProfileLoading, setProfileLoading] = React.useState(false)
  React.useEffect(() => {
    if(!router.isReady) return; // Load profile when page is ready (query string ready)

    setProfileLoading(true)
    fetch(`/api/profile?email=${router.query["email"]}`)
      .then((res) => {
        if(res.status == 200){
          return res.json();
        }else{
          return null; 
        }
      })
      .then((data) => {
        if(data){
          setData(data)
        } 
        setProfileLoading(false)
        
      })
  }, [router.isReady]); 


  // handle newsletter signup
  // const [data, setData] = React.useState(null)
  const [isLoading, setLoading] = React.useState(false)
  const [checked, setChecked] = React.useState(false);
  function handleChecked(event: React.ChangeEvent<HTMLInputElement>){
   
    setChecked(event.target.checked)

    setLoading(true)

    fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email:'holotus@gmail.com',
        isSignup: event.target.checked
      }),
    })
    .then((res) => res.json())
    .then((data) => {
      // setData(data)
      setLoading(false)
    })

  }


  // render
  if (isProfileLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>
  return (
    <div className={styles.container}>

      <Head>
        <title>Loyalty Centre</title>
        <meta name="description" content="Twilio Transform Together Demo" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width" />
        <meta name="viewport" content="initial-scale=1.0" />
      </Head>

      <a className={styles.back} href="https://segment-ecommerce-site.vercel.app/">Back to shop</a>

      <h1 className={styles.header}>Ecommerce.</h1>

      <div className={styles.menuItem}>Loyalty Centre</div>

      <div className={styles.featureContainer}>
        <div className='header'>Specially for you {data["name"]}.</div>
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
{ isLoading? 
          <p>Loading...</p>
:
        <div className='toggleContainer'>           
          <Toggle className='toggle' id='channel-email' defaultChecked={checked} onChange={handleChecked} icons={false} />
          <label className='label' htmlFor='channel-email'>Email</label>
          <div className='value'>{data["email"]}</div>
        </div>
}
        <div className='toggleContainer'>
          <Toggle  className='toggle' id='channel-sms' icons={false} />
          <label  className='label' htmlFor='channel-sms'>SMS</label>
          <div className='value'>{"no record"}</div>
        </div>
        <div className='toggleContainer'>
          <Toggle className='toggle'  id='channel-whatsapp' icons={false} />
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
