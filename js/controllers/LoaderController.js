import BaseController from "./BaseController.js";

export default class LoaderController extends BaseController {
    constructor(element) {
        super(element); //para heredar todo lo que tengo en basecontroller tengo que poner el super
        this.subscribe(this.event.START_LOADING, () => {
            this.showLoading();
        });
        this.subscribe(this.event.FINISH_LOADING, () => {
            this.hideLoading();
        });
    }
    showLoading() {
        this.element.classList.remove("hidden");
    }

    hideLoading() {
        this.element.classList.add("hidden");
    }
}