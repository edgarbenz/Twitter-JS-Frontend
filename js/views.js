// EN ESTA METODOLOGIA VIEWS ES 
// PINTAR EN LA PAGINA LOS DATOS DADOS
export const tweetView = (tweet, userInfo) => {
    //Este machote se ejecuta una sola vez porque tweet es un elemento de un arreglo y solo contiene un objeto con estos datos:
    //"id", "message", "userId", "createdAt" o:
    //"id", "text", "userId", "updatedAt"  o:
    //"id", "message", "userId", "updatesAt"
    //
    //Este machote primero lo pones junto al file HTML normal y luego como vez que eso se va a repetir lo metes en una vista
    // asi `` con esas comillas y los elementos variables con ${variable1} en donde se requiera
    let imageURL = "";
    if (tweet.image) {
        imageURL = `<div class="card-image">
                        <figure class="image is-4by3">
                            <img src="${tweet.image}" alt="Placeholder image">
                        </figure>
                     </div>`

    }
    let hiddenButton = "hidden";
    if (userInfo.username == tweet.user) {
        hiddenButton = ``
    }
    return `<div class="card">
                ${imageURL}
                <div class="card-content">
                    <div class="media">
                        <div class="media-left">
                            <figure class="image is-48x48">
                                <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                            </figure>
                        </div>
                        <div class="media-content">
                            <p class="title is-4">${tweet.user}</p>
                        </div>
                    </div>
                    <div class="content">
                        ${tweet.message}
                        <br>
                        <time datetime="${tweet.createdAt}">${tweet.createdAt}</time>
                    </div>
                </div>
                <div class="borrar-button ${hiddenButton}">
                    <a href="" class="button is-warning">Borrar</a>
                </div>
            </div>`
}
export const errorView = (errorMessage) => {
    return `<article class="message is-danger">
                <div class="message-header">
                    <p>Danger</p>
                    <button class="delete" aria-label="delete"></button>
                </div>
                <div class="message-body">
                    ${errorMessage}
                </div>
            </article>`;
}