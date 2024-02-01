import getDataFromToken from "@/helpers/getDataFromToken";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request) {
  const userId = await getDataFromToken(request);
  //   console.log(userId);
  const res = await axios.get(`${process.env.BASE_URL}/api/auth/user/${userId}`);
  const user = res.data;
  //   console.log(res.data);
  return NextResponse.json(user);
}
// this api is getting data but i'm unable to fetch data on client side nextjs.
