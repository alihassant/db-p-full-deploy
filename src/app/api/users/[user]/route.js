import getDataFromToken from "@/helpers/getDataFromToken";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(request) {
  const userId = await getDataFromToken(request);
  const token = request.cookies.get("token")?.value;
  const res = await axios.get(
    `https://tired-blue-worm.cyclic.app/api/auth/user/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  // console.log(res.status === 200);
  const user = res.data;
  return NextResponse.json(user);
}

export async function getUserData(userId) {
  const res = await axios.get(
    `https://tired-blue-worm.cyclic.app/api/auth/user/${userId}`
  );

  // console.log(res.data);

  return res.data;
}
