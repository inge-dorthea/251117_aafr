import { useState, useEffect } from "react";
import { getData, updateData } from "../../api/APIfunctions";
import RichTextEditor from "../components/RichTextEditor/RichTextEditor";

const AdminContact = () => {
  const contactinfoArray = getData("contact-info", null, "1");

  const contactinfoObject = contactinfoArray[0];

  contactinfoObject && console.log(contactinfoObject.phone);

  const handleSubmit = (event) => {
    event.preventDefault();

    // console.log(event.target);

    // console.log(event.target.email.value);

    const body = {
      phone_number: event.target.phone_number.value,
      phone_time: event.target.phone_time.value,
      email: event.target.email.value,
      address: event.target.address.value,
      donation: event.target.donation.value,
    };

    updateData("contact-info", "1", body);
  };

  //* ----------------------------------------------

  const contactDataArray = getData("static-pages", "contact", null);

  // console.log(contactDataArray);

  const contactDataOneObject = contactDataArray.find(
    (object) => object.id == "11"
  );
  const contactDataTwoObject = contactDataArray.find(
    (object) => object.id == "12"
  );

  // console.log(contactDataOneObject);

  const [contactDataOne, setContactDataOne] = useState(null);
  const [contactDataTwo, setContactDataTwo] = useState(null);

  useEffect(() => {
    contactDataOneObject && setContactDataOne(contactDataOneObject.text);
  }, [contactDataOneObject]);

  useEffect(() => {
    contactDataTwoObject && setContactDataTwo(contactDataTwoObject.text);
  }, [contactDataTwoObject]);

  const handleOtherSubmit = (event) => {
    event.preventDefault();

    const data = contactDataOne;

    // console.log(event.target.show_title.checked);

    console.log(data);

    const body = {
      show_title: event.target.show_title.checked,
      title: event.target.title.value,
      text: data,
    };

    updateData("static-pages", "11", body);
  };

  return (
    <div>
      {contactinfoObject && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="phone_number">
            Telefonnummer:
            <input
              type="number"
              name="phone_number"
              id="phone_number"
              defaultValue={contactinfoObject.phone}
            />
          </label>
          <label htmlFor="phone_time">
            Telefontid:
            <input
              type="text"
              name="phone_time"
              id="phone_time"
              defaultValue={contactinfoObject.phone_time}
            />
          </label>
          <label htmlFor="email">
            E-mail:
            <input
              type="text"
              name="email"
              id="email"
              defaultValue={contactinfoObject.email}
            />
          </label>
          <label htmlFor="address">
            Adresse:
            <input
              type="text"
              name="address"
              id="address"
              defaultValue={contactinfoObject.address}
            />
          </label>
          <label htmlFor="donation">
            Donationskontonummer:
            <input
              type="number"
              name="donation"
              id="donation"
              defaultValue={contactinfoObject.donation}
            />
          </label>
          <button type="submit">Gem og udgiv</button>
        </form>
      )}

      {contactDataOne && (
        <form onSubmit={handleOtherSubmit}>
          <label htmlFor="">
            Vis overskrift:
            <input
              type="checkbox"
              name="show_title"
              id="show_title"
              defaultChecked={contactDataOneObject.show_title == true}
            />
          </label>
          <label htmlFor="">
            Overskrift:
            <input
              type="text"
              name="title"
              id="title"
              defaultValue={contactDataOneObject.title}
            />
          </label>
          <RichTextEditor iV={contactDataOne} setData={setContactDataOne} />
          <button type="submit">Gem og udgiv</button>
        </form>
      )}

      {contactDataTwo && (
        <form action="">
          <label htmlFor="">
            Vis overskrift:
            <input type="checkbox" />
          </label>
          <label htmlFor="">
            Overskrift:
            <input type="text" />
          </label>

          <RichTextEditor iV={contactDataTwo} setData={setContactDataTwo} />
        </form>
      )}
    </div>
  );
};

export default AdminContact;
