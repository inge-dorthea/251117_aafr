import { getData } from "../../../api/APIfunctions";

const LastUpdated = ({ table, id }) => {
  const dataArray = getData(table, id);

  return <div>{dataArray[0] && <p>{dataArray[0].last_updated}</p>}</div>;
};

export default LastUpdated;

// could maybe use that portal thing?
