import {tweetView} from "./views.js";
import dataService from "./services/DataServices.js"

async function startup() {
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
}
window.addEventListener("DOMContentLoaded", startup);