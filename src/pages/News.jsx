import React from 'react'
import { getData } from "../api/APIfunctions";


const News = () => {

  const data = getData("static-pages", "frontpage");
  
    data && console.log("here:", data);

  return (
    <div>News</div>
  )
}

export default News