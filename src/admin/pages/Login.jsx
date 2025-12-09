//! gotta look at this and understand


import { createClient } from "@supabase/supabase-js";

import {  useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

import { useState, useEffect } from "react";
const supabaseUrl = "https://rnleiofyyckqxppsfkyi.supabase.co";
const supabaseKey = import.meta.env.VITE_API_BASE_URL;
const supabase = createClient(supabaseUrl, supabaseKey);

const Login = () => {

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error("Sign up error:", error.message);
    } else {
      navigate("/admin/raadgiverne");
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <form
        className="flex w-1/3 flex-col items-center justify-center gap-4 rounded-3xl border-4 px-10 py-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex w-full items-center justify-between">
          <label>Email:</label>
          <input
            type="email"
            className="ml-3 rounded-sm border px-3 py-1"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
          />
        </div>
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}

        <div className="flex w-full items-center justify-between">
          <label>Password:</label>
          <input
            type="password"
            className="ml-3 rounded-sm border px-3 py-1"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
        </div>
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}

        <input
          type="submit"
          value="Login"
          className="cursor-pointer rounded-lg bg-blue-800 px-8 py-2 text-white"
        />
        <div className="flex flex-row gap-3">
          <p className="">don't have an account</p>
          <Link to={"/register"} className="text-blue-800 underline">
            register
          </Link>
          <Link to={"/"} className="text-blue-800 underline">
            back
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login