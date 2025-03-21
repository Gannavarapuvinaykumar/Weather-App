
import React, { useEffect, useState } from 'react';
import { WeatherCondition } from '../types/weather';

interface BackgroundProps {
  condition: WeatherCondition;
}

export const Background: React.FC<BackgroundProps> = ({ condition }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Determine which background to render based on weather condition
  switch (condition) {
    case 'sunny':
      return <SunnyBackground />;
    case 'cloudy':
      return <CloudyBackground />;
    case 'rainy':
      return <RainyBackground />;
    case 'snowy':
      return <SnowyBackground />;
    case 'stormy':
      return <StormyBackground />;
    default:
      return <CloudyBackground />;
  }
};

const SunnyBackground: React.FC = () => {
  return (
    <div className="sunny-background">
      <div className="sun"></div>
      <div className="clouds">
        <div className="cloud1"></div>
        <div className="cloud2"></div>
        <div className="cloud3"></div>
      </div>
      <style>
        {`
          .sunny-background {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(180deg, #4D95FF 0%, #86C1FF 100%);
            overflow: hidden;
            z-index: -1;
          }
          
          .sun {
            position: absolute;
            width: 120px;
            height: 120px;
            border-radius: 50%;
            background: linear-gradient(90deg, #FEC6A1 0%, #FEB974 100%);
            box-shadow: 0 0 60px rgba(255, 177, 77, 0.4), 0 0 120px rgba(255, 208, 138, 0.2);
            top: 10%;
            right: 20%;
            animation: float 8s infinite ease-in-out;
          }
          
          .clouds {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            opacity: 0.6;
          }
          
          .cloud1, .cloud2, .cloud3 {
            position: absolute;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 50px;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.05);
          }
          
          .cloud1 {
            width: 200px;
            height: 60px;
            top: 20%;
            left: -5%;
            animation: drift1 60s infinite linear;
          }
          
          .cloud2 {
            width: 160px;
            height: 50px;
            top: 35%;
            left: -8%;
            animation: drift2 50s infinite linear;
          }
          
          .cloud3 {
            width: 240px;
            height: 70px;
            top: 50%;
            left: -10%;
            animation: drift3 70s infinite linear;
          }
          
          @keyframes drift1 {
            from { transform: translateX(0); }
            to { transform: translateX(calc(100vw + 300px)); }
          }
          
          @keyframes drift2 {
            from { transform: translateX(0); }
            to { transform: translateX(calc(100vw + 300px)); }
          }
          
          @keyframes drift3 {
            from { transform: translateX(0); }
            to { transform: translateX(calc(100vw + 300px)); }
          }
        `}
      </style>
    </div>
  );
};

const CloudyBackground: React.FC = () => {
  return (
    <div className="cloudy-background">
      <div className="clouds">
        <div className="cloud1"></div>
        <div className="cloud2"></div>
        <div className="cloud3"></div>
        <div className="cloud4"></div>
        <div className="cloud5"></div>
      </div>
      <style>
        {`
          .cloudy-background {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(180deg, #5D8AB4 0%, #8FACBF 100%);
            overflow: hidden;
            z-index: -1;
          }
          
          .clouds {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
          }
          
          .cloud1, .cloud2, .cloud3, .cloud4, .cloud5 {
            position: absolute;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 50px;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.05);
          }
          
          .cloud1 {
            width: 300px;
            height: 80px;
            top: 10%;
            left: -10%;
            animation: drift1 80s infinite linear;
          }
          
          .cloud2 {
            width: 250px;
            height: 70px;
            top: 25%;
            left: -15%;
            animation: drift2 65s infinite linear;
          }
          
          .cloud3 {
            width: 200px;
            height: 60px;
            top: 40%;
            left: -5%;
            animation: drift3 70s infinite linear;
          }
          
          .cloud4 {
            width: 280px;
            height: 75px;
            top: 60%;
            left: -12%;
            animation: drift4 60s infinite linear;
          }
          
          .cloud5 {
            width: 220px;
            height: 65px;
            top: 75%;
            left: -8%;
            animation: drift5 75s infinite linear;
          }
          
          @keyframes drift1 {
            from { transform: translateX(0); }
            to { transform: translateX(calc(100vw + 300px)); }
          }
          
          @keyframes drift2 {
            from { transform: translateX(0); }
            to { transform: translateX(calc(100vw + 300px)); }
          }
          
          @keyframes drift3 {
            from { transform: translateX(0); }
            to { transform: translateX(calc(100vw + 300px)); }
          }
          
          @keyframes drift4 {
            from { transform: translateX(0); }
            to { transform: translateX(calc(100vw + 300px)); }
          }
          
          @keyframes drift5 {
            from { transform: translateX(0); }
            to { transform: translateX(calc(100vw + 300px)); }
          }
        `}
      </style>
    </div>
  );
};

