import PostListController from "./controllers/PostListController.js"
import LoaderController from "./controllers/LoaderController.js";
import ErrorController from "./controllers/errorController.js";
import NewTweetOrLoginController from "./controllers/NewTweetOrLoginController.js"

window.addEventListener("DOMContentLoaded", () => {
    const loaderElement = document.querySelector(".container-loader");
    new LoaderController(loaderElement)

    const element = document.querySelector(".posts-list");
    const controller = new PostListController(element);
    controller.loadPosts();


    const elementBotones = document.querySelector(".botones");
    new NewTweetOrLoginController(elementBotones);

    const errorElement = document.querySelector(".global-errors");
    new ErrorController(errorElement);
});