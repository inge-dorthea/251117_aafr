//* own functions
import { getData, updateData } from "../../../api/APIfunctions";
import { useReload } from "../LastUpdated/useReload";

//* components
import LastUpdated from "../LastUpdated/LastUpdated";
import Input from "./Input";
import SaveButton from "./SaveButton";

const ContactInfoForm = () => {
  //* reload function for LastUpdated-component
  const [reload, reloading] = useReload();

//* get data
  const dataArray = getData("contact-info", "1");

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
    };

    updateData("contact-info", "1", body);

    // reload LastUpdated-component
    reload();
  };

  //* return
  return (
    <div>
      {dataArray[0] && (
        <form onSubmit={handleSubmit} className="px-9 py-7 border border-gray-400 rounded-xs">
          <div className="grid grid-cols-2 gap-5 pb-4">
            <Input
            type="number"
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
          <div className="grid grid-cols-2 gap-5 pb-4">
            <Input
            type="text"
            name="email"
            label="E-mail"
            defaultValue={dataArray[0].email}
          />
          <Input
            type="text"
            name="address"
            label="Adresse"
            defaultValue={dataArray[0].address}
          />
          </div>
          <div className="grid grid-cols-1 pb-4">
            <Input
            type="number"
            name="donation"
            label="Kontonummer til donation"
            defaultValue={dataArray[0].donation}
          />
          </div>
          

          <div className="flex justify-between">
            <SaveButton />
            {reloading ? null : <LastUpdated table="contact-info" id="1" />}
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactInfoForm;
