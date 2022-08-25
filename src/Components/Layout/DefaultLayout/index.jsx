import React, { Children } from 'react'
import Header from './Header'
import Footer from './Footer'

const DefaultLayout = ({children}) => {
  return (
    <div>
      <Header/>
        {children}
      <Footer/>
    </div>
  )
}

export default DefaultLayout