// EN ESTA METODOLOGIA, DATASERVICES ES 
// DE DONDE ABSTRAIGO LOS DATOS
//const url = "https://raw.githubusercontent.com/edgarbenz/apifake/master/bd.json";

const BASE_URL = "http://127.0.0.1:8000";
// En los servicios no utilizar arrow functions al definir sus metodos
const TOKEN_LOGIN = "tokenLogin";

export default {
    //getTweets se trae los tweets que estan en el fake server sparrest: http://127.0.0.1:8000/api/messages?_expand=user&sort=id&order_desc
    //para poder "leer" los datos desde un servidor web se utiliza fetch
    //el fetch nos da una "respuesta" a la cual le aplicamos el metodo json
    //y con eso obtenemos los "datos"
    getTweets: async function(textToLookFor = "") {
        //esta URL es el API del sparrest falso, si le pongo sort=id 
        //me lo ordena por id, y and &order_desc lo pone en orden descendente
        const url = `${BASE_URL}/api/messages?_expand=user&sort=id&order_desc&q=${textToLookFor}`;
        console.log("url: ", url);

        const response = await fetch(url);
        // si existe un error en la direccion URL como por ejemplo queno exista esa direccion
        // el error truena el metodo getTweet y ya no ejecuta la siguiente linea,
        // se sale y afuera esta el catch(error) este lo publica y lo muestra
        const data = await response.json(); //la respuesta es un JSON y ese lo pasa a OBJETO y se lo da a Data
        console.log("data= ", data);
        if (response.ok) { // la respuesta del web api tambien tiene la propiedad de saber si fue OK
            //en este momento "data" contiene un Objeto JSON , los JSON tiene propiedades, cada propiedad tiene informacion en un arreglo, cada elemeno del arreglo es un objeto
            //(ver imaginen db.json.jpg en este directorio) cuyas propiedades son posts, users, messages y dentro de este esta el array
            //de objetos, cada objeto con estas propiedades:
            //"id", "message", "userId", "createdAt" o:
            //"id", "text", "userId", "updatedAt"  o:
            //"id", "message", "userId", "updatesAt"
            return data.map(item => {
                return {
                    //El map ejecuta cada elemento del array y hace las instrucciones
                    //que le decimos en esta mini funcion, 
                    //Por cada iteracion el crea un elemento del nuevo arreglo
                    //cada return es un elemento del nuevo arreglo remasterizado
                    //Cuando acabe con los items tendra un arreglo nuevo
                    //Y se ejecuta el return de getTweets
                    id: item.id,
                    user: item.user.username, //username es el elemento expandido por userID se va a la tabla users en el json y se trae el username
                    message: item.text || item.message.replace(/(<([^>]+)>)/gi, ""), //esto del replace es una expresion regular para evitar que alguien inyecte codigo en el textarea
                    createdAt: item.createdAt || item.updatedAt,
                    image: item.image
                }
            });
        } else {
            //Este else se ejecuta cuando la respuesta no tenia errores pero no fue OK, 
            //en este caso no se publica el error solo se lanza a la consola me imagino
            throw new Error(`HTTP Error: ${response.status}`);
        }
    },
    post: async function(info, path, json = true) {
        return await this.request("POST", info, path, json);
    },
    delete: async function(path) {
        return await this.request("DELETE", {}, path); //json sera false en esta requisicion
    },
    put: async function(info, path, json = true) {
        return await this.request("PUT", info, path, json);
    },
    /************************************************************************************************************************************* */
    //este metodo es para hace login porque mandamos los datos del usuario y 
    //nos manda un accessToken (se crea un accessToken en el server asi lo entiendo) y el POST es para crear
    request: async function(method, info, path, json = true) {
        //el fetch pide URL y archivo de configuracion , en el cual va el metodo a ejecutar, si es GET no necesita este file
        const config = {
            method: method,
            headers: {}, //la cabeceras dicen que va los datos en JSON
            body: null //manda los datos en JSON
                //no se le puede pasar un JSON en un archivo de configuracion al fetch , asi que
                //se le pasa ese JSON estringizado jaja para que se pueda
        };
        if (json) {
            config.headers["Content-Type"] = "application/json"; //la cabeceras dicen que va los datos en JSON
            config.body = JSON.stringify(info) //convierte de objeto en JSON
        } else {
            config.body = info;
        }
        const token = await this.getToken();
        if (token) { // por eso se checa si el usuario esta logeado osea con el localstorage sacamos si existe un tweet
            //con esta instruccion objeto[propiedad] = valor 
            //se AGREGA OTRA propiedad a ese objeto
            config.headers["Authorization"] = `Bearer ${token}`
                //queda asi: config.headers = {"Content-Type": "application/json" , "Authorization": "Bearer y_el_chorizajo_del_token"}
        }

        //el parth va cambiando porque este metodo post es igual en todos solo cambia en el path a donde se crea un objeto o se se hace login
        const url = `${BASE_URL}${path}`
        const response = await fetch(url, config); //response es la respuesta del servidor en formato JSON
        const data = await response.json(); //el metodo .json() "convierte" un texto JSON en un objeto, este metodo se usa nadamas en las respuestas de un server

        if (response.ok) {
            return data;
        } else {
            //TODO: mejorar la gestion de errores
            //TODO: si la respuesta es un 401 no autorizado, debemos borrar el tokebn ( si es que lo tenemos)

            throw new Error(data.message || JSON.stringify(data)); // cuando se "lanza" un error se va al try catch (si existe) que lo contiene y ahi se publica el error
        }
    },

    //este metodo regresa el token que esta guardado en el LocalStorage del navegador
    //este proceso no es asincrono, es inmediato pero se le puseo async para seguir con una uniformidad 
    //de que todos los metodos del Dataservices son asincronos
    getToken: async function() {
        return localStorage.getItem(TOKEN_LOGIN); // puedo quitar el await y dejar el async para que devuelva una promesa
    },

    saveToken: async function(accessToken) {
        //agrego ese accessToken al localStorage del navegador
        localStorage.setItem(TOKEN_LOGIN, accessToken); // puedo quitar el await y dejar el async para que devuelva una promesa
        console.log("El token fue guardado en el localStorage: ", this.getToken()); // puedo quitar el await y dejar el async para que devuelva una promesa
    },

    isUserLogged: async function() {
        const token = await this.getToken(); //Obtiene el token que hay en el LocalStorage
        console.log("token: ", token);
        return token !== null; //esto es un if(token!=null) { return true; }
    },

    saveTweet: async function(tweetInfo) { //este metodo hace salva el tweet en "http://127.0.0.1:8000/api/messages
        if (tweetInfo.image) { //si el tweet contiene un archivo de imagen
            console.log("tweetInfo.file= ", tweetInfo.image)
            const imageURL = await this.uploadImage(tweetInfo.image);
            //debugger;
            tweetInfo.image = imageURL;
        }
        const url = `/api/messages`;
        return await this.post(tweetInfo, url) //se reusa el codigo se hace un post con el tweet a esa direccion
    },
    uploadImage: async function(image) {
        const formu = new FormData(); //FormData simula un formulario normal de html a esto sele llama FORM MULTIPAR
        formu.append("file", image) //al formulario normal se le agrega un campo "file" (asi lo pide el sparrest con ese nombre) con el valor tweetInfo.file que es la imagen

        const url = "/upload";
        const response = await this.post(formu, url, false); //false quiere decir que no lleva JSON que vamos a subir una imagen
        //response es una objeto , es la respuesta del servidor(parseada de texto a objeto) y 
        //como se subio una imagen, regresa una URL de donde se encuentra la imagen
        return response.path || null //si response.path es undefined osea que no esta inicializada
    },
    getUser: async function() {

        if (await this.isUserLogged()) {
            const currentToken = await this.getToken(); //currentToken contiene el token condificado a 16 bits
            try { // el try catch es por si hay un error con el JSON.parse que lo que quiera parsear no sea un JSON
                const payLoad = currentToken.split("."); //payLoad es un arreglo de 3 posiciones 
                const jsonString = window.atob(payLoad[1]); //jsonAString es un json , atob pasa de 16 bits a string normal , osea descodifica de 16 bits
                const { username } = JSON.parse(jsonString); //userInfo es un objeto , porque .parse pasa de json a objeto , recuerda que json es un texto  y los corchetes quiere decir que solo me interesa la propiedad username de ese objeto que parsie
                console.log("userinfo: ", { username });
                return { username }
            } catch (error) {
                this.publish(this.event.ERROR, error);
                return {};
            }
        } else {
            return {};
        }

    },
    deleteTweet: async function(tweet) {
        const path = `/api/messages/${tweet.id}`;
        return await this.delete(path);
    }
};