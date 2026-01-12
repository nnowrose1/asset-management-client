import React from "react";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import Logo from "./Logo";
import { Link } from "react-router";
import { FaXTwitter } from "react-icons/fa6";
import useRole from '../customHooks/useRole'

const Footer = () => {
  const {role} = useRole();
  return (
    <footer className="bg-gray-800 text-gray-300 pt-12 mb-6 mt-10">

      {/* Main Footer Grid */}
      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <Link to='/'><Logo></Logo></Link>
          
          <p className="mt-3 text-sm text-gray-400 leading-6">
            A smart and efficient HR & Asset Management platform for modern businesses.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white">Contact</h3>
          <ul className="mt-3 space-y-1 text-sm">
            <li>Email: support@assetnexus.com</li>
            <li>Phone: +8801234-567891</li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href="/dashboard" className="hover:text-white">Dashboard</a></li>
            {
              role === 'employee' ? 
              <li><a href="/dashboard/myAssets" className="hover:text-white">My Assets</a></li>
              :
              <li><a href="/dashboard/assetList" className="hover:text-white">My Assets</a></li>
            }
            
            <li><a href="/employeeRegister" className="hover:text-white">Join as Employee</a></li>
            <li><a href="/hrRegister" className="hover:text-white">Join as HR Manager</a></li>
          </ul>
        </div>

        {/* Social Icons */}
        <div>
          <h3 className="text-lg font-semibold text-white">Follow Us</h3>
          <div className="flex space-x-4 mt-4 text-xl">
            <a href="#" className="hover:text-white"><FaFacebookF /></a>
            <a href="#" className="hover:text-white"><FaLinkedinIn /></a>
            <a href="#" className="hover:text-white"><FaXTwitter /></a>
          </div>
        </div>

      </div>

      {/* Bottom Copyright */}
      <div className="text-center bg-gray-900 py-6 text-sm text-gray-400 mt-10 border-t border-gray-700 ">
        © {new Date().getFullYear()} AssetNexus — All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;


