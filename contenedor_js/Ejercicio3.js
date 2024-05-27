async function llamar_usuario() {
    /*
    En la primera linea de codigo estamos creando una funcion asincrona 
    */
    try {
        /*
        En la linea de codigo try agregamos para el manejar cualquier excepcion  
        */
        let response = await fetch('/Json/user.json');
        /*
        Realizamos una peticion dentro del archivo local 
        user.json. Utilizamos await para esperar la resolución de la promesa devuelta por fetch, 
        lo que significa que el código esperará hasta que la solicitud se complete y se obtenga la respuesta
        */
        
        let datos = await response.json();
        /*
        Extraemos los datos del cuerpo de la respuesta utilizando el método json() proporcionado por el objeto Response.
        Esto convierte los datos de la respuesta en un objeto
        */
        const aprendices = datos.users.filter(user => user.aprendiz);
        /*
        En la linea 21 estamos creando una constante, estamos ingresando los datos los cuales estan dentro  la variable 
        datos, por medio la vamos a filtrar los cuales se van a iterar estos para crear un nuevo array con los elementos que cumplan
        las condiciones se pasara al nuevo array 
        */
        const promises = aprendices.map(async user => {
            let userResponse = await fetch(`https://api.github.com/users/${user.user}`)
            let userData = await userResponse.json();
            return { name: user.name, avatar: userData.avatar_url };
        });
        /*
        creamos un array de promesas llamado promises. Cada promesa representa una solicitud a la api de github para obtener información de usuario y avatar. Utilizamos el método map para iterar sobre los usuarios filtrados.
        realizamos una solicitud a la api de github para obtener información sobre el usuario. La URL se construye dinámicamente utilizando el nombre de usuario de cada usuario.
        extraemos los datos de la respuesta de la api de github utilizando el método json()
        donde si la promesa se resuelve va a retornar con el nombre del usuario y su avatar 
        */

        let resultado = await Promise.all(promises);
        return resultado;
    } catch (error) {
        throw error;
    }
    /*
    Esperamos a que se completen todas las promesas utilizando Promise.all(). Esto nos da un array con la información de todos los usuarios
    va a retornar con los datos osea el array con la informacion de los usuarios 
    el catch esto para el manejo de un error dentro del bloque de try este catch caputara el error 
    */
}

llamar_usuario().then(users => {
    console.table(users.map(user => ({
        name: user.name,
        avatar: user.avatar
    })));
    /*
    Llamamos a la función llamar_usuario y luego encadenamos un then para manejar el resultado. En este caso, imprimimos una tabla en la consola con los nombres y avatares de los usuarios.
    */
}).catch(error => {
    console.error('Error fetching users:', error);
});
/*
Si ocurre algún error durante la ejecución de la función, lo capturamos en el bloque catch y lo mostramos en la consola como un mensaje de error.
*/