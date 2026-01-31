//* imports
// json fallback text
import text from "./fallback.json";

const FallbackContent = () => {
  return (
      <>
        <section className="bg-[#ffc784] py-10">
          <article className="w-[80vW] m-auto">
           <h1 className="text-3xl text-center mb-2">{text.title1}</h1>
          {text.content1.map((item, index) => (
            <p key={index} className="mb-1.5">{item}</p>
          ))} 
          </article>
        </section>
        <section className="py-10">
          <article className="w-[80vW] m-auto">
           <h2 className="text-2xl text-center mb-2">{text.title2_1}</h2>
          <p className="mb-1.5">{text.content2_1}</p>
          <ul className="list-disc list-inside">
            {text.content2_2.map((item, index) => (
              <li key={index} className="ms-2">{item}</li>
            ))}
          </ul>
          <p className="mb-1.5">{text.conten2_3}</p>
          <h3 className="text-2xl text-center mb-2">{text.title2_2}</h3>
          {text.content2_4.map((item, index) => (
            <p key={index} className="mb-1.5">{item}</p>
          ))} 
          </article>
          
        </section>
        <section className="bg-[#ffc784] py-10">
          <article className="w-[80vW] m-auto">
            <h2 className="text-2xl text-center mb-2">{text.title3}</h2>
          {text.content3_1.map((item, index) => (
            <p key={index} className="mb-1.5">{item}</p>
          ))}
          <ol className="list-decimal list-inside">
            {text.content3_2.map((item, index) => (
              <li key={index} className="ms-2">{item}</li>
            ))}
          </ol>
          {text.content3_3.map((item, index) => (
            <p key={index} className="mb-1.5">{item}</p>
          ))}
          </article>
        </section>
      </>
  );
};

export default FallbackContent;
