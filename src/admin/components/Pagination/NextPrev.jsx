const NextPrev = ({itemsPerPage, currentPageIndex, setCurrentPageIndex, length}) => {
  return (
    <div className="flex gap-5 justify-end">
      <button
        onClick={() => setCurrentPageIndex(currentPageIndex - itemsPerPage)}
        disabled={currentPageIndex <= 0}
        className="pt-4 pb-5 px-5 border border-gray-300 bg-gray-50 rounded-xs cursor-pointer box-border hover:bg-gray-100 hover:border-gray-200 disabled:text-gray-300"
      >
        Forrige side
      </button>
      <button onClick={() => setCurrentPageIndex(currentPageIndex + itemsPerPage)} disabled={currentPageIndex + itemsPerPage >= length} className="pt-4 pb-5 px-5 border border-gray-300 bg-gray-50 rounded-xs cursor-pointer box-border hover:bg-gray-100 hover:border-gray-200 disabled:text-gray-300">
        Næste side
      </button>
    </div>
  );
};

export default NextPrev;
