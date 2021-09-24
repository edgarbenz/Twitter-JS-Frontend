import {tweetView} from "./views.js";
import dataService from "./services/DataServices.js"

function startup() {
    const loader = document.querySelector(".lds-facebook");
    loader.classList.add("hidden");

    const postList = document.querySelector(".posts-list");

    const cargarTweets = (tweets) => {
        tweets.forEach(tweet => {
            const tweetElement =  document.createElement("article");
            const tweetHTML = tweetView(tweet);
            tweetElement.innerHTML = tweetHTML;
            postList.appendChild(tweetElement);
        })
    }

    const avisarDelError = (error) => {
        console.log("SE PRODUJO UN ERROR AL CARGAR LOS TWEETS");
    }
   

    dataService.getTweets().then(cargarTweets).catch(avisarDelError);

    const url = "https://raw.githubusercontent.com/edgarbenz/apifake/master/bd.json";

    fetch(url).then((response) => {
        console.log("RESPUESTA RECIBIDA ", response);
        response.json().then(data => {
            console.log("Estos son los datos", data);
        }).catch(error => {
            console.log("Hubo un error en la BD del servidor ",error)
        })
    }).catch((error) => {
        console.log("La peticion ha fallado ", error);
    });
}
window.addEventListener("DOMContentLoaded", startup);