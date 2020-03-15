const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(morgan("common"));

function toRadians(deg) {
  return deg * (Math.PI / 180);
}

function toDegrees(rad) {
  return rad * (180 / Math.PI);
}

app.get("/midpoint", (req, res) => {
  const { lat1, lon1, lat2, lon2 } = req.query;

  // for brevity the validation is skipped

  // convert to radians
  const rlat1 = toRadians(lat1);
  const rlon1 = toRadians(lon1);
  const rlat2 = toRadians(lat2);
  const rlon2 = toRadians(lon2);

  const bx = Math.cos(rlat2) * Math.cos(rlon2 - rlon1);
  const by = Math.cos(rlat2) * Math.sin(rlon2 - rlon1);

  const midLat = Math.atan2(
    Math.sin(rlat1) + Math.sin(rlat2),
    Math.sqrt((Math.cos(rlat1) + bx) * (Math.cos(rlat1) + bx) + by * by)
  );
  const midLon = rlon1 + Math.atan2(by, Math.cos(rlat1) + bx);

  res.json({
    lat: toDegrees(midLat),
    lon: toDegrees(midLon)
  });
});

module.exports = app;
