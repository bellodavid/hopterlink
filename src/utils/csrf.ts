// utils/csrf.js

import axios from "axios";

export async function getCsrfToken() {
  try {
    const response = await axios.get(
      `${process.env.NEXTAUTH_BACKEND_GOOGLE_URL}csrf/`,
      { withCredentials: true }
    );
    return response.data.csrfToken;
  } catch (error) {
    console.error("Error fetching CSRF token:", error);
    return null;
  }
}
