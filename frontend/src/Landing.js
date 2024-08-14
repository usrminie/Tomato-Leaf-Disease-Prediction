import React, { useRef, useEffect } from "react";
import "tachyons";
import { Provider, Heading, Subhead } from "rebass";
import {
  Hero,
  Flex,
  CallToAction,
  ScrollDownIndicator,
} from "react-landing-page";
import { throttle } from "lodash";
import Home from "./Home";

const Landing = (props) => {
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

  const throttledHandleScroll = throttle(handleClick, 500); // Adjust the delay as needed

  return (
    <>
      <Provider>
        <Hero color="white" bg="black" bgOpacity={0.1}>
          <div
            style={{ position: "absolute", zIndex: "-1", width: "100%" }}
            className="parallax-background"
            ref={backgroundRef}
          >
            <img
              src="https://wallpapers.com/images/high/verdant-rice-fields-and-farm-surrounding-small-village-8uuv5wg8j0tqwpo5.webp"
              alt="Parallax Background"
              width="100%"
            />
          </div>
          <div className="content" style={{ marginLeft: "20px" }}>
            <Heading fontSize={150}>Tomato Leaf Prediction</Heading>
            <Subhead style={{textAlign:"center"}} fontSize={[2, 3]}>Check Your Plant is Healthy </Subhead>
            <div style={{ display: "flex", justifyContent:"center" }}>
              <Flex mt={3}>
                {/* <CallToAction bg="grey" mr={3}>
                  Start Petition
                </CallToAction>
                <CallToAction>To Know More</CallToAction> */}
              </Flex>
            </div>
            <div onClick={throttledHandleScroll}>
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
