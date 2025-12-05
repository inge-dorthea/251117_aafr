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
  const date = new Date();

  switch (table) {
    case "advisors":
      const { error: advisorError } = await supabase
        .from(table)
        .update({
          last_updated: date,
          name: body.name,
          description: body.description,
          img_url: body.img_url,
          order: body.order,
        })
        .eq("id", id);

      if (advisorError) console.log({ advisorError });

      break;

    case "contact-info":
      const { error: contactError } = await supabase
        .from(table)
        .update({
          last_updated: date,
          phone: body.phone_number,
          phone_time: body.phone_time,
          email: body.email,
          address: body.address,
          donation: body.donation,
        })
        .eq("id", id);

      if (contactError) console.log({ contactError });

      break;

    case "news":
      const { error: newsError } = await supabase
        .from(table)
        .update({
          last_updated: date,
          show_article: body.show_article,
          show_author: body.show_author,
          author: body.author,
          headline: body.headline,
          images: body.images,
          article: body.article,
          order: body.order,
        })
        .eq("id", id);

      if (newsError) console.log({ newsError });

      break;

    case "partners":
      const { error: partnerError } = await supabase
        .from(table)
        .update({
          last_updated: date,
          img_url: body.img_url,
          url: body.url,
          order: body.order,
          partner: body.partner,
        })
        .eq("id", id);

      if (partnerError) console.log({ partnerError });

      break;

    case "reviews":
      const { error: reviewError } = await supabase
        .from(table)
        .update({
          last_updated: date,
          show_review: body.show_review,
          reviewer: body.reviewer,
          review: body.review,
        })
        .eq("id", id);

      if (reviewError) console.log({ reviewError });

      break;

    default:
      // static pages
      const { error: staticError } = await supabase
        .from(table)
        .update({
          last_updated: date,
          show_title: body.show_title,
          title: body.title,
          text: body.text,
        })
        .eq("id", id);

      if (staticError) console.log({ staticError });
  }
};

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
