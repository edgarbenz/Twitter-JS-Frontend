import BaseController from "./BaseController.js";

export default class LoaderController extends BaseController {
    constructor(element) {
        super(element); //para heredar todo lo que tengo en basecontroller tengo que poner el super
        //Este control "controla" al div loader en HTML que 
        //lo unico que hace es pintar el elemento de carga 
        //en medio de la pantalla

        // esto del suscribe lo hereda de el Controlador Base BaseController

        this.subscribe(this.event.START_LOADING, () => {
            this.showLoading();
        });
        // se suscibe a el evento Start Loading, Mostrar la Carga
        this.subscribe(this.event.FINISH_LOADING, () => {
            this.hideLoading();
        });
        // se suscribe a el evento Finish Loading, No mostrar la carga
    }
    showLoading() {
        this.element.classList.remove("hidden");
    }

    hideLoading() {
        this.element.classList.add("hidden");
    }
}