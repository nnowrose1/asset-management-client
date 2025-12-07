import React from 'react';
import About from './About';
import Features from './Features';
import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials';
import Packages from './Packages';

const Home = () => {
    return (
        <div>
            {/* <About></About> */}

            <Features></Features>

            <HowItWorks></HowItWorks>

            <Packages></Packages>

            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;