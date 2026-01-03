//* components
import Loading from "../../components/Loading";

//* react
import { useState, useEffect } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

//* functions
import { getData } from "../../data/functions";
import readText from "../../admin/components/RichTextEditor/readText";

const ReviewWidget = () => {
  //* data and loading
  const [loading, setLoading] = useState(true);

  const reviewData = getData("reviews", null);

  useEffect(() => {
    if ((reviewData && reviewData.length > 0) || reviewData == null) {
      setLoading(false);
    }
  }, [reviewData]);

  //* choosing which review to show
  const [showReviewNumber, setShowReviewNumber] = useState(0);

  const review = reviewData && reviewData[showReviewNumber];

  const changeReview = (direction) => {
    if (direction == "forward") {
      if (showReviewNumber < reviewData.length - 1)
        setShowReviewNumber(showReviewNumber + 1);
      else if (showReviewNumber == reviewData.length - 1)
        setShowReviewNumber(0);
    }
    if ((direction = "back")) {
      if (showReviewNumber > 0) setShowReviewNumber(showReviewNumber - 1);
      else if (showReviewNumber == 0)
        setShowReviewNumber(reviewData.length - 1);
    }
  };

  //* return
  if (reviewData == null) return null;
  else if (review) {
    return (
      <>
        {loading && <Loading />}
        <section className="rounded-xs bg-[#ffc784] px-6 py-2 min-h-[230px] flex flex-col justify-center">
          <div>
            <article>
              <div>
                {review.review &&
                  review.review.map((subitem, subindex) =>
                    readText(subitem, subindex)
                  )}
              </div>
              <h3 className="text-end">- {review.reviewer}</h3>
            </article>
          </div>

          <div className="flex justify-evenly">
            <button
              onClick={() => changeReview("back")}
              className="cursor-pointer text-4xl"
            >
              <BsArrowLeft />
            </button>
            <button
              onClick={() => changeReview("forward")}
              className="cursor-pointer text-4xl"
            >
              <BsArrowRight />
            </button>
          </div>
        </section>
      </>
    );
  }
};

export default ReviewWidget;
