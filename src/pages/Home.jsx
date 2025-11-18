import React from 'react'
import RichTextEditor from '../admin/components/RichTextEditor'
import { useState, useCallback, useMemo } from "react";


const Home = () => {

  const iV = useMemo(
      () =>
        JSON.parse(localStorage.getItem('content')) ,
      []
    )

  return (
    <div>
      Home
      <RichTextEditor iV={iV} />
    </div>
  )
}

export default Home