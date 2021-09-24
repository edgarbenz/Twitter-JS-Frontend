function getTheFuckinTweets() {
    return [
        {
            author: "@edgar",
            message: "Lorem fistrum quietooor diodenoo sed duis benemeritaar velit qué dise usteer",
            date: "2021-09-17 09:07:00"

        },
        {
            author: "@pacheco",
            message: "Dolore consequat commodo ullamco la caidita me cago en tus muelas está la cosa",
            date: "2021-09-17 09:12:00"
        },
        {
            author: "@rou",
            message: "Al ataquerl ahorarr a peich benemeritaar va usté muy cargadoo amatomaa la caidita",
            date: "2021-09-17 10:57:00"
        }
    ];

}
export default {
    getTweets: () => {
        const promise = new Promise((seResolvio, noSeResolvio) => {
            setTimeout(() => {
             
                const tweets = getTheFuckinTweets();
                if (tweets.length ===0){
                    noSeResolvio(tweets);
                } else {
                    console.log("CONSEGUI LOS TWEETS")
                    seResolvio(tweets);
                }
            },Math.random() * 5000);
        });
        console.log("TE PROMETO QUE CONSIGUIRE LOS TWEETS EN EL FUTURO")
        return promise;
    }
}