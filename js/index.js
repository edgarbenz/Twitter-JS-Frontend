import {tweetView} from "./views.js";

function startup() {
    const loader = document.querySelector(".lds-facebook");
    loader.classList.add("hidden");

    const postList = document.querySelector(".posts-list");

    const tweets = [
        {
            author: "@edgar",
            message: "Lorem fistrum quietooor diodenoo sed duis benemeritaar velit qué dise usteer",
            date: "2021-09-17 09:07:00"

        },
        {
            author: "@pacheco",
            message: "Dolore consequat commodo ullamco la caidita me cago en tus muelas está la cosa",
            date: "2021-09-17 09:12:00"
        },
        {
            author: "@rou",
            message: "Al ataquerl ahorarr a peich benemeritaar va usté muy cargadoo amatomaa la caidita",
            date: "2021-09-17 10:57:00"
        }
    ];
   
    tweets.forEach(tweet => {
        const tweetElement =  document.createElement("article");
        const tweetHTML = tweetView(tweet);
        tweetElement.innerHTML = tweetHTML;
        postList.appendChild(tweetElement);
    })

}
window.addEventListener("DOMContentLoaded", startup);