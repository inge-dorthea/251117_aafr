//* imports
import {  useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { createSupabaseClient } from "../../data/functions";

//* component
const Login = () => {

  const supabase = createSupabaseClient();

  const [loginFail, setLoginFail] = useState(null);

  //* ready the hooks
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //* onSubmit
  const onSubmit = async (data) => { // handleSubmit (useForm) takes the form data and serves it to onSubmit()
    const { email, password } = data;

    // sign in with email and password
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });


    if (error) { // if there's an error, it will log it
      console.error("Sign in error:", error.message);
      setLoginFail(error.message);
    } else { // if there's no error the user will be sent to the admin page
      navigate("/admin");
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <form
        className="flex w-1/3 flex-col items-center justify-center gap-4 rounded-3xl border-4 px-10 py-5"
        onSubmit={handleSubmit(onSubmit)} // handleSubmit (useForm) takes the form data and serves it to onSubmit()
      >
        <div className="flex w-full items-center justify-between">
          <label>E-mail:</label>
          <input
            type="email"
            className="ml-3 rounded-sm border px-3 py-1"
            placeholder="E-mail"
            {...register("email", { required: "Skriv din e-mail" })}
          />
        </div>
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}

        <div className="flex w-full items-center justify-between">
          <label>Kode:</label>
          <input
            type="password"
            className="ml-3 rounded-sm border px-3 py-1"
            placeholder="•••••••••••••••••••••••"
            {...register("password", {
              required: "Skriv den rigtige kode",
              minLength: {
                value: 6,
                message: "Skriv en kode på mindst 6 karakterer",
              },
            })}
          />
        </div>
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
        {loginFail && (
          <div>
          <p className="text-red-500 text-center">Login mislykkedes.</p>
          <p className="text-sm text-center">{loginFail}</p>
          </div>
        )}

        <input
          type="submit"
          value="Login"
          className="cursor-pointer rounded-lg bg-blue-800 px-8 py-2 text-white"
        />
        <div className="flex flex-row gap-3">
          
          <Link to={"/"} className="text-blue-800 underline">
            Tilbage til hjemmesiden
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login