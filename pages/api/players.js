import clientPromise from '../../lib/mongodb';

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db('soccer');

    if (req.method === 'GET') {
      const players = await db
        .collection('my_team')
        .find({})
        .sort({ metacritic: -1 })
        .limit(10)
        .toArray();

      res.json(players);
    } else if (req.method === 'POST') {
      const newPlayer = req.body; // Assuming you're sending JSON data in the request body

      // Validate newPlayer data here if needed

      // Insert the new player into the database
      const result = await db.collection('my_team').insertOne(newPlayer);

      if (result.insertedCount === 1) {
        res.status(201).json({ message: 'Player added successfully' });
      } else {
        res.status(500).json({ message: 'Error adding player to the database' });
      }
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
