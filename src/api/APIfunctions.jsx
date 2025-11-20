import { createClient } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'
const supabaseUrl = 'https://rnleiofyyckqxppsfkyi.supabase.co'
const supabaseKey = import.meta.env.VITE_API_BASE_URL
const supabase = createClient(supabaseUrl, supabaseKey)

 export const getData = () => {

    const [test, setTest] = useState([]);

  useEffect(() => {
    doData();
  }, [])

  const doData = async () => {
    const {data} = await supabase.from("test-table").select();
    setTest(data);
  }
    

    return test;
  }

  export const updateData = async (content) => {
    const {error} = await supabase.from("test-table").update({"json": content}).eq("id", 3);

    console.log(content);
  }