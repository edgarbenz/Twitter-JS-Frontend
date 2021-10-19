import BaseController from "./BaseController.js";
import dataService from "../services/DataServices.js"


export default class RegisterController extends BaseController {
    constructor(element) {
            super(element);
            this.attachEventListener();
        }
        /*
            async makePost(user) {
            }
        */

    attachEventListener() {
        this.element.addEventListener("submit", async(event) => {
            event.preventDefault(); // evita que el formulario se envie al backend, ahora JS lo controlara
            const user = {
                username: this.element.elements.email.value, // toma el email que alguien escribio en el backend
                password: this.element.elements.password.value // toma el pass que alguien escribio en el backend
            };
            //console.log("SE ENVIA EL FORMULARIO", user);
            //console.log("el formulario contiene este email ", user.username, " y este pass ", user.password);
            this.publish(this.event.START_LOADING, {});
            try {
                //this.makePost(user);
                console.log("Entro al makePost indicado");
                // const data = await dataService.registerUser(user, "/auth/register");
                const data = await dataService.post(user, "/auth/register");
                document.location.href = "/login.html";
                alert("User created sucessful !!");
                //this.render(tweets);
            } catch (error) {
                console.log(error);
                this.publish(this.event.ERROR, error);
            } finally { // se ejecuta inmediatamente al TERMINAR el try o el catch segun si hubo o no error
                this.publish(this.event.FINISH_LOADING, {});
            }


        });
        this.element.querySelectorAll("input").forEach((input) => {
            const button = this.element.querySelector("button");
            input.addEventListener("keyup", (event) => {
                //console.log("INPUT VALIDITY= ", input.validity);
                if (input.validity.valid) { // pone de color verde si es valido tanto el email como el password
                    input.classList.remove("is-danger");
                    input.classList.add("is-success");
                } else {
                    input.classList.remove("is-success");
                    input.classList.add("is-danger");
                }
                if (this.element.checkValidity()) { //checa si los campos de user y pass estan llenos
                    button.removeAttribute("disabled");
                } else {
                    button.setAttribute("disabled", true);
                }

            });
        });
    }
}