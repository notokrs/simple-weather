function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    navigator.permissions.query({name: 'geolocation'}).then((result) => {
      if (result.state === 'denied') {
        reject(Error('Izin ditolak!'));
      }
    });

    const opt = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const res = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        };
        resolve(res);
      },
      (err) => {
        reject(err);
      },
      opt,
    );
  });
}

export default getCurrentLocation;
