import connect from '@/lib/mongodb';
import CarpoolPost from '@/model/Posting';
import User from '@/model/User';
import { auth } from '@/app/auth';
import { NextResponse } from 'next/server';
export async function GET(req: Request ,{ params }: { params: { id: string } }) {
  await connect();
  const slug = params.id

    try {
      const user = await User.findById(slug);
      if (!user) {
        return new NextResponse(JSON.stringify({ error:"User not found"}), {
            status: 404
          });
      }

      return new NextResponse(JSON.stringify({ username:user.username, email:user.email, id:user._id }),{
        status:200,
    })

    } catch (error: any) {
        return new NextResponse(JSON.stringify({error: error.toString()}), {
            status: 500
          });
    }
  }