"use client";

import InputField from "@/components/InputField";
import Link from "next/link";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const { email, password } = userInfo;

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target;

    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    // Handle form submission logic here
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false, // for preventing default redirect and also to render error message coming from our backend
    });

    if (res?.error) return setError(res.error);
    router.replace("/profile");
    console.log(res);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form className="w-1/3" onSubmit={handleSubmit}>
        {error ? (
          <div className="mb-4">ERRORRRRR !!!!!!!!!!!!!!!!!!!!</div>
        ) : null}
        <InputField
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
        />

        <InputField
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        />

        <button
          className="w-full py-2 mt-4 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600"
          type="submit"
          disabled={isLoading}
          style={{ opacity: isLoading ? 0.5 : 1 }}
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
