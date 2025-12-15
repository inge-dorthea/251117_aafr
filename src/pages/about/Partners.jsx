import React from 'react'
import { getData, getImage } from '../../api/APIfunctions'
import readText from '../../admin/components/RichTextEditor/readText';

const Partners = () => {
  const textData = getData("static-pages", 7);
  const partnerData = getData("partners", null);

  return (
    <>
    <title>Om os - Samarbejdspartnere</title>
    <div>
      {textData[0] && (
        <section>
          <article>
          {textData[0].show_title && (
            <h1>{textData[0].title}</h1>
          )}
          <div>
             {textData[0].text &&
                    textData[0].text.map((item, index) => readText(item, index))}
          </div>
        </article>
        </section>
      )}
      <section>
        {partnerData && partnerData.map((item, index) => (
        <figure>
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