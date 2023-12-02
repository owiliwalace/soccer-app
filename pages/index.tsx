
import React from 'react'
import Footer from '../components/footer'
import ListingComponent from '../components/players'
import Link from 'next/link'
import AddTeamMember from '../components/addPlayer'
import Header from '../components/header'

function index() {
  return (
    <div className='main'>
      <Header/>
    <div className="container">
        <AddTeamMember/>
        <ListingComponent/>
    </div>
    <Footer/>
    <style jsx>{`
        .container {
          display: flex;

                    padding:0;
                    margin:0;
         }

     main{
      margin:0;
      padding:0;
     }

      `}</style>
    </div>
  )
}

export default index
