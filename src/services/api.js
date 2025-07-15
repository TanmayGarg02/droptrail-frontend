const BASE_URL = "https://droptrail-backend.onrender.com";

export async function uploadDrop(data) {
  return fetch(`${BASE_URL}/api/drops`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function getDrops() {
  const res = await fetch(`${BASE_URL}/api/drops`);
  return res.json();
}
