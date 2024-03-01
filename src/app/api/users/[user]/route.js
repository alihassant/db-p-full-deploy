import getDataFromToken from "@/helpers/getDataFromToken";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(request) {
  const userId = await getDataFromToken(request);
  //   console.log(userId);
  const res = await axios.get(
    `https://good-puce-elephant-tie.cyclic.app/api/auth/user/${userId}`
  );
  const user = res.data;
  const path = request.nextUrl.href;
  // if (path) {
  //   return NextResponse.json(user, { revalidate: true, now: Date.now() });
  // }
  // console.log(path);
  // revalidatePath(path);
  //   console.log(res.data);
  return NextResponse.json(user);
}

export async function getUserData(userId) {
  const res = await axios.get(
    `https://good-puce-elephant-tie.cyclic.app/api/auth/user/${userId}`
  );

  // console.log(res.data);

  return res.data;
}
