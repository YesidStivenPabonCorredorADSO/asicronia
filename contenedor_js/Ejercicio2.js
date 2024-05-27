// Lea el archivo users.json suministrado por el instructor y tome como base
// las capturas para luego mostrar todos los datos de usuario de cada
// aprendiz, este ejercicio de desarrolla con promesas.
// a. Imprima el resultado en una tabla donde solo nos mostrar el nombre
// y el avatar de cada aprendiz

let prom = new Promise((resolve, reject) => {
    /*
    En la linea 7 estamos creando una nueva promesa donde prom va a almacenar la instancia, donde esta va ejecutar la 
    operacion asincrona la cual va hacer fetch
    */
    fetch('/Json/user.json')
    .then((response) => {
        return response.json()
    })
    /*
    En la linea 12 estamos haciendo una peticion a un archivo local json el cual se llama user.json donde fetch es una promesa
    donde es una promesa si esta se resuelve se va a obtener los datos del archivo json, en la linea 13 estamos encadenamos 
    la promesa que se devuelve por fetch esta cuando se cumpla donde response, se va a dirigir los datos que se realizo con el 
    llamado de archivo local a "response" esto cuando se retorna 
    */
    .then((datos) => {
        const aprendices = datos.users.filter(user => user.aprendiz);
        const promises = aprendices.map(user => {
        return fetch(`https://api.github.com/users/${user.user}`)
            .then(response => response.json())
            .then(userData => ({ name: user.name, avatar: userData.avatar_url }));
        });
        /*
        En la linea 23 datos esta encadenando la promesa que salio de response de esta forma recibiendo los datos que se obtuvieron 
        de response para depues en la linea 24 creamos una constante donde estamos accediendo a la lista usuarios, por medio
        de datos.user para poder utilizar el metodo filtrar para crear un array y filtrar con la condicion que se especifica
        si usuarios son aprendices se filtraran al nuevo array, para despue sen la linea 24 creamos una constante la cual se llama promise
        donde estamos accediendo a aprendices donde estamos utilizando el metodo .map, esto va a iterar sobre cada dato
        que este dentro de aprendices, para despues utilizar la peticion de la api la cuual en el link estamos utilizando
        la interpolacion, El nombre de los usuarios que esta dentro del archivo user.json
        Para despues utilizar el .then en la linea 26 lo que esta haciendo es encadenando la promesa devuelta por medio de fetch 
        para despues manejar los datos esto por medio de response.json() esto para convertir a response en objeto donde se le pasaron
        los datos que se obtuvieron del llamado de la api de git hub ,
        Para depues en la linea 27 estamos obteniendo los datos que se pasaron de response, los cuales se obtuvieron por medio de la api
        de git hub, esto para utilizar el call backs recibiendo el argumento userData para despues returnar donde 
        vamos a ingresar en la propiedad  name donde vamos a ingresar al nombre del usuario original, por medio de user.name
        la propiedad avatar estamos ingresando a la url del avatar por medio de userData.avatar_url
        */
        Promise.all(promises)
        .then(resultado => resolve(resultado))
        .catch(error => reject(error));
        /*
        En la linea 45 esta toma el parametro 
        Promise.all() devuelve una promesa que se cumple cuando todas las promesas del arreglo se resuelven exitosamente,
        y devuelve un arreglo con los resultados de cada promesa. 
        En este caso, el arreglo contendrá objetos con propiedades name y avatar.
        Si alguna de las promesas del arreglo falla, la promesa devuelta por Promise.all() también fallará, y el motivo del fallo será el mismo que el de la primera promesa que falló.
        Por eso, es importante incluir un bloque .catch() para manejar cualquier error que pueda ocurrir
        */
    })
});

prom.then((users) => {//
    console.table(users.map(user => ({
    name: user.name,
    avatar: user.avatar
    })));
    /*
    En la linea 59 Esta línea establece un call backs que se ejecutará cuando la promesa prom se resuelva correctamente. Dentro de esta función, users almacenara los datos de usuario obtenidos después de que la promesa se haya resuelto correctamente.
    en la linea 60 se va a imprimir los datos de forma de tabla pero a traves del metodo .map va iterar sobre
    el array de users esto apra que cada elemento user los retorna los datos hacia un objeto este conteniendo los objetos de la 
    propiedades "name", "avatar"

    */
})