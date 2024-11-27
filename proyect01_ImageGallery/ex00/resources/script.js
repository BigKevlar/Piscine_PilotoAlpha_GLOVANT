//const UNSPLASH_ACCESS_KEY = "${UNSPLASH_ACCESS_KEY}";   
const UNSPLASH_ACCESS_KEY = 'zcG3QMLeWGj3p-7b99Gy6aXJf7s6utVQ0J_s0N9xzbg';                                  // Variable que guarda nuestra clave de acceso
const ENDPOINT_URL_RANDOM_PHOTOS  = 'https://api.unsplash.com/photos/random';

async function fetchRandomImage() {
    try {
        const request = await fetch(`${ENDPOINT_URL_RANDOM_PHOTOS}?client_id=${UNSPLASH_ACCESS_KEY}`);      // Realizamos una peticion/busqueda a la API usando la URL y la access key, y la guardamos en una variable 'request'.
        if (!request.ok) {                                                                                  // Verificamos si la peticion se realizo correctamente.
            throw new Error(`Error en la petición: ${request.status}`);                                     // Tiramos un error si la peticion no es 'ok' y lanzamos un mensaje del status.
        }
        else {
            const data = await request.json();                                                              // Introducimos los datos recibidos de la respuesta en un '.json' y en una variable 'data'.
            console.log(data);                                                                              // Hacemos un 'cosole.log' de esos datos.
            document.getElementById("image-container").innerHTML =
                `<img   class="ramdom_image"
                        src="${data.urls.regular}"
                        alt="${data.alt_description}" />`;                         // Mostramos la imagen.
        }
    } catch (error) {
        console.error("Error al obtener la imagen:", error);
    }
}
