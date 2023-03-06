import { NextResponse } from "next/server";

export default function Middleware(req: NextResponse) {
  let verify = req.cookies.get("session");
  let url = req.url;


  if (!verify && url.includes(`http://localhost:3000/profile/${verify}`)) {
    return NextResponse.redirect("http://localhost:3000/Auth");
  }

  if (verify && url === "http://localhost:3000/Auth") {
    return NextResponse.redirect(`http://localhost:3000/profile/${verify}`);
  }
  if (verify && url === "http://localhost:3000/Registration") {
    return NextResponse.redirect(`http://localhost:3000/profile/${verify}`);
  }
}
