import Header from '../components/Header'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import React from 'react';

function Layout({children, showHero = false}) {
  return (
    <div className='flex flex-col min-h-screen'>
        <Header />
        {showHero && <Hero />}
        <div className='container mx-auto flex-1 py-10'>{children}</div>
        <Footer />
    </div>
  )
}

Layout.propTypes = {}
export default Layout