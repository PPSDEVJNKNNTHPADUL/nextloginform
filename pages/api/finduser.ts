import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { username } = req.body;
    const { password } = req.body;

    try {
      const response = await axios.get(
        'https://63e1d7b34324b12d963f6754.mockapi.io/test/',
      );
      const users = response.data;
      const existingUser = users.find(
        (user: { id:number;username:string;password:string }) => 
          user.username === username && user.password === password,
      );

      if (!existingUser) {
        res
          .status(401)
          .json({
            message: 'Username and password do not match any existing user.',
          });
        return;
      }

      res.status(200).json({ message: 'Success', id: existingUser.id });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong on the server.' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
  }
};

export default handler;
