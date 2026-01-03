import React from "react";
import Content from "./Content";
import NewsWidget from "./NewsWidget";
import ReviewWidget from "./ReviewWidget";

const Home = () => {
  return (
    <>
      <title>Åben Forældrerådgivning</title>
      <Content />
      <div className="w-[80vw] m-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8 lg:gap-30 pb-10">
        <NewsWidget />
        <ReviewWidget />
      </div>
    </>
  );
};

export default Home;
