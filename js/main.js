import {database} from './database.js'

let titulo, autores, isbn, fecha;
let indice = 0;
function cargar() {
    titulo = document.getElementById("title");
    autores = document.getElementById("author");
    isbn = document.getElementById("isbn");
    fecha = document.getElementById("date");
    imagen = document.getElementById("imagen")
    mostrarDatos()

    let botonAtras = document.getElementById("atras")
    let botonAdelante = document.getElementById("adelante")
    botonAdelante.addEventListener("click", adelanteHandler)
    botonAtras.addEventListener("click", atrasHandler )
}
function mostrarDatos() {
    titulo.value = database[indice].titulo;
    autores.value = database[indice].autor;
    isbn.value = database[indice].isbn;
    fecha.value = database[indice].fecha;
    imagen.src =  "https://covers.openlibrary.org/b/id/" + database[indice].filename
}
function atrasHandler(){
    if(indice !== 0 ){
        indice -- ;
        mostrarDatos();
    }
}
function adelanteHandler() {
    if (indice !==  database.lenght - 1)   {
        indice ++ ;
        mostrarDatos();
    }
}

function buscarLibro(){
    if(isbn.value){
        fetch("https://openlibrary.org/api/books?bibkeys=ISBN:" + isbn.value + "&jscmd=data&format=json")
        .then(response => response.json())
        .then(libroJSON => {
            let key = Object.keys(libroJSON)
            let libro  = libroJSON[key]
            console.log(libro)
            let nuevoLibro = convertirLibro(libro, key);
            console.log(nuevoLibro)
            indice = database.length - 1
            database.push(nuevoLibro)
        })
        .catch(err => alert(err))
    }
}

function convertirLibro(json, key){
    let nuevoLibro = {
        "isbn" : key.split(':')[1],
        "autor" : json.author.map(a => a.name).join(', '),
        "fecha": json.publish_date,
        "titulo": jason.json.title ,
        "filename" : json.cover.medium.replace(https://covers.openlibrary.org/b/id", ""),
    }
}

window.onload = cargar