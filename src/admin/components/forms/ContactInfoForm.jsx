//* import
// react
import { useState, useEffect } from "react";

// own functions
import { useReload } from "../LastUpdated/useReload";
import { getData, updateData } from "../../../data/functions";

// components
import LastUpdated from "../LastUpdated/LastUpdated";
import Input from "./Input";
import SaveButton from "./SaveButton";
import Loading from "../../../components/Loading";

//* component
const ContactInfoForm = () => {
  //* set the page to be loading until data has been fetched
  const [loading, setLoading] = useState(true);

  //* reload function for LastUpdated-component
  const [reload, reloading] = useReload();

  //* get data
  const dataArray = getData("contact-info", "1");

  useEffect(() => {
    if (dataArray && dataArray.length > 0) setLoading(false);
  }, [dataArray]);

  //* updating data in database
  const handleSubmit = (event) => {
    event.preventDefault();

    const date = new Date();

    const body = {
      last_updated: date,
      phone: event.target.phone_number.value,
      phone_time: event.target.phone_time.value,
      email: event.target.email.value,
      address: event.target.address.value,
      donation: event.target.donation.value,
      cvr_number: event.target.cvr_number.value,
    };

    updateData("contact-info", "1", body);

    // reload LastUpdated-component
    reload();
  };

  //* return
  return (
    <div>
      {loading && <Loading />}
      {/* form v */}
      {dataArray[0] && (
        <form
          onSubmit={handleSubmit}
          className="px-9 py-7 bg-[#87d69937] border border-gray-400 rounded-xs"
        >
          {/* phone-info inputs v */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pb-4">
            <Input
              type="text"
              name="phone_number"
              label="Telefon-nummer"
              defaultValue={dataArray[0].phone}
            />
            <Input
              type="text"
              name="phone_time"
              label="Telefon-tid"
              defaultValue={dataArray[0].phone_time}
            />
          </div>
          {/* phone-info inputs ^ */}
          {/* mail and cvr inputs v */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pb-4">
            <Input
              type="text"
              name="email"
              label="E-mail"
              defaultValue={dataArray[0].email}
            />
            <Input
              type="text"
              name="cvr_number"
              label="CVR nummer"
              defaultValue={dataArray[0].cvr_number}
            />
          </div>
          {/* mail and cvr inputs ^ */}
          {/* address input v */}
          <div className="grid grid-cols-1 pb-4">
            <Input
              type="text"
              name="address"
              label="Adresse"
              defaultValue={dataArray[0].address}
            />
          </div>
          {/* address input ^ */}
          {/* donation input v */}
          <div className="grid grid-cols-1 pb-4">
            <Input
              type="text"
              name="donation"
              label="Kontonummer til donation"
              defaultValue={dataArray[0].donation}
            />
            {/* donation input ^ */}
          </div>
          {/* buttons v */}
          <div className="flex flex-wrap gap-5 justify-evenly sm:justify-between">
            <SaveButton />
            {reloading ? null : <LastUpdated table="contact-info" id="1" />}
          </div>
          {/* buttons ^ */}
        </form>
      )}
      {/* form ^ */}
    </div>
  );
};

export default ContactInfoForm;
