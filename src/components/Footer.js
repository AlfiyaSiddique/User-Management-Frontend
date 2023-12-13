import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
<footer class="text-gray-600 body-font">
  <div class="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
    <span class="flex title-font font-medium items-center md:justify-start justify-center text-indigo-700">
      <span class="ml-3 text-xl">Developed By Alfiya Siddique</span>
    </span>
    <p class="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© {new Date().getFullYear()}
    </p>
    <span class="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
      <Link to="https://github.com/AlfiyaSiddique/User-Management-Frontend" className='text-3xl'>
         <FontAwesomeIcon icon={faGithub} className='text-indigo-700'/>
      </Link>
    </span>
  </div>
</footer>
  )
}

export default Footer
