import React from 'react'

function Header() {
  return (
    <>
    <div className="head">

    <div>
      Manchester United
    </div>
   
    </div>
    <style jsx>{`
        .head {
                    width:100%;
          height:50px;
          display:flex;
          color:white;
          background:black;
          font-weight:bold;
          justify-items:flex-end;
          border:2px;
        }
      
      `}</style>
    </>
  )
}

export default Header
