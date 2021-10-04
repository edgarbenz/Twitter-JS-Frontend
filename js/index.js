import PostListController from "./controllers/PostListController.js"
import LoaderController from "./controllers/LoaderController.js";

window.addEventListener("DOMContentLoaded", async () => {
    const loaderElement = document.querySelector(".lds-facebook");
    const loaderController = new LoaderController(loaderElement)
    //loaderController.hideLoading();

    const element = document.querySelector(".posts-list");
    const controller = new PostListController(element);
    controller.loader = loaderController;
    controller.loadPosts();

});
