import React from 'react'
import {Link} from 'react-router-dom'

export default function AdminNav() {
  return (
    <nav className="flex gap-3">
            <Link to="/admin/profile" className="hover:text-gray-500 hover:cursor-pointer font-bold uppercase text-gray-800">Edit profile</Link>
            <Link to="/admin/change-password" className="hover:text-gray-500 hover:cursor-pointer font-bold uppercase text-gray-800">Change password</Link>
    </nav>
  )
}