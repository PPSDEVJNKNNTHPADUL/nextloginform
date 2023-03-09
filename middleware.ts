import { NextResponse } from "next/server";

export default function Middleware(req: NextResponse) {
  let verify = req.cookies.get("isLogin");
  let id = req.cookies.get("session");
  let url = req.url;


  if (!verify && url.includes(`/profile/${id}`)) {
    return NextResponse.rewrite(new URL('/auth', req.url))
  }

  if (verify && url === "/auth") {
    return NextResponse.rewrite(new URL(`/profile/${id}`, req.url))
  }
  if (verify && url === "/registration") {
    return NextResponse.rewrite(new URL(`/profile/${id}`, req.url))
  }
}
