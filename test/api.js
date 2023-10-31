async function get() {
  const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=-6.8691&longitude=109.0378&current=temperature_2m,relativehumidity_2m,is_day,rain,windspeed_10m,winddirection_10m");
  
  return res.json();
}

const a = await get();
console.log(a);
