import { useEffect, useState } from 'react';
import CanvasDraw from './CanvasDraw';
import { uploadDrop } from '../services/api';

export default function DropForm() {
  const [dropImage, setDropImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [status, setStatus] = useState("");
  const [networkType, setNetworkType] = useState('');

  useEffect(() => {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
      setNetworkType(connection.effectiveType);
    } else {
      setNetworkType('Unknown');
    }
  }, []);

  const handleCanvasExport = (dataUrl) => {
    setDropImage(dataUrl);
    fetchLocationAndSubmit(dataUrl);
  };

  const fetchLocationAndSubmit = (imageData) => {
    if (!navigator.geolocation) {
      setStatus("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });

        const drop = { imageData, latitude, longitude };

        const connection = navigator.connection;
        const isOnline = navigator.onLine;

        if (!isOnline || (connection && connection.effectiveType.includes("2g"))) {
          localStorage.setItem("unsyncedDrop", JSON.stringify(drop));
          setStatus("Saved locally (offline or slow connection)");
        } else {
          try {
            await uploadDrop(drop);
            setStatus("Drop uploaded successfully");
          } catch (err) {
            setStatus("Upload failed. Saved locally.");
            localStorage.setItem("unsyncedDrop", JSON.stringify(drop));
          }
        }
      },
      (error) => setStatus("Location access denied")
    );
  };

  return (
    <div>
      <h2>Draw and Save a Drop</h2>
      <CanvasDraw onExport={handleCanvasExport} />
      <p>Status: {status}</p>
      <p>Network Type: {networkType}</p>
    </div>
  );
}
