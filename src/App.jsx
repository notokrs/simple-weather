import Card from './component/Card';
import {useEffect, useState} from 'react';
import {getWeather, getAddress} from './utils/api';
import getCurrentLocation from './utils/navigator';

function App() {
  const [data, setData] = useState({});
  const [err, setErr] = useState({});

  const fetchWeather = async (lat, long) => {
    const weather = await getWeather(lat, long);
    const address = await getAddress(lat, long);

    let location = '';
    if (address.village != undefined && address.city_district != undefined) {
      location = `${address.village} - ${address.city_district}`;
    } else if (address.county != undefined && address.state != undefined) {
      location = `${address.county} - ${address.state}`;
    } else if (address.state != undefined && address.country != undefined) {
      location = `${address.state} - ${address.country}`;
    }

    const data = {
      location: location,
      temperature: weather.temperature,
      humidity: weather.humidity,
      windspeed: weather.windspeed,
      is_day: weather.is_day,
      rain: weather.rain,
    };

    setData(data);
  };

  useEffect(() => {
    if (Object.keys(data).length == 0) {
      getCurrentLocation()
        .then((pos) => {
          fetchWeather(pos.latitude, pos.longitude);
        })
        .catch((err) => {
          setErr(err);
        });
    }
  }, [data]);

  if (!(err instanceof GeolocationPositionError)) {
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
            <div alt="cloud" className="cloud1 h-32 sm:h-2/6 z-10"></div>
            <div alt="cloud" className="cloud2 h-36 sm:h-3/6 z-10"></div>
          </div>
          <div className="grid place-items-center h-screen">
            <Card {...data} />
          </div>
        </div>
      );
    } else {
      return <h1 className="p-4">Loading...</h1>;
    }
  } else {
    return (
      <h1 className="p-5">
        Tidak dapat menemukan lokasi anda. Cek lokasi browser anda{' '}
        <a
          target="_blank"
          href="https://browserleaks.com/geo"
          className="text-blue-600 visited:text-purple-600 hover:underline"
        >
          disini.
        </a>
      </h1>
    );
  }
}

export default App;
