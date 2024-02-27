import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import { getUserProfile } from "../../services/index/users";

import MainLayout from "../../components/MainLayout";
import ProfilePicture from "../../components/ProfilePicture";

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  const {
    data: profileData,
    isLoading: profileIsLoading,
    error: profileError,
  } = useQuery({
    queryFn: () => {
      return getUserProfile({ token: userState.userInfo.token });
    },
    queryKey: ["profile"],
  });

  useEffect(() => {
    if (!userState.userInfo) {
      navigate("/");
    }
  }, [navigate, userState.userInfo]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    // reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    values: {
      name: profileIsLoading ? "" : profileData.name,
      email: profileIsLoading ? "" : profileData.email,
    },
    mode: "onChange",
  });

  const submitHandler = (data) => {};

  return (
    <MainLayout>
      <section className="container mx-auto px-5 py-10">
        <div className="w-full max-w-sm mx-auto">
          <div>
            <h1 className="text-2xl font-bold text-dark-hard mb-6">Profile</h1>
            <ProfilePicture avatar={profileData?.avatar} />
          </div>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="flex flex-col mb-6 w-full h-32">
              <label
                htmlFor="name"
                className="text-[#5a7184] font-semibold block"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name", {
                  required: "Name is required.",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters.",
                  },
                })}
                placeholder="Enter name"
                className={`border-b-2 py-4 px-5 block placeholder:text-[#959ead] text-dark-hard mt-3 focus:outline-none transition duration-200  ${
                  errors.name
                    ? "border-red-500 focus:border-red-500"
                    : "border-[#5a7184] focus:border-cyan-500"
                } `}
              />
              {errors.name?.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col mb-6 w-full h-32">
              <label
                htmlFor="email"
                className="text-[#5a7184] font-semibold block"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: "Email is required.",
                  pattern: {
                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Invalid email address.",
                  },
                })}
                placeholder="Enter email"
                className={`border-b-2 py-4 px-5 block placeholder:text-[#959ead] text-dark-hard mt-3 focus:outline-none transition duration-200 ${
                  errors.email
                    ? "border-red-500 focus:border-red-500"
                    : "border-[#5a7184] focus:border-cyan-500"
                }`}
              />
              {errors.email?.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col mb-6 w-full h-32">
              <label
                htmlFor="password"
                className="text-[#5a7184] font-semibold block"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password", {
                  required: "Password is required.",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters.",
                  },
                })}
                placeholder="Enter password"
                className={`border-b-2 border-[#5a7184] py-4 px-5 block placeholder:text-[#959ead] text-dark-hard mt-3 focus:outline-none transition duration-200 focus:border-cyan-500 ${
                  errors.email
                    ? "border-red-500 focus:border-red-500"
                    : "border-[#5a7184] focus:border-cyan-500"
                }`}
              />
              {errors.password?.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password?.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={!isValid || profileIsLoading}
              // onClick={() => reset()}
              className="bg-primary text-white font-bold text-lg py-4 px-8 w-full rounded-lg mb-6 hover:bg-blue-700 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Register
            </button>
          </form>
        </div>
      </section>
    </MainLayout>
  );
};

export default ProfilePage;
