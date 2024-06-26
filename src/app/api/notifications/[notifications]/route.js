import getDataFromToken from "@/helpers/getDataFromToken";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(request) {
  const userId = await getDataFromToken(request);
  //   console.log(userId);
  const res = await axios.get(
    `https://tired-blue-worm.cyclic.app/api/auth/user/${userId}`
  );
  const user = res.data;
  const path = request.nextUrl.href;
  return NextResponse.json(user);
}
