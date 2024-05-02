import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "./app/utils/supabase/server";

const isUserAuthenticated = async() => {
  const supabase = createClient();
  const user = await supabase.auth.getSession();
  return user.data.session ? true : false;
}

export default async function middleware(req: NextRequest) {
  const isAuthenticated = await isUserAuthenticated()
  const BASE_URL = req.nextUrl.origin

  if(!isAuthenticated && req.url.includes('dashboard')) {
    return NextResponse.redirect(BASE_URL + '/sign-in')
  }

  if(isAuthenticated && req.url.includes('sign-')) {
    return NextResponse.redirect(BASE_URL + '/dashboard')
  }
}

export const config = {
  matcher: ['/dashboard/:path*','/sign-in','/sign-up'],
}