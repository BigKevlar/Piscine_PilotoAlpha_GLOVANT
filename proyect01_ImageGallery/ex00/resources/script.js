const UNSPLASH_ACCESS_KEY = 'zcG3QMLeWGj3p-7b99Gy6aXJf7s6utVQ0J_s0N9xzbg';                                                      // Variable que guarda nuestra clave de acceso
const ENDPOINT_URL_RANDOM_PHOTOS  = 'https://api.unsplash.com/photos/random';                                                   // Variable que 
const IMAGES_COUNT = 6;

async function fetchRandomImage() {
    try {
        const request = await fetch(`${ENDPOINT_URL_RANDOM_PHOTOS}?client_id=${UNSPLASH_ACCESS_KEY}&count=${IMAGES_COUNT}`);    // Realizamos una peticion/busqueda a la API usando la URL y la access key, y la guardamos en una variable 'request'.
        if (!request.ok) {                                                                                                      // Verificamos si la peticion se realizo correctamente.
            throw new Error(`Error en la petición: ${request.status}`);                                                         // Tiramos un error si la peticion no es 'ok' y lanzamos un mensaje del status.
        }
        else {
            const api_return = await request.json();                                                                            // Convertimos la respuesta de la API en un '.json' y la metemos en 'api_return'.
            console.log(api_return);                                                                                            // Hacemos un 'cosole.log' de esos datos.
            
            const ramdomGallery = document.getElementById("ramdom_gallery");
            ramdomGallery.innerHTML = "";
            api_return.forEach(image => {
                const imageElement = document.createElement("img");
                imageElement.className = "gallery";
                imageElement.src = image.urls.regular;
                imageElement.alt = image.alt_description || "Imagen de Unsplash";
                ramdomGallery.appendChild(imageElement);
            });                            
        }
    } catch (error) {
        console.error("Error al obtener la imagen:", error);
    }
}

window.onload = fetchRandomImage;
