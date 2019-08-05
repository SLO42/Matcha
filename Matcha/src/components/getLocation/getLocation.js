import http from "./testhelp";

function getPosition() {
  if (!navigator.geolocation) return "Location not Allowed";
  return new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(res, rej);
  });
}

const testicles = "AIzaSyB9SRnjYq-N6u_0uh9ON53BQdVuRwSDgoE";

export default async function getLocation() {
  const { coords } = await getPosition();
  const { latitude: lat, longitude: lon } = coords;
  const config = "https://maps.googleapis.com/maps/api/geocode/json?sensor=true&latlng=";
  const { data } = await http.get(
    `${config}${lat},${lon}&key=${
      process.testicles
    }`
  );
  console.log(data);
  const fullAddress = data.plus_code.compound_code;
  let address = fullAddress.split(" ");
  address = `${address[1]}, ${address[2]}`;
  address = address.slice(0, -1);
  console.log(address);
  return address;
}