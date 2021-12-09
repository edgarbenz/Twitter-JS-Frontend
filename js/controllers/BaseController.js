import Pubsub from "../services/Pubsub.js"

export default class BaseController {
    constructor(element) {
        this.element = element;
        this.pubSub = Pubsub;
        this.event = {
            START_LOADING: "startLoading", // muestra mensaje de carga
            FINISH_LOADING: "finishLoading", // oculta mensaje de carga
            ERROR: "error", //muestra un error
            SEARCH: "search",
            TWEET_DELETED: "tweetDeleted"
        };
        this.token = "";
    }

    subscribe(eventName, eventHandler) {
        this.pubSub.subscribe(eventName, eventHandler);
    }

    publish(eventName, eventData) {
        this.pubSub.publish(eventName, eventData);
    }
}