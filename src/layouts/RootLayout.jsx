import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router';
import { Toaster } from 'react-hot-toast';

const RootLayout = () => {
    return (
        <div className='max-w-7xl mx-auto bg-gray-50'>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>

            <Toaster></Toaster>
        </div>
    );
};

export default RootLayout;