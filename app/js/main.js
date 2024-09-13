const buttonSearch = document.querySelector('.info__btn--search');
const buttonLocation = document.querySelector('.info__btn--location');
const inputSearch = document.querySelector('.info__input');

function weather(e) {
  
  const APIKey = 'a8a1a655f133583bc05c1575299a8ec8';
  fetch(`https://api.openweathermap.org/data/2.5/weather?${e}&units=metric&appid=${APIKey}`)
    .then(response => response.json())
    .then(data => {
      const cityName = document.querySelector('.out__location-city');
      const icon = document.querySelector('.out__icon')
      const temp = document.querySelector('.out__temp');
      const descr = document.querySelector('.info__descr');
      const cloudy = document.querySelector('.cloudy');
      const windSpeed = document.querySelector('.wind');
      const maxTemp = document.querySelector('.max-temp');
      const minTemp = document.querySelector('.min-temp');
      const humadity = document.querySelector('.humadity');
      const weatherBg = document.querySelector('.weather');
  

      cityName.textContent = data.name;
      temp.innerHTML = `${Math.round(data.main.temp)}<span>°</span>`;
      descr.textContent = data.weather[0].description;
      cloudy.innerHTML = `${data.clouds.all}<span>%</span><img src="images/cloudy.svg" alt=" ">`;
      windSpeed.innerHTML = `${Math.round((data.wind.speed / 1000) * 3600)}<span>km/h</span><img src="images/wind.svg" alt=" ">`;
      icon.innerHTML = `<img src="images/icon/${data.weather[0].icon}.svg" alt=" ">`;
      maxTemp.innerHTML = `${Math.round(data.main.temp_max)}<span>°</span><img src="images/temp-max.svg" alt=" ">`;
      minTemp.innerHTML = `${Math.round(data.main.temp_min)}<span>°</span><img src="images/temp-min.svg" alt=" ">`;
      humadity.innerHTML = `${data.main.humidity}<span>%</span><img src="images/humadity.svg" alt=" ">`;
      weatherBg.setAttribute('style', `background-image: url('images/icon/${data.weather[0].icon}.jpg');`)
      
    })
};


function getLocatin() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
}

function showPosition(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
    weather(`lat=${lat}&lon=${lon}`)

}

buttonSearch.addEventListener('click', () => {
  const city = inputSearch.value;
  if (city === '') {
    return
  }
  weather(`q=${city}`);

  inputSearch.value = '';
})

buttonLocation.addEventListener('click', () => {
  getLocatin()
})

inputSearch.addEventListener('keyup', (el) => {
  if (el.keyCode === 13) {
    buttonSearch.click();
  }
})

window.addEventListener('load', () => {
  buttonSearch.click()
})



