// Solucione el mismo ejercicio, utilizando solo promesas no
// async/await
const filtrar= function(x){
  return x.name==="Evaulacion"
}
/*
En la linea 3 a 4 estamos creando una constante la cual llamamos filtrar la cual le agregamos una funcion anonima
dentro de esa funcion anonima le agregamos el parametro x Pero esta ves si le agregamos un return donde x 
. name este siendo la propiedad del objeto o mejor dicho la pre clave del archivo json  es estrictamente igual a
"Evaulacion" si no cumple esa condicion, entoces nos va a retornar false 
*/
fetch('/Json/prueba.json')
/*
En esta linea 12 estamo utilizando fecth esta vez para llamar realziar una solicitud al archivo prueba.json la
cual es un archivo local pero de igual forma estamos realizando una promesa esta promesa se cumple, porque la url del
archivo local esta bien, si estuviera mal  nos aparece esto "Uncaught (in promise) SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON"
*/
  .then((response) =>response.json())
  /*
  En la linea 18 estamos encadenandomos a la promesa esta siendo "fetch" la cual los datos los va a recibir el parametro
  response donde de manera implicita nos va retornar esto por medio de los funcion de flechas, pero para que response 
  obtenga los datos, tenemos que utilizar response.json el cual este va a extraer los datos del archivo json local, cuando se cumpla, la 
  extraccion de los datos se va a devolver la promesa donde response se le paso los datos del archivo local json 
  */
  .then((user)=>{
    return fetch(`https://api.github.com/users/${user.name}/repos`)
  })
  /*
  En la linea 25 a 26 encadenamos la promesa devuelta por response donde se le pasa los datos a "user" recibiendo los datos extraidos
  para despues esta realizar un return cuando ya tenga los datos, retorna para realizar una peticion a la api de git hub esto para obtener
  los repositorios de usuario que esta especificado dentro del archivo json local, cual ya fue extraido por medio de response, para terminar
  de pasarlo a user, donde en la url se realiza una interpolacion que esta especificando el nombre del usuario 
  https://api.github.com/users/YesidStivenPabonCorredorADSO/repos
  */
  .then((respues_github) => {
    return respues_github.json()
  })
  /*
  En la linea 35 a 36 estamos encadenamos la promesa fetch donde se esta pasando los datos (los repositorios) al parametro respues_github
  estos se va a extraer por medio de repues_github.json() donde si se cumple esta promesa se va redirigir a respues_github donde va almacenar
  los datos de mi respositorio 
  */
  .then((usuariogit) => {
    /*
    En la linea estamos encadenando la promesa que fue devuelta por respues_github que se complento de este modo se extrae 
    los datos y se almancenan en usuariogit
    */
    let datos=usuariogit.filter(filtrar)
    console.log(datos)
    console.log(usuariogit)
    /*
    Linea 59 creamos una varibale que se llama datos donde estamos diciendo que usuariogit .filter donde vamos a crear un nuevo
    array que en eso consite el metodo, pero para despues llamar el metodo filtrar este para verificar si algunos de los datos conciden 
    con el nombre "Evaulacion", en la linea 60 nos va imprimir las concidencias se agrego, si no ahi ninguna concidencia el array ya a quedar vacio
    en la linea 61 se imprimir los datos sin ninguna modificacion 
    */
  })

