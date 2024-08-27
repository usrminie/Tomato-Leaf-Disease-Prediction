// Landing.js
import React, { useRef, useEffect } from "react";
import "tachyons";
import { Provider, Heading, Subhead } from "rebass";
import { Hero, Flex, CallToAction, ScrollDownIndicator } from "react-landing-page";
import { throttle } from "lodash";
import Home from "./Home";

const Landing = () => {
  const scrollToRef = useRef(null);
  const backgroundRef = useRef(null);

  const handleScroll = () => {
    const scrollY = window.scrollY || window.pageYOffset;
    backgroundRef.current.style.transform = `translate3d(0, ${
      scrollY * 0.4
    }px, 0)`;
  };

  useEffect(() => {
    window.addEventListener("scroll", throttle(handleScroll, 16));
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    scrollToRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Provider>
        <Hero color="white" bg="#282c34" minHeight="100vh" bgOpacity={0.7}>
          <div
            style={{ position: "absolute", zIndex: "-1", width: "100%", top: 0 }}
            ref={backgroundRef}
            className="parallax-background"
          >
            <img
              src="https://wallpapers.com/images/high/verdant-rice-fields-and-farm-surrounding-small-village-8uuv5wg8j0tqwpo5.webp"
              alt="Parallax Background"
              width="100%"
              style={{ opacity: 0.7, filter: "blur(2px)" }}
            />
          </div>
          <div className="content" style={{ textAlign: "center", marginTop: "20vh" }}>
            <Heading fontSize={[100, 150]} fontWeight="bold" mb={3}>
              Tomato Leaf Prediction
            </Heading>
            <Subhead fontSize={[3, 4]} mb={4} color="#fff">
              Check if Your Plant is Healthy
            </Subhead>
            <Flex justifyContent="center" mt={4}>
              <CallToAction bg="rgba(255, 255, 255, 0.1)" onClick={handleClick}>
                Start Now
              </CallToAction>
            </Flex>
            <div onClick={handleClick}>
              <ScrollDownIndicator />
            </div>
          </div>
        </Hero>
      </Provider>
      <div ref={scrollToRef}>
        <Home />
      </div>
    </>
  );
};

export default Landing;
