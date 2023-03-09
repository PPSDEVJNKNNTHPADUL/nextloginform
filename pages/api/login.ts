import { NextApiRequest, NextApiResponse } from "next";

export default function login(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.body;
  if (!userId) {
    res.status(401);
    res.json({ message: "Invalid user" });
  } else {
    res.setHeader("Set-Cookie", `session=${userId}; Path=/`);
    res.status(201);
    res.json({ message: "Logged in" });
  }
}