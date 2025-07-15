import { useEffect, useState } from "react";
import { getDrops } from "../services/api";
function DropGallery() {
  const [drops, setDrops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDrops().then((data) => {
      setDrops(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading drops...</p>;
  if (!drops.length) return <p>No drops yet</p>;

  return (
    <div className="drop-gallery">
      {drops.map((drop) => (
        <div key={drop.id} className="drop-item">
          <img src={`data:image/png;base64,${drop.imageData}`} />
          <p>📍 {drop.latitude.toFixed(4)}, {drop.longitude.toFixed(4)}</p>
          <p>🕒 {new Date(drop.timeStamp).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}

export default DropGallery;
