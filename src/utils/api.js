async function getWeather(lat, long) {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,relativehumidity_2m,is_day,rain,windspeed_10m`,
  );
  const data = await response.json();

  return {
    temperature: Math.round(data.current.temperature_2m),
    humidity: data.current.relativehumidity_2m,
    windspeed: data.current.windspeed_10m,
    is_day: data.current.is_day,
    rain: data.current.rain,
  };
}

async function getAddress(lat, long) {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}&addressdetails=1&accept-language=id`,
  );
  const data = await response.json();

  return {
    village: data.address.village,
    country: data.address.country,
    city: data.address.city,
    state: data.address.state,
    city_district: data.address.city_district,
    county: data.address.county,
  };
}

export { getWeather, getAddress };
