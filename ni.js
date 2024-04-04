document.addEventListener("DOMContentLoaded", function() {
    const temperatureField = document.querySelector(".temperature");
    const locationField = document.querySelector(".location");
    const dateandTimeField = document.querySelector(".date_time");
    const conditionField = document.querySelector(".condition");
    const searchField = document.querySelector(".search_input");
    const form = document.querySelector("form");
  
    form.addEventListener("submit", searchForLocation);
  
    let target = 'Lucknow';
  
    const fetchResults = async (targetLocation) => {
      let url = `http://api.weatherapi.com/v1/current.json?key=87f46e736f0d4de9bd8114121240404&q=${targetLocation}&aqi=no`;
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await res.json();
        let locationName = data.location.name;
        let time = data.location.localtime;
        let temp = data.current.temp_c;
        let condition = data.current.condition.text;
        updateDetails(temp, locationName, time, condition);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };
  
    function updateDetails(temp, locationName, time, condition) {
      let splitDate = time.split(" ")[0];
      let splitTime = time.split(" ")[1];
      let currentDay = getDayName(new Date(splitDate).getDay());
      temperatureField.innerText = `Temperature: ${temp}°C`;
      locationField.innerText = `Location: ${locationName}`;
      dateandTimeField.innerText = `${splitDate} ${currentDay} ${splitTime}`;
      conditionField.innerText = `Condition: ${condition}`;
    }
  
    function searchForLocation(e) {
      e.preventDefault();
      target = searchField.value;
      fetchResults(target);
    }
  
    fetchResults(target);
  
    function getDayName(x) {
      switch (x) {
        case 0:
          return "Sunday";
        case 1:
          return "Monday";
        case 2:
          return "Tuesday";
        case 3:
          return "Wednesday";
        case 4:
          return "Thursday";
        case 5:
          return "Friday";
        case 6:
          return "Saturday";
      }
    }
  });
     
