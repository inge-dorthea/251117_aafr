import React from 'react'
import { getData, getImage } from '../../api/APIfunctions'
import readText from '../../admin/components/RichTextEditor/readText';
import { useState, useEffect } from "react";
import Loading from '../../components/Loading';

const Partners = () => {
const [loading, setLoading] = useState(true);

  const textData = getData("static-pages", 7);
  const partnerData = getData("partners", null);

  useEffect(() => {
    if(textData && partnerData) setLoading(false);
  }, [textData, partnerData])
  
  return (
    <>
    <title>Om os - Samarbejdspartnere</title>
    {loading && (
      <Loading />
    )}
    <div>
      {textData[0] && (
        <section className="bg-[#ffc784] py-10">
          <article className="w-[80vW] m-auto">
          {textData[0].show_title && (
            <h1 className='text-3xl text-center mb-2'>{textData[0].title}</h1>
          )}
          <div>
             {textData[0].text &&
                    textData[0].text.map((item, index) => readText(item, index))}
          </div>
        </article>
        </section>
      )}
      <section className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 mt-10 pb-10 w-[90vw] sm:w-[85vw] md:w-[80vw] lg:w-[70vw] m-auto'>
        {partnerData && partnerData.map((item, index) => (
        <figure key={index}>
          <a href={item.url} target='_blank' rel="noreferrer">
            <img src={getImage("partners/" + item.id + "/" + item.img_url)} alt="" />
          </a>
        </figure>
      ))}
      </section>
      
    </div>
    </>
  )
}

export default Partners