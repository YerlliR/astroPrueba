import { query } from "./strapi";

const STRAPI_HOST = "http://localhost:1337"

export function getSeccionPrincipalInfo() {
    return query("seccion-principal?populate=Imagen")
    .then(res => {
        const {Titulo, Descripcion, Imagen} = res.data
        const ImagenUrl = `${STRAPI_HOST}${Imagen.url}`
        return {  Titulo, Descripcion, ImagenUrl }
    
    });
}
