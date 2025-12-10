import React from "react";
import RichTextEditor from "../admin/components/RichTextEditor/RichTextEditor";
import { useState, useCallback, useMemo } from "react";
import { getImage, getImages } from "../api/APIfunctions";

import { getData } from "../api/APIfunctions";

const Home = () => {
  
  const data = getData("test-table", null);

  data && console.log("here:", data[0]?.json);

  const iV = data[2]?.json;

  // useMemo(
  //     () =>
  //       JSON.parse(localStorage.getItem('content')) ,
  //     []
  //   )

  // getImages("advisors");

  return (
    <div className="w-100 m-auto flex flex-col">
      Home
              <img src={getImage("file-path/file-name.ext")} alt="" />
      
      {iV && <RichTextEditor iV={iV} height="h-90" />}
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
