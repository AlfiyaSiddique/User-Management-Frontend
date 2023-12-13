import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faSignOut, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import axios from "../axios";
import Userdetaile from "../components/Userdetails";
import {useNavigate} from "react-router-dom"

const Users = () => {
  const navigator = useNavigate();
  let access_token = useLocation().state.access_token;
  const [users, setUsers] = useState([]);
  const [showform, setShowForm] = useState(false)
  const [type, setType] = useState("");
  const[render, setRender] = useState(0);

  useEffect(() => {
    axios
      .post("/getusers", { token: access_token })
      .then((res) => {
        if (!res.data.error) {
          console.log(res.data)
          setUsers(res.data);
        } else {
          toast.error(res.data.error);
        }
      })
      .catch((e) => {
        toast.error("Some Error Occured Please Try again later");
        console.log(e);
      });
  }, [access_token, render]);


  const deleteUser = (user)=>{
    const confirm = window.confirm("Do you want to delete the user?")
    if(confirm){
      const data = {
        token: access_token,
        uuid: user.uuid
      }
      axios
      .post("/deleteuser", data)
      .then((res) => {
        if (!res.data.error) {
          toast.success("Customer Deleted Successfully")
          setRender((prev)=>prev+1)
        } else {
          toast.error(res.data.error);
        }
      })
      .catch((e) => {
        toast.error("Some Error Occured Please Try again later");
        console.log(e);
      });
    }
  }
  
  return (
    <section className="text-grey-600 body-font relative">
  <div className="container p-5 mx-auto">
  <header class="body-font">
  <div class="container mx-auto flex justify-between flex-wrap px-5 py-2 flex-col md:flex-row items-center">
    <h1 className="text-indigo-600 font-extrabold">Customer List</h1>
    <button class="inline-flex text-white items-center bg-indigo-500 border-0 py-1 px-3 focus:outline-none hover:bg-indigo-400 rounded text-base mt-4 md:mt-0" onClick={()=>{setShowForm(!showform); setType("create")}}>Add Customer
     <FontAwesomeIcon icon={faUser} className="mx-3"/>
    </button>
    <button class="inline-flex text-white items-center bg-red-500 border-0 py-1 px-3 focus:outline-none hover:bg-red-400 rounded text-base mt-4 md:mt-0" onClick={()=>{
      access_token = null;
     navigator("/")
    }}>Log Out
     <FontAwesomeIcon icon={faSignOut} className="mx-3"/>
    </button>
  </div>
</header>
        <div className="mx-4 w-full overflow-auto">
          <table className="table-auto w-full text-left whitespace-no-wrap">
            <thead>
              <tr>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                  First Name
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Last Name
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Address
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Street
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  City
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  State
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Email
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Phone
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Action
                </th>
                <th className="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr>
                    <td className="px-4 py-3">{user.first_name}</td>
                    <td className="px-4 py-3">{user.last_name}</td>
                    <td className="px-4 py-3">{user.address}</td>
                    <td className="px-4 py-3">{user.street}</td>
                    <td className="px-4 py-3 text-lg text-gray-900">{user.city}</td>
                    <td className="px-4 py-3 text-lg">{user.state}</td>
                    <td className="px-4 py-3 text-lg">{user.email}</td>
                    <td className="px-4 py-3 text-lg">{user.phone}</td>
                    <td className="px-4 py-3 text-lg flex">
                      <FontAwesomeIcon
                        icon={faPen}
                        className=" mx-2 text-blue-500 cursor-pointer"
                        onClick={(e)=>{
                          setShowForm(!showform)
                          setType(user)
                        }}
                      />
                      <FontAwesomeIcon
                        icon={faTrash}
                        className=" mx-2 text-red-500 cursor-pointer"
                        onClick={()=>deleteUser(user)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      
     {showform? <Userdetaile setShowForm={setShowForm} showForm={showform} type={type} token={access_token} setRender={setRender}/>: null}
    </section>
  );
};

export default Users;
