import PostListController from "./controllers/PostListController.js"
import LoaderController from "./controllers/LoaderController.js";
import ErrorController from "./controllers/errorController.js";

window.addEventListener("DOMContentLoaded", async () => {
    const errorElement =  document.querySelector(".global-errors");
    const errorController =  new ErrorController(errorElement);

    //const loaderElement = document.querySelector(".lds-facebook");
    const loaderElement = document.querySelector(".container-loader");
    const loaderController = new LoaderController(loaderElement)
    //loaderController.hideLoading();

    const element = document.querySelector(".posts-list");
    const controller = new PostListController(element);
    controller.loader = loaderController;
    controller.loadPosts();
    controller.error =  errorController;

});
