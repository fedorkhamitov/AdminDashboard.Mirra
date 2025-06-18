const API_URL = "http://localhost:5000";

export async function login(data: { email: string; password: string }) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      'accept': "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response
}
