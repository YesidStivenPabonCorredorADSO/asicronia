const filtrar = (x) => x.name === "Evualacion";//En esta linea de codigo principalmente estamos creando una constante filtrar creando un arrow function por lo cual nos esta se le agrega un parametro la cual es x le estamos asignando con la arrow fuction que va a filtrar los elementos del json los cuales tenga pre clave que tenga "name" los cuales le agregamos una designacion para saber si tienen concidencia 
(async () => {//Esta es una funcion asicrona donde estamos utilizando el asycn/await
  let response = await fetch('prueba.json');//En esta linea de codigo estamos llamando el json el cual esta pasando los datos del json, pero se le esta indicando con el await que espere, pero como tal el await se convierte en una promesa 
  let user = await response.json();
//En user se le pasa los parametros osea los datos los cuales fueron extraidos de response pero estos
  let respuestGithub = await fetch(`https://api.github.com/users/${user.name}/repos`)//respuestGithub estamos llamando ya que el await se esta convirtiendo en una promesa
  let usuariogithub = await respuestGithub.json();//Este va a obtener los datos los cuales se va a dirigir de respuestaGithub donde se va a iterar
  usuariogithub.forEach(element => {//agreandole 
    if (element.name === "Evualacion") {
      console.log(element);
    }
  });

  let data = usuariogithub.filter(filtrar)
  console.log(data);
  console.log(usuariogithub)
})();
