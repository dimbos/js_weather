window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDeegre = document.querySelector('.temperature-degree');
    let locationTimezone= document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    let temperatureSpan = document.querySelector('.temperature span');
    

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=> {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/cd75294a6c74166eecfef757c191c8d0/${lat},${long}`;
        
            fetch(api)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                const {temperature, summary, icon} = data.currently;

                temperatureDeegre.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                //формула для приведения к цельсию
                let celsius = (temperature - 32) * (5 / 9);
                setIcons(icon, document.querySelector('.icon'));

                //Celsius
                temperatureSection.addEventListener('click', () => {
                    if(temperatureSpan.textContent === 'F'){
                        temperatureSpan.textContent = 'C';
                        temperatureDeegre.textContent = Math.floor(celsius);
                    }else{
                        temperatureSpan.textContent = 'F';
                        temperatureDeegre.textContent = temperature;
                    }
                })

            })
        });
    }

    function setIcons(icon, iconId){
        const skycons = new Skycons({"color": "white"});
        const currentIcons = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconId, Skycons[currentIcons]);
    }
});