import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { heroVideo, smallHeroVideo } from "../utils";

const Hero = () => {
  
  useGSAP(() => {
    gsap.to("#hero", { opacity: 1, delay: 2 });
    gsap.to('#cta', { opacity:1 , y: -50, delay: 2 });
    
  }, []);

  const [videoSrc, setVideoSrc] = useState(window.innerWidth < 760? smallHeroVideo : heroVideo);

  const handelVideoSrcSet= ()=>{
    if (window.innerWidth < 760){
      setVideoSrc(smallHeroVideo);
    }
    else{
      setVideoSrc(heroVideo);
    }
  }

  useEffect(()=>{
    window.addEventListener('resize', handelVideoSrcSet);
    
    return ()=>{
      window.removeEventListener('resize', handelVideoSrcSet)
    }
  }, [])

  return (
    <section className="w-full nav-height bg-black relative">
      
      <div className="h-5/6 w-full flex-center flex-col">
        
        <p className="hero-title" id="hero">
          IPhone 15 Pro
        </p>

        <div className="md:w-10/12 w-9/12">
        
          <video className="pointer-events-none" autoPlay muted playsInline={true} key={videoSrc}>
              <source src={videoSrc}  type="video/mp4"/>
          </video>

        </div>


        <div id="cta" className="flex flex-col items-center opacity-0 translate-y-20">

          <a href="#highlights" className="btn">Buy</a>

          <p className="font-normal text-xl">From 199$/month or 999$</p>

        </div>


      </div>
    
    </section>
  );
};

export default Hero;