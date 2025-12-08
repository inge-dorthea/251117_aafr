import { getData } from "../../../api/APIfunctions";

const LastUpdated = ({ table, id }) => {
  const dataArray = getData(table, id);

  return (
    <>
      {dataArray[0] && (
        <div className="flex w-fit gap-5 bg-gray-50 border border-gray-300 px-2 pt-1 pb-2 rounded-xs box-border">
          <p className="my-auto">Sidst gemt og udgivet:</p>
          <div className="text-center">
            <p>{dataArray[0].last_updated.slice(0, 10)}</p>
            <p>
              {parseInt(dataArray[0].last_updated.slice(11, 13)) +
                1 +
                dataArray[0].last_updated.slice(13, 19)}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default LastUpdated;
