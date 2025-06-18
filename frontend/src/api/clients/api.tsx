const API_URL = "http://localhost:5000";

export async function fetchClients() {
  const token = localStorage.getItem("authToken");
  const response = await fetch(`${API_URL}/clients`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status}`);
  }
  return await response.json();
}
