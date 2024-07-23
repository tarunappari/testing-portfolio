"use client";

import React, { Suspense, useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { BackgroundBeams } from "../../ui/BackgroundBeams";
import scroll from "../../../../public/scroll.png";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { TextGenerateEffect } from "../../ui/TextGenerator";
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from "@react-three/drei";
import dynamic from 'next/dynamic';
import { fadeIn, slideIn, textVariant } from '../../../motion/motion';
import CanvasLoader from "../../Loader";

const TechGuy = dynamic(() => import("../../models/TechGuy"), { suspense: true });
const Computer = dynamic(() => import("../../models/Computer"), { suspense: true });

const Hero: React.FC = () => {

  const sliderVariant: Variants = {
    initial: {
      x: "100%",
    },
    animate: {
      x: "-220%",
      transition: {
        repeat: Infinity,
        repeatType: "mirror",
        duration: 15,
      },
    },
  };

  const [TechguyScale, TechguySetScale] = useState(1.3);
  const [computerScale, computerSetScale] = useState(1.1);
  const [TechguyPosition, TechguySetPosition] = useState([0, -2, -1.2]);
  const [computerPosition, computerSetPosition] = useState([0, -0.5, 1.2]);
  const [loader, setLoader] = useState(true);

  const handleResize = useCallback(() => {
    TechguySetScale(() => window.innerWidth < 910 ? 1 : 1.3);
    computerSetScale(() => window.innerWidth < 910 ? 0.8 : 1.1);
    TechguySetPosition(() => window.innerWidth < 910 ? [0, -1.6, -0.9] : [0, -2, -1.2]);
    computerSetPosition(() => window.innerWidth < 910 ? [0, -0.5, 0.9] : [0, -0.5, 1.2]);

    if (window.innerWidth < 650) {
      TechguySetScale(() => window.innerWidth < 650 ? 1.6 : 1);
      computerSetScale(() => window.innerWidth < 650 ? 1.4 : 0.8);
      TechguySetPosition(() => window.innerWidth < 650 ? [0, -1.9, -1.8] : [0, -1.6, -0.9]);
      computerSetPosition(() => window.innerWidth < 650 ? [0, -0.1, 1.5] : [0, -0.5, 0.9]);
    }
  }, []);

  useEffect(() => {
    handleResize(); // Call on initial render
    window.addEventListener('resize', handleResize);

    const timeoutId: number = window.setTimeout(() => {
      setLoader(false);
    }, 5000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [handleResize]);

  // if (loader) {
  //   return (
  //     <HeroContainer>
  //       <h1 style={{ fontSize: '20rem' }}>hello</h1>
  //     </HeroContainer>
  //   );
  // }

  return (
    <HeroContainer id="#home">
      <div style={{ zIndex: "-1" }}>
        <BackgroundBeams />
      </div>
      <div className="hero-container">
        <div className="hero-image-container">
          <Canvas>
            <ambientLight intensity={-1} />
            <OrbitControls enableZoom={false} />
            <Suspense fallback={<CanvasLoader />}>
              <TechGuy position={TechguyPosition} scale={[TechguyScale, TechguyScale, TechguyScale]} />
              <Computer position={computerPosition} scale={[computerScale, computerScale, computerScale]} />
            </Suspense>
            <Environment preset="studio" background={false} resolution={256} />
          </Canvas>
        </div>
        <motion.div
          className="hero-info"
          variants={slideIn("left", "spring", 2, 2)}
        >
          <motion.h2 variants={textVariant(2)}>TARUN APPARI</motion.h2>
          <h1 className="h1">
            Front-End Developer
          </h1>
          <div className="h3-container">
            <h3 className="h3">
              Transforming Concepts into
            </h3>
            <h3 className="h3">
              Seamless
              &nbsp;
              <span className="gradient-span">User Experiences</span>
            </h3>
          </div>
          <motion.div
            variants={slideIn("up", "tween", 0.2, 1)}
            animate="scrollButton"
            className="scroll"
          >
            <Image src={scroll} alt="scroll-img" className="scrollImg" />
          </motion.div>
          {
            !loader &&
            <motion.div
              className="slidingText"
              variants={sliderVariant}
              initial="initial"
              animate="animate"
            >
              Front-End React Developer
            </motion.div>
          }
        </motion.div>
      </div>
    </HeroContainer>
  );
};

export default Hero;


let HeroContainer = styled.div`
    min-height: 100vh;
  background-color: #000000;
  color: #d5d5d5;
  position: relative;
  overflow: hidden !important;
  padding-top: 2rem;
  .hero-container {
    display: grid;
    grid-template-columns: 40% 60%;
    min-width: 100%;
    min-height: 100%;
  }
  .hero-image-container {
    z-index: 9 !important;
    min-height: 100vh;
  }
  .hero-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    min-height: 100vh;
    align-items: center;
    z-index: 3 !important;
    h2 {
      letter-spacing: 1rem;
      color: #3a80e9;
      font-weight: 700;
      font-size: 1.2rem;
    }
    .h1 {
      font-size: 3.3rem;
      font-weight: 700;
    }
    .h3-container {
      z-index: 2;
      .h3 {
        font-size: 1.9rem;
        font-weight: 600;
        color: #a9a9a9;
        display: flex;
      }
      .gradient-span {
        display: flex;
        background: linear-gradient(
          90deg,
          rgba(2, 0, 36, 1) -30%,
          rgba(31, 83, 198, 1) 30%,
          rgba(0, 212, 255, 1) 100%
        );
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent; /* Makes the text color transparent, showing the background */
        display: inline-block; /* Needed to ensure the gradient covers the text */
      }
    }
    .scroll {
      padding: 1rem;
      z-index: 5 !important;
    }
    .scrollImg {
      width: 2rem;
    }
    .slidingText {
      position: absolute;
      bottom: 0.5rem;
      font-size: 35vh;
      white-space: nowrap;
      color: rgb(25, 25, 25);
      width: 50vw;
      font-weight: 500;
      z-index: 1;
    }
  }

  @media only screen and (max-width: 910px){
    .hero-info {
    gap: 1rem;
    min-height: 100vh;
    h2 {
      font-weight: 700;
      font-size: 0.9rem;
      letter-spacing: 0.5rem;
    }
    .h1 {
      font-size: 2.2rem;
      font-weight: 700;
    }
    .h3-container {
      .h3 {
        font-size: 1.4rem;
        font-weight: 600;
      }
    }
  }
  }


  @media only screen and (max-width: 650px) {
    padding-top: 4rem;
    .hero-container {
      display: flex;
      flex-direction: column-reverse;
    }
    .hero-image-container {
      min-height: 50vh;
      canvas {
        min-height: 50vh !important;
      }
    }
    .hero-info {
      gap: 0.4rem;
      min-height: 35vh;
    h2 {
      font-weight: 700;
      font-size: 0.8rem;
      letter-spacing: 0.4rem;
    }
    .h1 {
      font-size: 2rem;
      font-weight: 600;
    }
    .h3-container {
      .h3 {
        font-size: 1rem;
        font-weight: 600;
      }
    }
    .scrollImg {
      width: 1.6rem;
    }
  }
  }

  @media only screen and (max-width: 330px) {
    padding-top: 4rem;
    .hero-info {
      gap: 0.4rem;
      min-height: 35vh;
    h2 {
      font-weight: 700;
      font-size: 0.8rem;
      letter-spacing: 0.4rem;
    }
    .h1 {
      font-size: 1.5rem;
      font-weight: 600;
    }
    .h3-container {
      .h3 {
        font-size: 0.75rem;
        font-weight: 600;
      }
    }
  }
  }
`