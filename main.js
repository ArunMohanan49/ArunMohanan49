const btn = document.querySelector('.search');
const search = document.querySelector('#search');
const error404 = document.querySelector('.not-found-box');
const rectangle = document.querySelector('.rectangle');
const climateBox = document.querySelector('.climate-box');
const climateDetails = document.querySelector('.climate-details');
const weatherBox = document.querySelector('.weather-box');


btn.addEventListener("click", () => {

    const APIKey = '8b32e7153c4bb58846ca3fdda6f1e1f5';
    const city = search.value;

    if (city === '') {
        weatherBox.style.display = "none"
        climateBox.style.display = 'none';
        error404.style.display = 'flex';
        rectangle.style.height = '346px';
        error404.classList.add("fadeIn");
        return;
    }
    search.value = '';

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(data => data.json())
        .then(json => {
            if (json.cod === '404') {
                weatherBox.style.display = "none"
                climateBox.style.display = 'none';
                error404.style.display = 'flex';
                rectangle.style.height = '346px';
                error404.classList.add("fadeIn");
                return;
            }
            search.value = '';
            error404.style.display = 'none';

            climateBox.style.display = 'flex';

            const image = document.querySelector('.weather-img img');
            const tempreture = document.querySelector('.tempreture span');
            const description = document.querySelector('.description p');
            const humidity = document.querySelector('.humidity');
            const wind = document.querySelector('.wind');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'assets/clear.png';
                    break;

                case 'Rain':
                    image.src = 'assets/rain.png';
                    break;

                case 'Snow':
                    image.src = 'assets/snow.png';
                    break;

                case 'Clouds':
                    image.src = 'assets/cloud.png';
                    break;

                case 'Haze':
                    image.src = 'assets/mist.png';
                    break;

                default:
                    image.src = '';
            }

            tempreture.innerHTML = `${parseInt(json.main.temp)}`;
            description.innerHTML = `${json.weather[0].description}`
            humidity.innerHTML = `${json.main.humidity}`;
            wind.innerHTML = `${json.wind.speed}`;

            rectangle.style.height = '346px';
            climateBox.style.display = '';
            climateDetails.style.display = '';
            climateBox.classList.add('fadeIn');
            climateDetails.classList.add('fadeIn');
            weatherBox.style.display = 'flex';


            weatherBox.classList.add("fadeIn")
            climateDetails.classList.add("fadeIn");

        })



})