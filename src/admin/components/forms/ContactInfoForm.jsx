import { getData, updateData } from '../../../api/APIfunctions'
import LastUpdated from '../LastUpdated/LastUpdated';
import { useState } from 'react';

const ContactInfoForm = () => {
  const dataArray = getData("contact-info", "1");

  const handleSubmit = (event) => {
    event.preventDefault();

    const body = {
      phone_number: event.target.phone_number.value,
      phone_time: event.target.phone_time.value,
      email: event.target.email.value,
      address: event.target.address.value,
      donation: event.target.donation.value,
    }

    updateData("contact-info", "1", body);

  }

  return (
    <div>
      {dataArray[0] && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="phone_number">
            Telefonnummer:
            <input
              type="number"
              name="phone_number"
              id="phone_number"
              defaultValue={dataArray[0].phone}
            />
          </label>
          <label htmlFor="phone_time">
            Telefontid:
            <input
              type="text"
              name="phone_time"
              id="phone_time"
              defaultValue={dataArray[0].phone_time}
            />
          </label>
          <label htmlFor="email">
            E-mail:
            <input
              type="text"
              name="email"
              id="email"
              defaultValue={dataArray[0].email}
            />
          </label>
          <label htmlFor="address">
            Adresse:
            <input
              type="text"
              name="address"
              id="address"
              defaultValue={dataArray[0].address}
            />
          </label>
          <label htmlFor="donation">
            Donationskontonummer:
            <input
              type="number"
              name="donation"
              id="donation"
              defaultValue={dataArray[0].donation}
            />
          </label>
          <button type="submit">Gem og udgiv</button>
        </form>
      )}
      <LastUpdated table="contact-info" id="1" />
    </div>
  )
}

export default ContactInfoForm