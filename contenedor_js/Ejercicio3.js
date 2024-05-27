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
        const promises = aprendices.map(async user => {
            let userResponse = await fetch(`https://api.github.com/users/${user.user}`)
            let userData = await userResponse.json();
            return { name: user.name, avatar: userData.avatar_url };
        });

        let resultado = await Promise.all(promises);
        return resultado;
    } catch (error) {
        throw error;
    }
}

llamar_usuario().then(users => {
    console.table(users.map(user => ({
        name: user.name,
        avatar: user.avatar
    })));
}).catch(error => {
    console.error('Error fetching users:', error);
});