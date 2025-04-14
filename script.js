const apiKey = "b4a953c8f60e49ccbe983707251404";
const cities = ["Seoul", "Busan", "Daegu", "Daejeon", "Incheon", "Gwangju", "Ulsan"];
const weatherContainer = document.getElementById("weatherContainer");

function getCityWeather(city) {
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&lang=kr`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${city}의 날씨 정보를 가져오는 데 실패했습니다.`);
      }
      return response.json();
    })
    .then((data) => {
      const weather = data.current.condition.text;
      const temp = data.current.temp_c;
      const feelsLike = data.current.feelslike_c;
      const humidity = data.current.humidity;

      const card = document.createElement("div");
      card.className = "weather-card";
      card.innerHTML = `
        <strong>${data.location.name}</strong>
        상태: ${weather}<br/>
        온도: ${temp}°C<br/>
        체감 온도: ${feelsLike}°C<br/>
        습도: ${humidity}%
      `;
      weatherContainer.appendChild(card);
    })
    .catch((error) => {
      const card = document.createElement("div");
      card.className = "weather-card";
      card.innerHTML = `<strong>${city}</strong><br/>${error.message}`;
      weatherContainer.appendChild(card);
    });
}

// 모든 도시 날씨 가져오기
cities.forEach(getCityWeather);
