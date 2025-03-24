import axios from "axios";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const uri = process.env.NEXT_PUBLIC_BACKEND_URL;

const Axios = axios.create({
  baseURL: uri,
  // headers: {
  //   "Content-Type": "application/json", // Set the content type header
  //   Accept: "application/json", // Set the accept header
  //   // Add any other headers you need here
  // },
});

// If you need to add headers dynamically
Axios.interceptors.request.use(
  async (config) => {
    // Retrieve the session token from NextAuth
    const session = await getServerSession(authOptions);
    if (session && session.access_token !== null) {
      // Add the token to the headers
      config.headers["Authorization"] = `Bearer ${session.access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default Axios;
