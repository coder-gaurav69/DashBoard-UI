import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const markerIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = markerIcon;

const MapPanel = () => {
  const point = [51.505, -0.09];

  return (
    <div className="panel-container">
      <h3 className="text-lg font-semibold mb-4 text-gray-200">Global Activity</h3>
      <div className="h-52 sm:h-64 rounded overflow-hidden border border-gray-700">
        <MapContainer center={point} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={point}>
            <Popup>
              Sample activity location.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default MapPanel;
