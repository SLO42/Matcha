const locationOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  
  export default async function checkLocationPermission() {
    const { geolocation } = navigator;
    if (!geolocation) return "denied";
  
    try {
      const result = await getPosition(locationOptions);
      console.log(result);
      const lat = (result.coords.latitude);
      const long = (result.coords.longitude);
      console.log(lat);
      console.log(long);
      return "granted";
    } catch (ex) {
      return "denied";
    }
  }

  const getPosition =  (options) => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }