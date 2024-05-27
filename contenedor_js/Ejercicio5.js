/**
 * función asincrónica que transforma los datos de usuarios obtenidos desde el archivo "user.json".
 */
async function transfor() {
    try {
    /**
       * realizamos una petición al archivo "user.json" y obtenemos los datos en formato JSON.
       */
    const response = await fetch("/Json/user.json");
    const data = await response.json();
  
    /**
       * creamos un proxy para interceptar las operaciones de escritura en el objeto "users".
       * esto nos permite validar y transformar los datos antes de que sean asignados al objeto.
       */
    const proxy = new Proxy(data.users, {
        /**
         * el método "set" se ejecuta cada vez que se intenta asignar un valor a una propiedad del objeto "users".
         * en este caso, validamos si la propiedad que se está intentando asignar es "name".
         * si es así, verificamos si el valor cumple con el formato de solo letras mayúsculas.
         * si el valor no cumple con el formato, lanzamos un error.
         * si el valor cumple con el formato, asignamos el valor al objeto y devolvemos "true".
         */
        set: function (target, property, value) {
        if (property === "name") {
            if (/^[A-Z]+$/.test(value)) {
            target[property] = value.toUpperCase();
            } else {
            throw new Error("Solo se permiten letras mayúsculas.");
            }
        } else {
            target[property] = value;
        }
        return true;
        },
    });

    /**
       * iteramos sobre el objeto "proxy" y transformamos los datos de los usuarios que tienen el rol de aprendiz.
       * si el nombre del usuario tiene más de dos palabras, lo convertimos a mayúsculas.
       * si el nombre de usuario incluye "ADSO", lo convertimos a mayúsculas.
       */
    proxy.forEach((user) => {
        if (user.aprendiz) {
        if (user.name.split(" ").length > 2) {
            user.name = user.name.toUpperCase();
        }
        if (user.user.includes("ADSO")) {
            user.name = user.name.toUpperCase();
        }
        }
    });

    /**
       * imprimimos el objeto "proxy" en la consola para verificar si los datos se transformaron
       */
    console.log(proxy);
    } catch (error) {
    /**
       * si ocurre un error durante la ejecución de la función, lo capturamos en el bloque catch y se mostrara en la consola como un mensaje de error.
       */
    console.error("Error :", error);
    }
}

/**
   * Se llama a la función "transfor" para ejecutarla.
   */
transfor();