import { createClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
const supabaseUrl = "https://rnleiofyyckqxppsfkyi.supabase.co";
const supabaseKey = import.meta.env.VITE_API_BASE_URL;
const supabase = createClient(supabaseUrl, supabaseKey);

export const getData = (table, id) => {
  const [test, setTest] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    if (!id) {
      if(table == "static-pages" || table == "contact-info" || table == "test-table"){ //! fjern test-table
        const { data, error } = await supabase.from(table).select();

      if (error) console.log(error);

      setTest(data);
      }
      else {
        const { data, error } = await supabase.from(table).select().order('order', { ascending: true });

      if (error) console.log(error);

      setTest(data);
      }
      }
      
    

    if (id) {
      const { data, error } = await supabase.from(table).select().eq("id", id);

      if (error) console.log(error);

      setTest(data);
    }
  }

  return test;
};

export const updateData = async (table, id, body) => {
  const { data, error } = await supabase
    .from(table)
    .update(body)
    .select()
    .eq("id", id);

  if (error) console.log("updateData: " + error)
  else return data;
};

export const postData = async (table, body) => {
  const {data, error} = await supabase.from(table).insert(body).select();

  if (error) console.log("postData: " + error);
  else return data;
};

export const deleteData = async (table, id) => {
  const { data, error } = await supabase.from(table).delete().eq('id', id).select();

  if (error) console.log("deleteData: " + error);
  else return data;
}


//! gotta work this out

export async function uploadFile(file, folder, fileName) {
  const { data, error } = await supabase.storage
    .from("images")
    .upload(folder + "/" + fileName, file, {
      cacheControl: "3600",
      upsert: true
    });

  if (error) {
    console.error("Error uploading file:", error);
    return;
  }
  else return data;

  // console.log("File uploaded successfully:", data);
}


export const deleteFile = async (folder, fileName) => {
  const { data, error } = await supabase.storage
    .from("images")
    .remove([folder + "/" + fileName]);

    if(error) console.log("deleteFile: " + error);
    else return data;
};

export const getImage = (filepath) => {
  const { data } = supabase.storage.from("images").getPublicUrl(filepath);

  console.log(data.publicUrl);

  return data.publicUrl;
};

export const getImages = (folder) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    list();
  }, []);

  const list = async () => {
    const { data, error } = await supabase.storage
      .from("images")
      .list(folder.toString());

    if (error) console.log(error);

    setImages(data);
  };

  console.log(images);

  let imageArray = [];

  images.map((item, index) => {
    const imageUrl = getImage(folder + "/" + item.name);

    imageArray.push(imageUrl);
  });

  console.log(imageArray);

  return imageArray;
};