import BaseController from "./BaseController.js";
import dataService from "../services/DataServices.js"
import RegisterController from "./registerController.js";

//este controlador se encarga del elemento <form novalidate> dentro de login.html
export default class LoginController extends RegisterController {
    constructor(element) {
        super(element);
        this.attachEventListener();
        //ejecuta automaticamente el metodo attachEventListener
    }

    attachEventListener() {
        //agrega un escuchador al formulario al hacer "submit" quiere decir al enviar el formulario
        this.element.addEventListener("submit", async(event) => {
            event.preventDefault(); // evita que el formulario se envie al backend, ahora JS lo controlara
            const user = {
                username: this.element.elements.email.value, // toma el email que alguien escribio en el formulario
                password: this.element.elements.password.value // toma el pass que alguien escribio en el formulario
            };
            this.publish(this.event.START_LOADING, {}); //publica el evento START LOADING y se muestra el icono del cargador
            try {
                const data = await dataService.post(user, "/auth/login");
                //el fetch(url,config) regresa un accessToken envuelto de los datos
                //cuando se hace un fetch POST a esa URL /auth/login el backend detecta que lo
                //que queremos es un accessToken SI Y SOLO SI el usuario esta registrado en la BD del backend
                //si si esta registrado, en ese fetch va un objeto config que contiene:
                //method: "POST", headers: { "Content-Type": "application/json", "Authorization: `Bearer adasdasdadqwe1234123sdadas`"},
                //Body: {"message":"Este es el juego de la oca que se juega y no se toca"}

                //agrego el accessToken al Navegador para si el usuario sale , el accessToken al cargar
                //la pagina sabra que el usuario esta logeado
                dataService.saveToken(data.accessToken); //el backend da el accessToken envuelto en data
                //con esta instruccion mandamos al navegador a la raiz: index.html
                let next = "/";
                const queryParamsString = window.location.search.replace("?", ""); //   ?variable=valor    R=  variable=valor
                const queryParams = queryParamsString.split("="); //                     variable=valor    R=  [variable,valor]
                if (queryParams.length >= 2 && queryParams[0] === "next") {
                    next = queryParams[1];
                }
                document.location.href = next;
                //Si algo paso adentro de un metodo (por ejemplo el dataServices)
                //aqui cacha el error y lo publica por eso se ve muy aca cuando publicas 
                //un error porque con este catch(error)tenemos el nombre exacto del error que nos da el compilador
            } catch (error) {
                console.log(error);
                this.publish(this.event.ERROR, error);
            } finally { // se ejecuta inmediatamente al TERMINAR el try o el catch segun si hubo o no error
                this.publish(this.event.FINISH_LOADING, {});
            }
        });

        //Esto lo hace para cada input del formulario:
        //<input name="email" class="input" type="email" placeholder="Email" required>
        // <input name="password" class="input" type="password" placeholder="Password" required>
        this.element.querySelectorAll("input").forEach(input => {
            const button = this.element.querySelector("button");
            //selecciona el unico boton que hay en el formulario: <button class="button is-success" disabled> Acceder </button>
            input.addEventListener("keyup", (event) => {
                //A cada input le agrega un escuchador "keyup" al oprimir cualquier tecla adentro del input se activa
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