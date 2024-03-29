import { NextApiRequest, NextApiResponse } from 'next';

export default function logout(req: NextApiRequest, res: NextApiResponse) {
  if (req.cookies?.session === 'invalid') {
    res.status(400);
    res.json({ message: 'You are not logged in!' });
  } else {
    res.setHeader('Set-Cookie', 'session=invalid; Path=/');
    res.status(200);
    res.json({ message: 'Logged out' });
  }
}
