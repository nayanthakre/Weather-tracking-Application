"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import FilterDramaIcon from '@mui/icons-material/FilterDrama';
import DehazeIcon from '@mui/icons-material/Dehaze';
import SmokingRoomsIcon from '@mui/icons-material/SmokingRooms';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

let WEATHER_API_KEY= process.env.NEXT_PUBLIC_WEATHER_API_KEY

export default function Home() {

  const [place, setPlace]=useState("Nagpur");
  const [placeData, setPlaceData]=useState<any>(null);
  const currentTime=new Date().toLocaleTimeString([],
    {
      hour:"2-digit",
      minute:"2-digit",
      
    }
  )
  


  const getWetherData=async()=>{
    // https:api.openweathermap.org/data/2.5/weather?q=Nagpur&appid=WEATHER_API_KEY
    if(place &&place.length>0){
      try{
        let url= `https:api.openweathermap.org/data/2.5/weather?q= ${place}&appid=${WEATHER_API_KEY}`
        let res=  await fetch(url);
        let data= await res.json();
        console.log("GET WETHER DATA RESOURSE",data)
        setPlaceData(data)
      }
      catch(err){
        console.log(err)
      }
    }
  }

  useEffect(()=>{
    getWetherData();
  },[])

  return (
  <div className={styles.outerdiv}>
  <div className={styles.searchbar}>
    <input type="search" placeholder="city name" onChange={(e)  => setPlace(e.target.value) }/>
    <button onClick={  getWetherData}><SearchIcon/></button>
  </div>

  {
 placeData && <div className={styles.row}>
      <div className={styles.section1}>
      <div className={styles.section11}>
        {
          placeData.weather[0].main === 'cloud' &&
          <FilterDramaIcon className={styles.weathericon}/>
        }
        {
        placeData.weather[0].main === 'haze' &&
        <DehazeIcon className={styles.weathericon}/>

        }
        {
          
          placeData.weather[0].main === 'smoke' &&
          <SmokingRoomsIcon className={styles.weathericon}/>
        }
        {
          
          placeData.weather[0].main === 'clear' &&
          <WbSunnyIcon className={styles.weathericon}/>
        }

        <p className={styles.temp}>{(placeData?.main.temp-273.15).toFixed(1)}
        </p>
      </div>
      <div className={styles.section11}>
      <p className={styles.city}>{(placeData?.name)}</p>
      <p className={styles.weathertype}>{(placeData?.weather[0].main)}</p>
      </div>
      </div>
      

      <div className={styles.timediv}>
      <p className={styles.time}>{currentTime}</p>
    </div>
 </div>
    }

    {
       placeData && 
       <div className={styles.section2}>
        <div className={styles.section21}>
          <p className={styles.head1}>tempreture min</p>
          <p className={styles.head2}>{(placeData?.main.temp-273.15).toFixed(1)}</p>
          
        </div>
       </div>
    }


  </div>
 
  );
}