const RainyBackground: React.FC = () => {
  return (
    <div className="rainy-background">
      <div className="clouds">
        <div className="cloud1"></div>
        <div className="cloud2"></div>
        <div className="cloud3"></div>
      </div>
      <div className="rain"></div>
      <style>
        {`
          .rainy-background {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(180deg, #546E7A 0%, #78909C 100%);
            overflow: hidden;
            z-index: -1;
          }
          
          .clouds {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
          }
          
          .cloud1, .cloud2, .cloud3 {
            position: absolute;
            background: rgba(80, 95, 105, 0.9);
            border-radius: 50px;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
          }
          
          .cloud1 {
            width: 300px;
            height: 80px;
            top: 15%;
            left: 10%;
          }
          
          .cloud2 {
            width: 350px;
            height: 90px;
            top: 35%;
            left: 45%;
          }
          
          .cloud3 {
            width: 280px;
            height: 75px;
            top: 55%;
            left: 25%;
          }
          
          .rain {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: 
              linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 100%);
            background-size: 20px 100px;
            animation: rain 0.7s linear infinite;
            opacity: 0.7;
          }
          
          @keyframes rain {
            0% {
              background-position: 0 0;
            }
            100% {
              background-position: 0 100px;
            }
          }
        `}
      </style>
    </div>
  );
};

const SnowyBackground: React.FC = () => {
  return (
    <div className="snowy-background">
      <div className="clouds">
        <div className="cloud1"></div>
        <div className="cloud2"></div>
        <div className="cloud3"></div>
      </div>
      <div className="snow"></div>
      <style>
        {`
          .snowy-background {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(180deg, #B0BEC5 0%, #CFD8DC 100%);
            overflow: hidden;
            z-index: -1;
          }
          
          .clouds {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
          }
          
          .cloud1, .cloud2, .cloud3 {
            position: absolute;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 50px;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.05);
          }
          
          .cloud1 {
            width: 300px;
            height: 80px;
            top: 15%;
            left: 10%;
          }
          
          .cloud2 {
            width: 350px;
            height: 90px;
            top: 35%;
            left: 45%;
          }
          
          .cloud3 {
            width: 280px;
            height: 75px;
            top: 55%;
            left: 25%;
          }
          
          .snow {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: 
              radial-gradient(3px 3px at 100px 50px, white 100%, transparent),
              radial-gradient(4px 4px at 200px 150px, white 100%, transparent),
              radial-gradient(2px 2px at 300px 250px, white 100%, transparent),
              radial-gradient(3px 3px at 400px 350px, white 100%, transparent),
              radial-gradient(4px 4px at 500px 100px, white 100%, transparent),
              radial-gradient(2px 2px at 50px 200px, white 100%, transparent),
              radial-gradient(3px 3px at 150px 300px, white 100%, transparent),
              radial-gradient(4px 4px at 250px 400px, white 100%, transparent),
              radial-gradient(2px 2px at 350px 500px, white 100%, transparent);
            background-size: 650px 650px;
            animation: snow 5s linear infinite;
            opacity: 0.8;
          }
          
          @keyframes snow {
            0% {
              background-position: 0px 0px, 0px 0px, 0px 0px, 0px 0px, 0px 0px, 0px 0px, 0px 0px, 0px 0px, 0px 0px;
            }
            100% {
              background-position: 500px 500px, 400px 400px, 300px 300px, 200px 200px, 100px 100px, 0px 0px, 0px 0px, 0px 0px, 0px 0px;
            }
          }
        `}
      </style>
    </div>
  );
};

const StormyBackground: React.FC = () => {
  return (
    <div className="stormy-background">
      <div className="clouds">
        <div className="cloud1"></div>
        <div className="cloud2"></div>
        <div className="cloud3"></div>
      </div>
      <div className="rain"></div>
      <div className="lightning"></div>
      <style>
        {`
          .stormy-background {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(180deg, #37474F 0%, #455A64 100%);
            overflow: hidden;
            z-index: -1;
          }
          
          .clouds {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
          }
          
          .cloud1, .cloud2, .cloud3 {
            position: absolute;
            background: rgba(44, 56, 68, 0.9);
            border-radius: 50px;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          }
          
          .cloud1 {
            width: 300px;
            height: 80px;
            top: 15%;
            left: 10%;
          }
          
          .cloud2 {
            width: 350px;
            height: 90px;
            top: 35%;
            left: 45%;
          }
          
          .cloud3 {
            width: 280px;
            height: 75px;
            top: 55%;
            left: 25%;
          }
          
          .rain {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: 
              linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.7) 100%);
            background-size: 20px 150px;
            animation: storm-rain 0.5s linear infinite;
            opacity: 0.6;
          }
          
          @keyframes storm-rain {
            0% {
              background-position: 0 0;
            }
            100% {
              background-position: -20px 150px;
            }
          }
          
          .lightning {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: transparent;
            animation: lightning 8s infinite;
          }
          
          @keyframes lightning {
            0%, 20%, 40%, 60%, 80%, 95%, 100% { 
              background-color: transparent;
            }
            97%, 97.5%, 98% {
              background-color: rgba(255, 255, 255, 0.3);
            }
            97.25%, 97.75% {
              background-color: rgba(255, 255, 255, 0.2);
            }
          }
        `}
      </style>
    </div>
  );
};
