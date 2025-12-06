import React from 'react';
import logo from '../assets/logo1.jpg'

const Logo = () => {
    return (
        <div className='flex items-center gap-1'>
            <img className='h-12 w-12 rounded-full' src={logo} alt="logo" />
            <h3 className="text-xl font-semibold text-white">AssetNexus</h3>
            
        </div>
    );
};

export default Logo;