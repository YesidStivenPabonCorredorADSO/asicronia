/**
 * Función asincrónica que obtiene la lista de aprendices y sus respectivos repositorios públicos en GitHub.
 */
async function repositorios() {
    try {
    /**
       * realizamos una petición al archivo "user.json" y obtenemos los datos en formato JSON.
       */
    let response = await fetch('/Json/user.json');
    let datos = await response.json();
    /**
       * creamos un array de aprendices filtrando los usuarios que tienen el rol de aprendiz.
       */
    const aprendices = datos.users.filter(user => user.aprendiz);
    /**
       * creamos un array esto por medio del metodo .filter de promesas que se encargan de obtener la información de cada aprendiz en GitHub.
       * utilizamos el método map para iterar sobre los aprendices y crear una promesa para cada uno.
       * donde cada promesa se encarga de realizar una solicitud a la API de GitHub para obtener la información del usuario.
       * para luego, extraemos los datos de la respuesta y creamos un objeto con la información del usuario.
       */
    const promises = aprendices.map(async user => {
        let userResponse = await fetch(`https://api.github.com/users/${user.user}`);
        let userData = await userResponse.json();

        return { name: user.name, user: user.user, repos: userData.public_repos, aprendiz: user.aprendiz };
    });

    /**
       * esperando a que se completen todas las promesas utilizando Promise.all().
       * esto nos tranforma array con la información de todos los aprendices.
       */
    let resultado = await Promise.all(promises);

/**
       * devolvemos el resultado.
       */
return resultado;
    } catch (error) {
    /**
       * si ocurre algún error durante la ejecución de la función, lo capturamos en el bloque catch y lo re-lanzamos.
       */
    throw error;
    }
}

/**
   * llamamos a la función "repositorios" y luego encadenamos un then para manejar el resultado.
   */
repositorios().then(users => {
    /**
     * filtramos los resultados para obtener solo los usuarios con menos de 5 repositorios públicos.
     */
    let filtrar_results = users.filter(user => user.repos < 5);
    /**
     * filtramos los resultados para obtener solo los usuarios con la palabra "JavaScript" en el nombre del repositorio.
     */
    filtrar_results = filtrar_results.filter(user => user.name.toLowerCase().includes('javascript'));
    /**
     * ordenamos los resultados de menor a mayor según el nombre del repositorio.
     */
    filtrar_results.sort((a, b) => a.name.localeCompare(b.name));
    /**
     * filtramos los resultados para obtener solo los usuarios con más de cinco letras en el nombre del repositorio.
     */
    filtrar_results = filtrar_results.filter(user => user.name.length > 5);
    /**
     * mostramos los resultados en una tabla en la consola.
     */
    console.table(filtrar_results.map(user => ({
    name: user.name,
    user: user.user,
    repos: user.repos,
    aprendiz: user.aprendiz
    })));
}).catch(error => {
    /**
     * si ocurre algún error durante la ejecución de la función, lo capturamos en el bloque catch y lo mostramos en la consola como un mensaje de error.
     */
    console.error('Error', error);
});