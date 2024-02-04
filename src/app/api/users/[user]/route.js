import getDataFromToken from "@/helpers/getDataFromToken";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request) {
  const userId = await getDataFromToken(request);
  //   console.log(userId);
  const res = await axios.get(
    `https://good-puce-elephant-tie.cyclic.app/api/auth/user/${userId}`
  );
  const user = res.data;
  //   console.log(res.data);
  return NextResponse.json(user);
}
