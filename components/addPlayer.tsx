import React, { useState, useEffect } from 'react';

const AddTeamMember = () => {
  const [listings, setListings] = useState([]);
  const [newPlayer, setNewPlayer] = useState({
    name: '',
    jersey_number: '',
    position: '',
  });

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/players');
      const data = await response.json();
      setListings(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPlayer({
      ...newPlayer,
      [name]: value,
    });
  };

  const handleAddPlayer = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/players', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPlayer),
      });

      if (response.ok) {
        console.log('Player added successfully');
        // Optionally, you can reset the form or fetch the updated listings
        setNewPlayer({
          name: '',
          jersey_number: '',
          position: '',
        });
        fetchListings();
      } else {
        console.error('Error adding player:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding player:', error);
    }
  };

  return (
    <div className='add'>
      <h2>My Team</h2>

      {/* Form for adding new player */}
      <div>
        <h3>Add New Player</h3>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={newPlayer.name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Jersey Number:
          <input
            type="text"
            name="jersey_number"
            value={newPlayer.jersey_number}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Position:
          <input
            type="text"
            name="position"
            value={newPlayer.position}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button onClick={handleAddPlayer}>Add Player</button>
        
      </div>


      <style jsx>{`
      .add{
        width:500px
      }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
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

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .subtitle {
          font-size: 2rem;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default AddTeamMember;
