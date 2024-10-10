const api_key: string = `90ef2e81f55d1bb4e1860d44114e4e2f`;
const url : string = `https://api.openweathermap.org/data/2.5/weather`;
const difKelvin: number = 273.15;
const buscar = document.getElementById("buscar") as HTMLElement;
const card = document.getElementsByClassName("card")[0];
const mensajeCiudad = document.getElementsByClassName("mostrarMensaje")[0];
const ciudadCompletar = document.getElementsByClassName("ciudadCompletar")[0];
const pais = document.getElementsByClassName("pais")[0];
const fecha = document.getElementsByClassName("fecha")[0];
const tiempoTranscurrido = Date.now();
const hoy = new Date(tiempoTranscurrido);
const temperatura = document.getElementsByClassName("temperatura")[0];
const humedad = document.getElementsByClassName("humedad")[0];
var imagenACompletar;
const imagen = document.getElementsByClassName("imagen")[0] as HTMLImageElement;


function fetchDatosClima(ciudad: string){
    fetch(`${url}?q=${ciudad}&appid=${api_key}`)
    .then(response => response.json())
    .then(response => mostrarDatosClima(response))
}

buscar?.addEventListener("click",() => {
const ciudad = (document.getElementById("ciudad") as HTMLInputElement).value;
fetchDatosClima(ciudad);
})

function mostrarDatosClima(response: any){
    const main = response.main;
    if (main == undefined) {
        mensajeCiudad.classList.remove("mostrarMensaje")
    }
    else {
       mensajeCiudad.classList.add("mostrarMensaje")
       card.classList.remove("visible");
       ciudadCompletar.textContent = response.name;
       pais.textContent = response.sys.country;
       fecha.textContent = hoy.toLocaleDateString();
       let temp : number = response.main.temp;
       let tempCelsius = temp - difKelvin;
       temperatura.textContent = `${Math.floor(tempCelsius)}°C`;
       humedad.textContent = `${response.main.humidity}%`;
       let imagenACompletar = response.weather[0].icon;
       imagen.setAttribute("src", `https://openweathermap.org/img/wn/${imagenACompletar}@2x.png`);
    }
}