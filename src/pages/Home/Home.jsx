import React from 'react';
import About from './About';
import Features from './Features';
import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials';
import Packages from './Packages';
import Banner from './Banner';
import Benefits from './Benefits';
import CallToAction from './CallToAction';
import Integrations from './Integrations';
import Statistics from './Statistics';


const Home = () => {
    return (
        <div>
            {/* <About></About> */}
            <Banner></Banner>

            <Features></Features>

            <HowItWorks></HowItWorks>

            <Benefits></Benefits>

            <Statistics></Statistics>

            <Integrations></Integrations>

            <Packages></Packages>

            <Testimonials></Testimonials>

            <CallToAction></CallToAction>
        </div>
    );
};

export default Home;