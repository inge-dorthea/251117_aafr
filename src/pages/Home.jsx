import React from "react";
import RichTextEditor from "../admin/components/RichTextEditor/RichTextEditor";
import { useState, useCallback, useMemo } from "react";

import { getData } from "../api/APIfunctions";

const Home = () => {
  const data = getData();

  data && console.log("here:", data[0]?.json);

  const iV = data[0]?.json;

  // useMemo(
  //     () =>
  //       JSON.parse(localStorage.getItem('content')) ,
  //     []
  //   )

  return (
    <div>
      Home
      {iV && <RichTextEditor iV={iV} />}
      {data &&
        data.map((item, index) => (
          <div key={index}>
            <p>
              {item.test + item.json[0]?.children[0]?.text}
            </p>
            {item.json.map((item, index) => (
              <div key={index}>
                {/* {item.children.map((item, index) => (
                  <span key={index} style={{fontWeight: item.bold ? "bold" : "normal"}}>
                  {item.text}
                  </span>
                  
                ))} */}
                {item.children.map((item, index) => {
                  if(item.bold) {
                    return <span key={index} style={{fontWeight: "bold"}}>{item.text}</span>
                  } else {
                    return item.text;
                  }
                })}
              </div>
            ))}
            </div>
        ))}
    </div>
  );
};

export default Home;
