import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import AboutPage from '../Components/AboutPage'

function About() {
    return (
        <>
            <Navbar />
            <div className='min-h-screen'>
                <AboutPage />
            </div>
            <Footer />
        </>
    )
}

export default About
