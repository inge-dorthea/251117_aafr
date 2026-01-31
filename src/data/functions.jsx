import { createClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";

//* function to create client
export const createSupabaseClient = () => {
  const supabaseURL = "https://tvplwgyktqgfvycpgcoi.supabase.co";
  const supabaseKEY = "sb_publishable_zoqOojEfQs8_K0jE3206GQ_Oq0oSo_A";

  const client = createClient(supabaseURL, supabaseKEY);

  return client;
}; // END createSupabaseClient

//* create client for data functions
const supabase = createSupabaseClient();

//* sign out
export const signOut = async (local) => {
  if (local == true) {
    try {
      const { error } = await supabase.auth.signOut({ scope: "local" });

      if (error) {
        console.log("Error signing out: " + error.message);
      } else {
        window.location.reload();
      }
    } catch (err) {
      console.log("Unexpected error: " + err);
    }
  } else if (local != true) {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.log("Error signing out: " + error.message);
      } else {
        window.location.reload();
      }
    } catch (err) {
      console.log("Unexpected error: " + err);
    }
  }
};

//* get data function
export const getData = (table, id) => {
  const [res, setRes] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    if (!id) {
      if (table == "static-pages" || table == "contact-info") {
        try {
          const { data, error } = await supabase
            .from(table)
            .select()
            .order("id", { ascending: true });

          if (error) {
            console.log("Error fetching data: " + error.message);
            setRes(null);
          } else {
            setRes(data);
          }
        } catch (err) {
          console.log("Unexpected error: " + err);
          setRes(null);
        }
      } else {
        try {
          const { data, error } = await supabase
            .from(table)
            .select()
            .order("order", { ascending: true });

          if (error) {
            console.log("Error fetching data: " + error);
            setRes(null);
          } else {
            setRes(data);
          }
        } catch (err) {
          console.log("Unexpected error: " + err);
          setRes(null);
        }
      }
    } else if (id) {
      try {
        const { data, error } = await supabase
          .from(table)
          .select()
          .eq("id", id);

        if (error) {
          console.log("Error fetching data: " + error);
          setRes(null);
        } else {
          setRes(data);
        }
      } catch (err) {
        console.log("Unexpected error: " + err);
        setRes(null);
      }
    }
  }; // END fetchData

  return res;
}; // END getData

//* post data function
export const postData = async ({ table, body, newImage, folder }) => {
  try {
    const { data, error } = await supabase.from(table).insert(body).select();

    if (error) {
      console.log("Error posting data: " + error);
      return null;
    } else if (newImage) {
      const image = uploadImage(newImage, folder + data[0].id, newImage.name);

      if (!image) {
        console.log("Error uploading image.");
      }

      window.location.reload();
      return { data, image };
    } else {
      const image = null;

      window.location.reload();
      return { data, image };
    }
  } catch (err) {
    console.log("Unexpected error: " + err);
    return null;
  }
}; // END postData

//* upload image function
export const uploadImage = async (file, folder, filename) => {
  try {
    const { data, error } = supabase.storage
      .from("images")
      .upload(folder + "/" + filename, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) {
      console.log("Error uploading file: " + error);
      return null;
    } else {
      return data;
    }
  } catch (err) {
    console.log("Unexpected error: " + err);
    return null;
  }
}; // END uploadImage

//* plain update data function
export const updateData = async (table, id, body) => {
  try {
    const { data, error } = await supabase
      .from(table)
      .update(body)
      .select()
      .eq("id", id);

    if (error) {
      console.log("Error updating data: " + error);
      return null;
    } else {
      return data;
    }
  } catch (err) {
    console.log("Unexpected error: " + err);
    return null;
  }
}; // END updateData

//* update data with image
export const updateWithImage = async ({
  table,
  id,
  body,
  newImage,
  oldImage,
  folder,
}) => {
  const res = await updateData(table, id, body);

  if (res == null) {
    console.log("Error with updateData-function.");
  } else if (res != null && newImage && oldImage) {
    const deletedImage = deleteImage(folder + id, oldImage);

    if (!deletedImage) {
      console.log("Error deleting old image.");
    } else {
      const image = uploadImage(newImage, folder + res[0].id, newImage.name);

      if (!image) {
        console.log("Error uploading image.");
      }

      window.location.reload();
    }
  } else if (res != null && newImage && !oldImage) {
    const image = uploadImage(newImage, folder + res[0].id, newImage.name);

    if (!image) {
      console.log("Error uploading image.");
    }

    window.location.reload();
    // return {res, image};
  } else if (res != null && !newImage) {
    window.location.reload();
  }
}; // END updateWithImage

//* delete data function
export const deleteData = async ({
  table,
  id,
  folder,
  image,
  navigate,
  path,
}) => {
  if (image && folder) {
    const deletedImage = deleteImage(folder + id, image);

    if (!deletedImage) {
      console.log("Error deleting image.");
      return null;
    } else {
      try {
        const { data, error } = await supabase
          .from(table)
          .delete()
          .eq("id", id)
          .select();

        if (error) {
          console.log("Error deleting data: " + error);
          return null;
        } else if (navigate && path) {
          navigate(path);
          return data;
        } else {
          window.location.reload();
          return data;
        }
      } catch (err) {
        console.log("Unexpected error: " + err);
        return null;
      }
    }
  } else {
    try {
      const { data, error } = await supabase
        .from(table)
        .delete()
        .eq("id", id)
        .select();

      if (error) {
        console.log("Error deleting data: " + error);
        return null;
      } else if (navigate && path) {
        navigate(path);
        return data;
      } else {
        window.location.reload();
        return data;
      }
    } catch (err) {
      console.log("Unexpected error: " + err);
      return null;
    }
  }
}; // END deleteData

//* delete image function
export const deleteImage = async (folder, fileName) => {
  try {
    const { data, error } = await supabase.storage
      .from("images")
      .remove([folder + "/" + fileName]);

    if (error) {
      console.log("Error deleting file: " + error);
      return null;
    } else {
      return data;
    }
  } catch (err) {
    console.log("Unexpected error: " + err);
    return null;
  }
}; // END deleteImage

//* get image function
export const getImage = (filepath) => {
  try {
    const { data } = supabase.storage.from("images").getPublicUrl(filepath);

    return data.publicUrl;
  } catch (err) {
    console.log("Unexpected error: " + err);
    return null;
  }
}; // END getImage
