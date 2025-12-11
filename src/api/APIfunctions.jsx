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
      const { data, error } = await supabase.from(table).select();

      if (error) console.log(error);

      setTest(data);
    }

    if (id) {
      const { data, error } = await supabase.from(table).select().eq("id", id);

      if (error) console.log(error);

      setTest(data);
    }
  };

  return test;
};


export const updateData = async (table, id, body) => {
  const {data, error} = await supabase.from(table).update(body).select().eq("id", id);

  if(error) console.log(error);
  else console.log(data)
}




const postData = async (table, body) => {
  const date = new Date();

  switch (table) {
    case "reviews":
      const { error: reviewError } = await supabase.from(table).insert({
        last_updated: date,
        show_review: body.show_review,
        reviewer: body.reviewer,
        review: body.review,
      });
      if (reviewError) console.log(reviewError);

      break;

    case "partners":
      const { error: partnerError } = await supabase.from(table).insert({
        last_updated: date,
        img_url: body.img_url,
        url: body.url,
        order: body.order,
        partner: body.partner,
      });
      if (partnerError) console.log(partnerError);

      break;

    case "news":
      const { error: newsError } = await supabase.from(table).insert({
        last_updated: date,
        show_article: body.show_article,
        show_author: body.show_author,
        author: body.author,
        headline: body.headline,
        images: body.images,
        article: body.article,
        order: body.order,
      });
      if (newsError) console.log(newsError);

      break;

    case "advisors":
      const { error: advisorError } = await supabase.from(table).insert({
        last_updated: date,
        name: body.name,
        description: body.description,
        img_url: body.img_url,
        order: body.order,
      });
      if (advisorError) console.log(advisorError);

      break;
  }
};



//! gotta work this out

export async function uploadFile(file, folder, fileName) {
  const { data, error } = await supabase.storage
    .from("images")
    .upload(folder + '/' + fileName, file)

  if (error) {
    console.error('Error uploading file:', error)
    return
  }

  console.log('File uploaded successfully:', data)
}

export const getImage = (filepath) => {
  const { data } = supabase.storage.from('images').getPublicUrl(filepath)

console.log(data.publicUrl)

return data.publicUrl;
}

export const getImages = (folder) => {

  const [images, setImages] = useState([]);

  useEffect(() => {
    list()
  }, [])
  

  const list = async () => {
    const {data, error} = await supabase.storage.from("images").list(folder.toString());

    if(error) console.log(error);

    setImages(data)
  }

  console.log(images)

  let imageArray = [];

  images.map((item, index) => {
   const imageUrl = getImage(folder + "/" + item.name)

   imageArray.push(imageUrl);
  })

  console.log(imageArray);

  return imageArray;
}

