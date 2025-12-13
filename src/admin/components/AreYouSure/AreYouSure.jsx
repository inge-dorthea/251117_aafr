const AreYouSure = ({ doFunction, setShowModal }) => {
  return (
    <div
      onClick={() => setShowModal(false)}
      className="fixed top-0 bottom-0 left-0 right-0 bg-gray-500/70"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="bg-gray-50 w-[40vw] m-auto my-30 p-2 pt-5 border-2 border-red-900 rounded-sm shadow-xs shadow-red-400"
      >
        <p className="text-center text-lg">Er du sikker på, at du vil slette?</p>
        <div className="flex justify-evenly mt-5 mb-2">
          <button
            onClick={doFunction}
            className="pt-1 pb-2 px-3 border border-gray-300 bg-red-400 rounded-sm cursor-pointer box-border hover:bg-red-600 hover:border-gray-200"
          >
            Ja, gør det!
          </button>
          <button
            onClick={() => setShowModal(false)}
            className="pt-1 pb-2 px-3 border border-gray-300 bg-gray-50 rounded-sm cursor-pointer box-border hover:bg-gray-100 hover:border-gray-200"
          >
            Nej, gå tilbage!
          </button>
        </div>
      </div>
    </div>
  );
};

export default AreYouSure;
