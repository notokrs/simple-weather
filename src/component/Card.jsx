import {Sun, Droplet, Moon, CloudDrizzle} from 'react-bootstrap-icons';

function Card({...props}) {
  let Icon;
  if (props.is_day && !props.rain) {
    Icon = <Sun className="text-4xl sm:text-5xl text-yellow-600" />;
  } else {
    Icon = <Moon className="text-4xl sm:text-5xl text-slate-400" />;
  }

  if (props.rain) {
    Icon = <CloudDrizzle className="text-4xl sm:text-5xl text-gray-400" />;
  }

  return (
    <div className="card z-50 w-10/12 sm:w-4/12">
      <div
        className={
          'card-top ' +
          (props.is_day && !props.rain
            ? 'bg-yellow-300'
            : props.rain
            ? 'bg-gray-600'
            : 'bg-slate-600')
        }
      >
        <div className="flex justify-between mb-3">
          <h1
            className={
              'font-mono font-bold text-6xl sm:text-7xl ' +
              (props.is_day && !props.rain
                ? 'text-gray-800'
                : props.rain
                ? 'text-gray-400'
                : 'text-slate-400')
            }
          >
            {props.temperature}&deg;
          </h1>
          {Icon}
        </div>
        <h2
          className={
            'font-mono text-md sm:text-lg font-semibold ' +
            (props.is_day && !props.rain
              ? 'text-gray-800'
              : props.rain
              ? 'text-gray-400'
              : 'text-slate-400')
          }
        >
          {props.location}
        </h2>
      </div>
      <div className="card-bottom bg-gray-100">
        <div className="flex justify-between mb-4">
          <h3 className="font-mono text-sm text-gray-700">Kelembapan</h3>
          <h3 className="font-mono text-sm text-gray-700">{props.humidity}%</h3>
        </div>
        <div className="flex justify-between">
          <h3 className="font-mono text-sm text-gray-700">Angin</h3>
          <h3 className="font-mono text-sm text-gray-700">
            {props.windspeed} km/j
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Card;
