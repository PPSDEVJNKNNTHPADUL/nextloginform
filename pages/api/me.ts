import { NextApiRequest, NextApiResponse } from "next";

export default function me(req: NextApiRequest, res: NextApiResponse) {
if (!req.cookies.session || req.cookies.session === "invalid") {
res.status(401);
res.json({ message: "Not logged in!" });
} else {
res.status(200);
res.json({ id: req.cookies.session });
}
}