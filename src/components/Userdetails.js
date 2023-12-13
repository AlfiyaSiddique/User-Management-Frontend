import React, { useEffect, useState } from "react";
import validate from "../validate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "../axios";
import { toast } from "react-toastify";

const Userdetails = ({ setShowForm, showForm, type, token, setRender }) => {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    street: "",
    address: "",
    city: "",
    state: "",
    email: "",
    phone: "",
  });
useEffect(()=>{
  if(type !== "create"){
    setForm(()=>{
     return { first_name: type.first_name,
      last_name: type.last_name,
      street: type.street,
      address: type.address,
      city: type.city,
      state: type.state,
      email: type.email,
      phone: type.phone,}
    })
  }
}, [type])
  

  const [error, setError] = useState({
    first_name: false,
    first_nameError: false,
    last_name: false,
    last_nameError: false,
    address: false,
    addressError: false,
    street: false,
    streetError: false,
    city: false,
    cityError: false,
    state: false,
    stateError: false,
    email: false,
    emailError: false,
    phone: false,
    phoneError: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const require = ["email", "city", "street", "state"];

    setForm((prev) => {
      return { ...prev, [name]: value };
    });
    let error;
    if (require.includes(name)) {
      error = validate.require(value, name);
    } else {
      error = validate[name](value);
    }
    setError((prev) => {
      return { ...prev, ...error };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let submitable = true;
    Object.values(error).forEach((e) => {
      if (e !== false) {
        submitable = false;
        return;
      }
    });

    if (submitable) {
      const url = (type === "create") ? "/createuser": "/updateuser"
      let data = {
        token,
        form,
      };

      if(type !== "create"){
        data.uuid = type.uuid
      }
      axios
        .post(url, data)
        .then((res) => {
          if (!res.data.error) {
            setShowForm(!showForm);
            toast.success(type==="create"? "Customer Created Successfully": "Customer Updated Successfully");
            setForm({
              first_name: "",
              last_name: "",
              street: "",
              address: "",
              city: "",
              state: "",
              email: "",
              phone: "",
            });
            setRender((prev)=>prev+1)
          } else {
            toast.error(res.data.error);
          }
        })
        .catch((e) => {
          toast.error("Some Error Occured Please Try again later");
          console.log(e);
        });
    } else {
      toast.error("Please fill all fields with valid data.");
    }
  };

  return (
    <div className="w-full h-screen fixed top-0">
      <div className="absolute top-0 bg-black w-full h-screen opacity-60"></div>
      <div
        className="p-4 m-auto w-[50vw] bg-white absolute top-8 left-[25%] rounded-lg"
        style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
      >
        <FontAwesomeIcon
          icon={faTimes}
          className="text-red-500 absolute top-6 right-6 cursor-pointer"
          onClick={() => setShowForm(!showForm)}
        />
        <div className="flex flex-col text-center w-full mb-4">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            User Data
          </h1>
        </div>
        <div className="px-3 mx-auto">
          <div className="flex flex-wrap -m-2">
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  for="first_name"
                  className="leading-7 text-sm text-gray-600"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  value={form.first_name}
                  onChange={handleChange}
                />
              </div>
              {error.first_name && error.first_nameError && (
                <p className="text-red-500">{error.first_nameError}</p>
              )}
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  for="last_name"
                  className="leading-7 text-sm text-gray-600"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  value={form.last_name}
                  onChange={handleChange}
                />
              </div>
              {error.last_name && error.last_nameError && (
                <p className="text-red-500">{error.last_nameError}</p>
              )}
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  for="address"
                  className="leading-7 text-sm text-gray-600"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  value={form.address}
                  onChange={handleChange}
                />
              </div>
              {error.address && error.addressError && (
                <p className="text-red-500">{error.addressError}</p>
              )}
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label for="street" className="leading-7 text-sm text-gray-600">
                  Street
                </label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  value={form.street}
                  onChange={handleChange}
                />
              </div>
              {error.street && error.streetError && (
                <p className="text-red-500">{error.streetError}</p>
              )}
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label for="city" className="leading-7 text-sm text-gray-600">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  value={form.city}
                  onChange={handleChange}
                />
              </div>
              {error.city && error.cityError && (
                <p className="text-red-500">{error.cityError}</p>
              )}
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label for="state" className="leading-7 text-sm text-gray-600">
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  value={form.state}
                  onChange={handleChange}
                />
              </div>
              {error.state && error.stateError && (
                <p className="text-red-500">{error.stateError}</p>
              )}
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label for="email" className="leading-7 text-sm text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              {error.email && error.emailError && (
                <p className="text-red-500">{error.emailError}</p>
              )}
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label for="phone" className="leading-7 text-sm text-gray-600">
                  Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>
              {error.phone && error.phoneError && (
                <p className="text-red-500">{error.phoneError}</p>
              )}
            </div>

            <div className="p-2 w-full">
              <button
                className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                onClick={handleSubmit}
              >
                {type === "create" ? "Add" : "Update"} Customer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userdetails;
