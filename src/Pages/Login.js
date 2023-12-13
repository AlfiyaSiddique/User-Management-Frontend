// Required Imports
import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"
import validate from '../validate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import axios from '../axios';

// Main Component
const Login = () => {
    const navigator = useNavigate();
    const [form, setForm] = useState({  //state to store form data
        login_id: "",
        password: ""
    });
    const [error, setError] = useState({  //state for inline validation errors
        login_id: false,
        login_idError: false,
        password: false,
        passwordError: true
    })
    const [show, setShow] = useState(false)  //state for password eye functionality
 
    // Function to handle changes on fields
    const handleChange = (e)=>{       
      const {name, value} = e.target;
    setForm((prev)=>{
       return {...prev, [name]: value}
    })
    let message = validate[name](value)
    setError((prev)=>{
        return {...prev, ...message}
    })
    }

    // Function submit data to backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        let submitable = true;
        Object.values(error).forEach((e)=>{
          if(e !== false){
           submitable = false;
           return;
          }
        })

        if(submitable){
          axios.post('/login', form)
          .then((res)=>{
            if(res.data.access_token){
              navigator('/users', {state: res.data})              
            }else{
              toast.error(res.data.error)
            }
          }).catch((e)=>{
            toast.error("Some Error Occured Please Try again later")
            console.log(e)
          })
      }else{
        toast.error("Please fill all fields with valid data.")
      }
      };


  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
  <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
    <h2 className="mb-4 text-center text-indigo-700 text-2xl font-bold md:mb-8 lg:text-3xl">Login</h2>

    <form className="mx-auto max-w-lg rounded-lg border" onSubmit={handleSubmit}>

      <div className="flex flex-col gap-4 p-4 md:p-8">
        <div>
          <label htmlFor="login_id" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Login ID</label>
          <input name="login_id" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" placeholder='Enter Login ID' onChange={handleChange}  value={form.login_id} autoComplete='false'/>
         {error.login_id && error.login_idError&& <p className='text-red-500'>{error.login_idError}</p>}
        </div>

        <div>
          <label htmlFor="password" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Password</label>
          <div className='relative'>
          <input name="password" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" placeholder='Enter Password' onChange={handleChange} type={show? "text":"password"} value={form.password} autoComplete='false'/>
          <FontAwesomeIcon icon={show? faEye:faEyeSlash} onClick={()=>setShow(!show)} className='cursor-pointer absolute bottom-3 right-3'/>
          </div>
          {error.password && error.passwordError&& <p className='text-red-500'>{error.passwordError}</p>}
        </div>

        <button className="block rounded-lg bg-indigo-700 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-indigo-500 focus-visible:ring active:bg-gray-600 md:text-base">Log in</button>
        </div>
    </form>
  </div>
</div>
  )
}

export default Login
