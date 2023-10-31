import Card from './component/Card';
import {useEffect, useState} from 'react';
import {getWeather, getAddress} from './utils/api';
import getCurrentLocation from './utils/navigator';

function App() {
  const [data, setData] = useState({});
  const [err, setErr] = useState({});

  useEffect(() => {
    const fetchWeather = async (lat, long) => {
      const weather = await getWeather(lat, long);
      const address = await getAddress(lat, long);

      const data = {
        location: `${address.village}, ${address.city_district}`,
        temperature: weather.temperature,
        humidity: weather.humidity,
        windspeed: weather.windspeed,
        is_day: weather.is_day,
        rain: weather.rain,
      };
      setData(data);
    };

    getCurrentLocation()
      .then((pos) => {
        fetchWeather(pos.latitude, pos.longitude);
      })
      .catch((err) => {
        setErr(err);
      });
  }, []);

  if (Object.keys(err).length == 0) {
    if (Object.keys(data).length > 0) {
      return (
        <div
          className={
            'bg-gradient-to-b ' +
            'min-h-screen ' +
            'min-w-screen ' +
            (data.is_day && !data.rain
              ? 'from-sky-500 to-white-500'
              : data.rain
              ? 'from-gray-600 to-white-500'
              : 'from-slate-800 to-white-500')
          }
        >
          <div>
            <div alt="cloud" className="cloud1 z-10"></div>
            <div alt="cloud" className="cloud2 z-10"></div>
          </div>
          <div className="grid place-items-center h-screen">
            <Card {...data} />
          </div>
        </div>
      );
    } else {
      return <h1>Loading...</h1>;
    }
  } else {
    return <h1>{err.message}</h1>;
  }
}

export default App;
