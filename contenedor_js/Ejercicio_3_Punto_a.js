async function repositorios() {
    /*
    en la primera línea de código estamos creando una función asincrónica llamada "repositorios".
    esta función se encargará de obtener la lista de aprendices y sus respectivos repositorios públicos en GitHub.
    */
    try {
        /*
        en la línea de código try agregamos para manejar cualquier excepción que pueda ocurrir durante la ejecución de la función.
        */
        let response = await fetch('/Json/user.json');
        /*
        realizamos una petición dentro del archivo local "user.json". Utilizamos await para esperar la resolución de la promesa devuelta por fetch, 
        lo que significa que el código esperará hasta que la solicitud se complete y se obtenga la respuesta.
        */
        
        let datos = await response.json();
        /*
        extraemos los datos del cuerpo de la respuesta utilizando el método json() proporcionado por el objeto Response.
        esto convierte los datos de la respuesta en un objeto que podemos manipular.
        */
        const aprendices = datos.users.filter(user => user.aprendiz);
        /*
        en la línea 21 estamos creando una constante llamada "aprendices", estamos ingresando los datos que están dentro de la variable "datos", 
        por medio de la vamos a filtrar los cuales se van a iterar estos para crear un nuevo array con los elementos que cumplan las condiciones 
        se pasará al nuevo array. En este caso, estamos filtrando solo los usuarios que tienen el rol de aprendiz.
        */
        const promises = aprendices.map(user =>
            fetch(`https://api.github.com/users/${user.user}`)
            .then(response => response.json())
            .then(userData => ({name: user.name ,user: user.user, repos: userData.public_repos, aprendiz: user.aprendiz}))
        );
        /*
        creamos un array de promesas llamado "promises". Cada promesa representa una solicitud a la API de GitHub para obtener información de usuario y número de repositorios públicos. 
        utilizamos el método map para iterar sobre los usuarios filtrados. Realizamos una solicitud a la API de GitHub para obtener información sobre el usuario. 
        la URL se construye dinámicamente utilizando el nombre de usuario de cada usuario. Extraemos los datos de la respuesta de la API de GitHub utilizando el método json(). 
        donde si la promesa se resuelve, va a retornar con el nombre del usuario, su nombre de usuario, el número de repositorios públicos y su rol de aprendiz.
        */

        return Promise.all(promises);
        /*
        esperamos a que se completen todas las promesas utilizando Promise.all(). Esto nos da un array con la información de todos los usuarios.
        */
    } catch (error) {
        throw error;
        /*
        si ocurre algún error durante la ejecución de la función, lo capturamos en el bloque catch y lo re-lanzamos para que pueda ser manejado en la siguiente parte del código.
        */
    }
}

repositorios().then(users => {
    console.table(users);
    /*
    llamamos a la función "repositorios" y luego encadenamos un then para manejar el resultado. En este caso, imprimimos una tabla en la consola con la información de los usuarios.
    */
}).catch(error => {
    console.error('Error:', error);
    /*
    si ocurre algún error durante la ejecución de la función, lo capturamos en el bloque catch y lo mostramos en la consola como un mensaje de error.
    */
});