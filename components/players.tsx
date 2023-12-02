import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import Modal from 'react-modal'; // Import the modal library

import 'chart.js/auto';

const ListingComponent = () => {
  const [listings, setListings] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    match: 0,
    red: 0,
    yellow: 0,
  });

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/players');
        const data = await response.json();
        setListings(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchListings();
  }, []);

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
    setFormData({
      match: player.match,
      red: player.red,
      yellow: player.yellow,
    });
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = () => {
    // Implement your logic to update the data in the database
    // You can use selectedPlayer._id and formData values
    console.log('Updating data:', selectedPlayer._id, formData);
    setIsModalOpen(false);
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  const pieChartData = {
    labels: ['Matches', 'Red Cards', 'Yellow Cards'],
    datasets: [
      {
        data: [formData.match, formData.red, formData.yellow],
        backgroundColor: ['#0070f3', 'red', 'yellow'],
        hoverBackgroundColor: ['#005cb2', '#cc0000', '#b28f00'],
      },
    ],
  };

  return (
    <div className='container'>
      <h2>Team Statistics</h2>
      <div className="team">
        <ul>
          {listings.map((listing) => (
            <ol key={listing._id} className='list' onClick={() => handlePlayerClick(listing)}>
              <div className='names'>
                <p>Name: {listing.name}</p>
                <p>Jersey number: {listing.jersey_number}</p>
                <p>Position: {listing.position}</p>
                <p>Matches played: {listing.match}</p>
                <p>Goals Scored: {listing.score}</p>
                <p>Yellow cards: {listing.yellow}</p>
              </div>
              <div className="pin">
                <h3>Statistics</h3>
                <Pie data={pieChartData} options={pieChartOptions} className='chart' />
              </div>
            </ol>
          ))}
        </ul>
      </div>

      {/* Modal for updating data */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        contentLabel="Update Data Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Update Player Data</h2>
        <form onSubmit={handleFormSubmit}>
          <label>
            Matches:
            <input
              type="number"
              value={formData.match}
              onChange={(e) => setFormData({ ...formData, match: parseInt(e.target.value, 10) })}
            />
          </label>
          <label>
            Red Cards:
            <input
              type="number"
              value={formData.red}
              onChange={(e) => setFormData({ ...formData, red: parseInt(e.target.value, 10) })}
            />
          </label>
          <label>
            Yellow Cards:
            <input
              type="number"
              value={formData.yellow}
              onChange={(e) => setFormData({ ...formData, yellow: parseInt(e.target.value, 10) })}
            />
          </label>
          <button type="submit">Update</button>
        </form>
        <button onClick={handleModalClose}>Close</button>
      </Modal>

      <style jsx>{`
        .team {
          max-width: 100%;
        }
        .list {
          border:5px;
          margin-top: 2px;
          padding-top: 2px;
          padding-bottom: 2px;
          display: flex;
        }
        .container {
          width: 100%;
        }
        .pin {
          width: 500px;
                  color: white;
          padding: 10px;
          margin-top: 10px;
          height:700px;
        }
        .chart{
          height:400px;
        }
        .names {
          width: 500px;
        }
        .modal {
          height:1500px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: white;
          padding: 20px;
        }

        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  );
};

export default ListingComponent;
