import axios from "axios";

export const revalidate = true;

export default async function getData(path) {
  const response = await axios.get(
    `http://localhost:8080/api/user/getDatabase/${path}`
  );
  return response.data;
  // res.status(200).json(data);
}
