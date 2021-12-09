import { errorView } from "../views.js";
import BaseController from "./BaseController.js";

//ErrorController se hace cargo del elemento:  <div class="global-errors hidden">
export default class ErrorController extends BaseController {
    constructor(element) {
        super(element);
        //este controlador lo unico que hace es suscribirse al pubsub para cuando 
        //alguien "publique" un error , el pubsub por medio de un procedimiento bein pensado
        //cheque si esa publicacion en este caso "error" corresponde con una suscripcion a ese mismo nombre
        //si la hay ejecuta la funcion que tenga en este caso muestra el error
        this.subscribe(this.event.ERROR, (error) => {
            this.showError(error);
        });
    }


    showError(errorMessage) {
        // se va al machote de la vista de error y sustituye el errorMessage por este error en particular
        this.element.innerHTML = errorView(errorMessage);

        //remueve la etiqueta "hidden" para mostrar ese HTML      
        this.element.classList.remove("hidden");

        //agrega un "escuchador" de click al elemento <div class="global-errors hidden">
        this.element.addEventListener("click", (event) => {
            //Si le das click a este elemento de HTML entrara aqui y 
            //aqui se checa que el click sea en el elemento <button class="delete" aria-label="delete"></button>
            //que es un boton circular de una tacha
            //si es asi le agrega la etiqueta hidden para que despinte
            if (event.target.classList.contains("delete")) {
                this.element.classList.add("hidden");
            }
        })
    }
}