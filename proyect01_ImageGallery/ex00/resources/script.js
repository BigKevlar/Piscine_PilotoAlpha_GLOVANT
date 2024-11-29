const UNSPLASH_ACCESS_KEY = 'zcG3QMLeWGj3p-7b99Gy6aXJf7s6utVQ0J_s0N9xzbg';      // Variable que guarda nuestra clave de acceso
const ENDPOINT_RANDOM_PHOTOS  = 'https://api.unsplash.com/photos/random';       // Variable con URL de solicitud de fotos aleatorias.
const ENDPOINT_SEARCH_PHOTOS  = 'https://api.unsplash.com/search/photos';       // Variable con URL de solicitud de fotos solicitadas.
const IMAGES_COUNT = 6;
//
// PASOS PARA AUTENTICACION!
//
// 1- Conseguir el código de autorización y hacer una peticion con lo siguiente:
//      - client_id: Tu Client ID.
//      - redirect_uri: El Redirect URI configurado en el panel de control de Unsplash.
//      - response_type: Generalmente code para obtener un código de autorización.
//      - scope: Los permisos que solicitas.
// 2- Si el login tiene exito intercambiar el código 'code' que te dan en la URL por un 'access_token'.
// 3- Usar el access token para realizar solicitudes a la API de Unsplash en nombre del usuario.
//
// https://unsplash.com/documentation/user-authentication-workflow
// https://unsplash.com/documentation/dynamic-client-registration
//
const URL_OAUTH = 'https://unsplash.com/oauth/authorize';
const CLIENT_ID = '${UNSPLASH_ACCESS_KEY}';
const REDIRECT_URI = 'http://localhost:8080';               // Codigo de redireccion, el cual tenemos que configurar en Unsplash.
const RESPONSE_TYPE = 'code';                               // ??????
const SCOPE = 'public';                                     // ??????
const CODE = "";                                            // ??????

async function fetchImages(query = "") {
    let endpoint;
    if (query) {
        endpoint = `${ENDPOINT_SEARCH_PHOTOS}?client_id=${UNSPLASH_ACCESS_KEY}&query=${query}&per_page=${IMAGES_COUNT}`;
    } else {
        endpoint = `${ENDPOINT_RANDOM_PHOTOS}?client_id=${UNSPLASH_ACCESS_KEY}&count=${IMAGES_COUNT}`;
    }
    try {
        const request = await fetch(endpoint);                              // Realizamos una peticion/busqueda a la API usando la URL y la access key, y la guardamos en una variable 'request'.
        if (!request.ok) {                                                  // Verificamos si la peticion se realizo correctamente.
            throw new Error(`Error en la petición: ${request.status}`);     // Tiramos un error si la peticion no es 'ok' y lanzamos un mensaje del status.
        }
        else {
            const api_return = await request.json();                        // Convertimos la respuesta de la API en un '.json' y la metemos en 'api_return'.
            console.log(api_return);                                        // Hacemos un 'cosole.log' de esos datos.
            if (query) {
                images = api_return.results;                                // Si hay una consulta, accede a los resultados de la búsqueda.
            } else {
                images = api_return;                                        // Si no hay consulta, usa las imágenes aleatorias.
            }                                                               // La API de búsqueda usa 'results' para las imágenes.
            showImages(images);
        }
    } catch (error) {
        console.error("Error al obtener las imágenes:", error);
    }
}

function showImages(images) {
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = "";
    images.forEach(image => {
        const imgElement = document.createElement("img");
        imgElement.className = "gallery";
        imgElement.src = image.urls.regular;
        imgElement.alt = image.alt_description || "Imagen de Unsplash";
        gallery.appendChild(imgElement);
    });
}

function loginButon() {
    location.href = `${URL_OAUTH}?client_id=${UNSPLASH_ACCESS_KEY}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
}

window.addEventListener('load', () => {
    fetchImages();
    let urlparams = new URLSearchParams(window.location.search);

    if (urlparams.has("code")) {
        document.getElementById('loginButon').style.display = 'none';
    }
});

document.getElementById("searchButton").addEventListener("click", () => {
    const searchInput = document.getElementById("searchBar").value.trim();
    if (searchInput) {
        fetchImages(searchInput);
    } else {
        fetchImages();
    }
});

// Si solo queremos que nos muestre las imagenes aleatorias esta es la manera.
// 
// async function fetchRandomImage() {
//     try {
//         const request = await fetch(`${ENDPOINT_RANDOM_PHOTOS}?client_id=${UNSPLASH_ACCESS_KEY}&count=${IMAGES_COUNT}`);
//         if (!request.ok) {
//             throw new Error(`Error en la petición: ${request.status}`);
//         }
//         else {
//             const api_return = await request.json();
//             console.log(api_return);
//             
//             const gallery = document.getElementById("gallery");
//             gallery.innerHTML = "";
//             api_return.forEach(image => {
//                 const imageElement = document.createElement("image");
//                 imageElement.className = "gallery";
//                 imageElement.src = image.urls.regular;
//                 imageElement.alt = image.alt_description || "Imagen de Unsplash";
//                 gallery.appendChild(imageElement);
//             });
//         }
//     } catch (error) {
//         console.error("Error al obtener la imagen:", error);
//     }
// }
// 
// window.onload = fetchRandomImage;
