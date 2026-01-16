//* import
import { getImage } from "../../../data/functions";

//* component
const Lightbox = ({ setShowLightBox, image }) => {
  //* return
  return (
    <div
      onClick={() => setShowLightBox(false)}
      className="fixed flex justify-center top-0 left-0 w-full h-full bg-gray-950/30 z-10 overflow-y-scroll"
    >
      <section className="grid grid-cols-1 max-h-[50px] mt-10">
        {/* close lightbox-button v */}
        <button
          onClick={() => setShowLightBox(false)}
          className="text-white font-semibold bg-gray-950/30 hover:bg-gray-950/50 cursor-pointer px-2 pb-1 w-fit mx-auto mb-2 rounded-full"
        >
          Luk billedet
        </button>
        {/* close lightbox-button ^ */}
        {/* image v */}
        <figure
          className="w-[70vw] lg:w-[50vw]"
          onClick={(event) => event.stopPropagation()}
        >
          <img
            src={getImage("events/" + image.id + "/" + image.img_url)}
            alt={image.img_alt}
          />
          {image.img_desc && (
            <figcaption className="text-white text-sm bg-gray-950/70 px-2 pt-1 pb-2 mx-auto mt-2 rounded-xs">
              <p>{image.img_desc}</p>
            </figcaption>
          )}
        </figure>
        {/* image ^ */}
      </section>
    </div>
  );
};

export default Lightbox;
