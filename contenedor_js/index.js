const filtrar = (x) => x.name === "Evualacion";
/*En la linea 1, se crea una constante "filtrar" la cual le agregamos un parametro "x" esto porque filtrar se toma como una funcion
  Al momento de agregarle la funcion flecha se esta tomando el parametro "x" o argumento para despues crear una funcion anonima
  la cual se le esta asignando "filtrar" y por medio de la funcion flecha nos permite retornar de una manera implicitamente, sin la necesidad de de agregar un "return"
  Tambien de esta forma a traves de la funcion verificar en la propiedad "name" del elemento "x" o objeto es estrictamente igual a "Evualacion" 
  Lo cual es otra forma supongo que funcionaria asi :
  const filter= function(x){
    return x.name==="Evaulacion "
}
  */
(async () => { 
/*
En la linea 11 se esta creando una funcion asicrona esta permitiendo el uso de await 
atraves del uso de await se permite las operaciones asincronas , como esta fecth que se ejecuten de forma asincrona 
Esta siendo autoejecutable porque le agregamos la funcion de flecha, se creando una funcion anonima auto ejecutable ,esto
permitiendo ejecutar codigo asincrono, esto para encapsular el codigo 
*/
  let response = await fetch('/Json/prueba.json');
  /*
  En la linea 18 estamos creando una variable la cual se llama response, la cual le estamos agregando una promesa con fecth
  la cual estamos solicitando Get (La cual estamos llamando), pero antes de eso utilizamos await esto para esperar que la promesa
  se resuelva, la cual los datos que se van a obtener, van a almacenar dentro de la variable "response"
  */
  let user = await response.json();
  /*
  En la linea 24 creamos una varibale la cual principalmente se le van a pasar los datos almancenados que se obtuvieron
  en la variable response, Pero antes de eso "El porque". en la variable response contiene los datos los cuales fueron
  obtenido por medio de fecth, y para poder extraerlos utilizamos el .json() con el nombre de la variable que es "response"
  con el await estamos esperando la promesa se resuelva, la cual es response.json().Cuando la promesa se resuelve, es decir 
  el archivos json ha sido interpretado con exito. Se va a redirir a la variable user la cual los va a almacenar.
  */
  let respuestGithub = await fetch(`https://api.github.com/users/${user.name}/repos`)
  /*
  En la linea 32 estamos realizar una peticion a la api de git hub para obtener un respositorio o varios. Pero es repositorio ya 
  esta especificado en la linea 17 y 24 el cual se va realizar la peticion de repositorio al usuario YesidStivenPabonCorredorADSO
  donde creamos una variable la cual se va llamar "respuestaGithub" la cual le agregamos un await esto esperando que se cumpla la promesa
  la cual esta realizada por fetch-- el cual esta realizalos la peticion a la api de github, en la url de la api se esta utilizando 
  interpolacion especificando que se va a extraer el respositorio del usuario "YesidStivenPabonCorredorADSO" esto pomedio de "user.name"
  esto haciendo que la peticion se realize a un usuario especificado. Esto porque user contiene lo que ya fue interpretado donde user.name
  hace referencia a la propiedad del contenido que fue interpretado entoces la url quedara asi `https://api.github.com/users/YesidStivenPabonCorredorADSO/repos`
  donde el repositorio se van almacenar dentro de la variable respuestGithub
  */
  let usuariogithub = await respuestGithub.json();
  /*
  En la linea 43 creamos una variable usuaiogithub, donde esta variable se esta llamando los datos que contiene la variable respuestaGithub
  que el .json() estamos haciendo que se los datos dentro de la varibale se interpreten con exito, se va redirigir dentro de la variable
  usuariogithub, esto obteniendo todos mi repositorios.
  Creamos la variable donde le aplicamos un await esto esperando que la promesa se cumpla, que los datos se terminen de interpretar para poder
  dirigirlo a la varibale usuariogithub
  */
  usuariogithub.forEach(element => {
    /*
    En la linea 51 estamos iterando los datos los cuales se obtuvieron a traves de la llamada de la api la cuual los contiene
    la variable usuariogithub, aplicandole un forEach esto para itere sobre cada dato, para depues agregarle una funcion flecha
    donde le agregamos un parametro el cual se llama element, este parametro esta representando el array donde se va a iterar donde este 
    se le va a pasar los datos los cuales este esta iterando, filtrandolo de manera indirecta 
    */
    if (element.name === "Evualacion") {
      console.log(element);
    }
    /*
    Para despues en la linea 58 a 59 estamos agreando una condicional si el parametro element le agregamos la propiedad ".name" es
    estrictamente igual a "Evualacion" donde le agreamos que nos imprima a traves del console.log(elemnt) no imprima los repositorios que
    tenemos, cuando se realizo la llamada de la api de github
    */
  });

  let data = usuariogithub.filter(filtrar)
  console.log(data);
  console.log(usuariogithub)
  /*
  En la linea 68 creamos una variable la cual se llama data donde estamos llamada a la variable usuariogithub donde llamamos
  el metodo .filter este se utiliza para poder crear un nuevo array filtrando los datos del otro array , dentro de filter() llamamos
  el metodo "filtrar" que es un call backs la función filtrar retorna true para los elementos cuyo nombre (name) es igual a "Evualacion",
  false para todos los demás, esto va hacer que los datos que si cumplieron la condicon se va a dirigir a la varibale data 
  en la linea 69 nos va a mostrar el array que se creo por medio del metodo .filter
  A cambio en la linea 70 nos a imprimir todo los datos del repositorio sin ninguna modificacion 
  */
})();
