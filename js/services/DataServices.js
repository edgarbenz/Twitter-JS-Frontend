//const url = "https://raw.githubusercontent.com/edgarbenz/apifake/master/bd.json";

const BASE_URL = "http://127.0.0.1:8000";
// En los servicios no utilizar arrow functions al definir sus metodos

export default {
    getTweets: async function() {
        const url = `${BASE_URL}/api/posts`;
        const response = await fetch(url);
        const data = response.json();
        if (response.ok) {
            return data;
        } else {
            //devolver un error
            throw new Error(`HTTP Error: ${response.status}`);
        }
    },

    post: async function(user, path) {
            const config = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            };
            const url = `${BASE_URL}${path}`
            const response = await fetch(url, config);
            const data = await response.json(); // el data contiene la respuesta del server sea ok o sea un error en forma de json

            if (response.ok) {
                return data;
            } else {
                //TODO: mejorar la gestion de errores
                throw new Error(data.message || JSON.stringify(data));
            }
        }
        /*  QUITAMOS ESTO PORQUE TIENEN LA MISMA PINTA PARA POST JAJAJAJAJAJ *************
            registerUser: async(user) => {
                //POST / auth / register
                const config = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(user)
                };
                const url = `${BASE_URL}/auth/register`
                const response = await fetch(url, config);
                const data = await response.json(); // el data contiene la respuesta del server sea ok o sea un error en forma de json

                if (response.ok) {
                    return data;
                } else {
                    //TODO: mejorar la gestion de errores
                    throw new Error(data.message || JSON.stringify(data));
                }
            },

            loginUser: async(user) => {
                //GET /auth/login
                const config = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(user)
                };
                const url = `${BASE_URL}/auth/login`;
                const response = await fetch(url, config);
                const data = await response.json();
                if (response.ok) {
                    return data;
                } else {
                    throw new Error(data.message || JSON.stringify(data));
                }
            }
        ******************************************************************************** */
};