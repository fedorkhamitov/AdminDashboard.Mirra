const API_URL = "http://localhost:5000";

export async function fetchPayments() {
  const token = localStorage.getItem("authToken");
  const response = await fetch(`${API_URL}/payments`, {
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
