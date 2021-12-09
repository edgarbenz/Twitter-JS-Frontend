import BaseController from "./BaseController.js";
import DataServices from "../services/DataServices.js";
/****************
 *    ESTE CONTROLLER AGREGA ESCUCHADORES 
 *    A CIERTOS ELEMENTOS DE HTML COMO EL BOTON DE SUBMIT DE FORMULARIOS
 *    O QUE JS SE DE CUENTA QUE ALGUIEN ESCRIBIO EN UN TEXTAREA, ETC ETC.
 *    Y LOS ESCUCHADORES AHI SE QUEDAN HASTA QUE EL EVENTO SE EJECUTE
 *    SON COMO UN CAMPO MINADO, SE ACTIVAN CUANDO ALQUIEN LOS PISE
 *    LA PROGRAMACION SEGUIRA EJECUTANDOSE CON LAS SIGUIENTES INSTRUCCIONES 
 *    SE PUEDE DECIR QUE LOS EVENTOS ES COMO UN HILO DEL PROCESADOR INDEPENDIENTE
 * 
 *    El controlador tambien da foco al textarea para cuando se carge una pagina
 * 
 *    Tambien checa si el usuario esta logeado, 
 * 
 *    En General un controlador se hace cargo de todo el HTML encomendado
 *    El HTML es como un esqueleto y el COntrolador es como el cerebro y sistema muscular de ese 
 *    pedazo de esqueleto.
 */

//este controlador se hace cargo de <form novalidate> que esta dentro de new-tweet.html
export default class NewTweetController extends BaseController {
    constructor(element) {
        super(element);
        this.publish(this.event.START_LOADING, {}); //publica el start loading
        this.checkIfUserLogged(); //checa si el usuario esta logeado
        this.attachEventListener();
        this.focusInTextaArea();
    }

    async checkIfUserLogged() {
        const userIsLogged = await DataServices.isUserLogged(); //checa si hay un token en el LocalStorage

        if (!userIsLogged) {
            //Si no esta logeado lo 
            window.location.href = "/login.html?next=/new-tweet.html";
            this.publish(this.event.FINISH_LOADING, {}); //quita el loader
            this.publish(this.event.ERROR, "Usuario no logeado"); //publica un error
        } else {
            this.publish(this.event.FINISH_LOADING, {}); //si si esta logeado tambien quita el loader
        }
    }
    attachEventListener() {
        //selecciona el boton  <button class="button is-info is-rounded" disabled>Publish</button> dentro del formulario
        const botonPublish = this.element.querySelector(".button");

        //selecciona el textarea  <textarea class="textarea" placeholder="Write here your tweet.." rows="10" required></textarea>
        const textarea = this.element.querySelector(".textarea");

        //le agrega un escuchador de oprimir cualquier tecla dentro del textarea
        textarea.addEventListener("keyup", (event) => {
            if (this.element.checkValidity()) { //checa que el formulario este lleno en este caso el textarea
                botonPublish.removeAttribute("disabled"); //muestra el boton
            } else {
                botonPublish.setAttribute("disabled", true);
            }
        });

        //selecciona el boton para selecciona archivo  <input class="file-input" type="file" name="resume" accept="image/*">
        const file = this.element.querySelector("input");

        //le agrega un escuchador "submit a el formulario, osea que cuando alguien mande el formulario se va a ejecutar este codigo
        this.element.addEventListener("submit", async(event) => {
            event.preventDefault();
            console.log("this.element.file= ", this.element.file)
                //console.log("this.element.file.files[0].name= ", this.element.file.files[0].name) //este es el archivo de la imagen que seleccione en el formulario
                //debugger;
            const tweetInfo = {
                message: this.element.elements.message.value, //envia en la constante tweetInfo lo que hay en textarea
                image: null //file se refiere a la imagen
            }

            if (this.element.elements.file.files.length > 0) { //
                console.log("this.element.elements.file.files[0]= ", this.element.elements.file.files[0]);
                tweetInfo.image = this.element.elements.file.files[0];
            }
            this.publish(this.event.START_LOADING);
            try {
                await DataServices.saveTweet(tweetInfo); //este metodo hace salva el tweet en "http://127.0.0.1:8000/api/messages
                window.location.href = "/?mensaje=tweetOK"; //como no existe esta URL te mandara a la raiz
            } catch (error) { //si ocurrio un error dentro del saveTweet aqui lo cacha
                this.publish(this.event.ERROR, error);
            } finally {
                this.publish(this.event.FINISH_LOADING);

            }
        })
    }
    focusInTextaArea() { //enfoca el textArea
        const textArea = this.element.querySelector("textarea");
        textArea.focus();
    }
}