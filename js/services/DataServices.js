const url = "https://raw.githubusercontent.com/edgarbenz/apifake/master/bd.json";

export default {
    getTweets: () => {
        const promise = new Promise(async (seResolvio, noSeResolvio) => {
            try{
                const response = await fetch(url);
                const data = await response.json();
                seResolvio(data);
            }catch{
                noSeResolvio("SE HA PRODUCIDO UN ERROR ", error);
            }

         });
        console.log("TE PROMETO QUE CONSIGUIRE LOS TWEETS EN EL FUTURO")
        return promise;
    }
}