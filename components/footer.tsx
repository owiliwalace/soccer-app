import React from 'react'

function Footer() {
  return (
    <div>
    <div>
      <footer>

      ©Soccer .Inc.
      </footer>
    </div>
    <style jsx>{`

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
          position:relative;
          z-index:300px;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

      `}</style>
    </div>
  )
}

export default Footer
