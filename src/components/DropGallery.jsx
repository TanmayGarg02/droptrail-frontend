import { useEffect, useState } from 'react';
import { getAllDrops } from '../services/api';

export default function DropGallery() {
  const [drops, setDrops] = useState([]);

  useEffect(() => {
    const fetchDrops = async () => {
      try {
        const res = await getAllDrops();
        setDrops(res.data);
      } catch (err) {
        console.error('Failed to fetch drops', err);
      }
    };
    fetchDrops();
  }, []);

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>🖼️ Previous Drops</h2>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        justifyContent: 'center'
      }}>
        {drops.map(drop => (
          <div key={drop.id} style={{
            border: '1px solid #ccc',
            borderRadius: '6px',
            padding: '10px',
            background: '#fff',
            width: '150px'
          }}>
            <img src={drop.imageData} alt="drop" width="100%" />
            <p style={{ fontSize: '12px' }}>
              📍 {drop.latitude.toFixed(2)}, {drop.longitude.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
