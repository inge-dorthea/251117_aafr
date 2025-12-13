import React from 'react'
import { useParams } from 'react-router'

const EditPartner = () => {
    const {partnerId} = useParams();
  return (
    <div>EditPartner: {partnerId}</div>
  )
}

export default EditPartner