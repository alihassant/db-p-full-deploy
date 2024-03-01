import axios from "axios";
import { revalidatePath } from "next/cache";

export default async function POST(req, res) {
  try {
    const { db } = req.body; // assuming the request body contains the "db" object

    const url = `http://localhost:8080/api/db/createDatabase`;
    const payload = { ...db };

    // Perform necessary operations with the payload
    // ...

    const response = await axios.post(url, payload);

    revalidatePath("/dashboard"); // Revalidate the dashboard page (or any other page as per your requirement)

    // Send the response back to the client
    res.status(200).json({ message: response.data.message });
  } catch (err) {
    // Handle error if any
    res.status(500).json({ message: err.response.data.message });
  }
}
