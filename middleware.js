import { NextResponse } from 'next/server';

const protectedRoutes = ['/attendance'];

export function middleware(req) {
  const url = req.nextUrl.clone();
  const token = req.cookies.get('token')?.value;

  if (protectedRoutes.includes(url.pathname)) {
    if (!token) {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
