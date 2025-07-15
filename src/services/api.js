const BASE_URL = "https://droptrail-backend.onrender.com";

export async function uploadDrop(data) {
  try {
    const res = await fetch(`${BASE_URL}/api/drops`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Failed to upload drop");
    return await res.json();
  } catch (err) {
    console.error("Upload error:", err);
    return null;
  }
}

export async function getDrops() {
  try {
    const res = await fetch(`${BASE_URL}/api/drops`);
    if (!res.ok) throw new Error("Failed to fetch drops");

    const data = await res.json();

    // Return array or empty array if data is invalid
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Fetch error:", err);
    return [];
  }
}
