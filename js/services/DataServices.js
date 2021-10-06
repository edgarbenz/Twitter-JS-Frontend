const url = "https://raw.githubusercontent.com/edgarbenz/apifake/master/bd1.json";

export default {
    getTweets: async () => {
            const response = await fetch(url);
            if (response.ok) {
                const data = response.json();
                return data;
            }else{
                //devolver un error
                throw new Error(`HTTP Error: ${response.status}`);
            }
    }
}

// esto es lo mismo pero con otra sintaxis
    //getTweets: () => {
    //   return new Promise((resolve, reject) => {
    //   const response = await fetch(url);
    //   const data =  await response.json();
    //   resolve(data);
    //})
// Esto es lo mismo pero con otra sintaxis
    //const promise = new Promise(async (seResolvio, noSeResolvio) => {
    //    try{
    //        const response = await fetch(url);
    //        const data = await response.json();
    //        seResolvio(data);
    //    }catch{
    //        noSeResolvio("SE HA PRODUCIDO UN ERROR ", error);
    //    }
    //    
    //});
    //console.log("TE PROMETO QUE CONSIGUIRE LOS TWEETS EN EL FUTURO")
    //return promise;
    //}

