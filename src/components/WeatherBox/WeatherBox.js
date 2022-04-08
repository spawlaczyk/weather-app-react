import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';
import ErrorBox from '../ErrorBox/ErrorBox';

const WeatherBox = props => {
  const [weatherData, setWeatherData] = useState('')
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  const handleCityChange = useCallback(city => {
    setPending(true);
    setError(false);
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b721fbdd1fa4fa68a393d32d0766e43f&units=metric`)
      .then(res => {
        if(res.status === 200) {
          return res.json()
            .then(data => {
              setWeatherData({
                city: data.name,
                temp: data.main.temp,
                icon: data.weather[0].icon,
                description: data.weather[0].main
              })
              setPending(false);
            })
            } else {
              setError(true);
            }
        });
      }, []);

  
  return (
    <section>
      <PickCity action={handleCityChange} />
      { (!error && !pending && weatherData) && <WeatherSummary { ...weatherData } /> }
      { (!error && pending) && <Loader /> }
      { error && <ErrorBox /> }
    </section>
  )
};

export default WeatherBox;