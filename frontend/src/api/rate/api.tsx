const API_URL = "http://localhost:5000";

export async function fetchRate() {
  const token = localStorage.getItem("authToken");
  const response = await fetch(`${API_URL}/rate`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status}`);
  }
  const data = await response.json();
  return { rate: data };
}

export async function updateRate(data: { rate: number; }) {
  const token = localStorage.getItem("authToken");
  const response = await fetch(`${API_URL}/rate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Error by rate update");
  return response
}
