// EN ESTA METODOLOGIA VIEWS ES 
// PINTAR EN LA PAGINA LOS DATOS DADOS
export const tweetView = (tweet) => {
    return `<div class="card">
                <div class="card-image">
                <figure class="image is-4by3">
                    <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
                </figure>
                </div>
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