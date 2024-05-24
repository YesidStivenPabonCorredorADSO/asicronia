// Solucione el mismo ejercicio, utilizando solo promesas no
// async/await
const filtrar = (x) => x.name === "Evualacion";
fetch('prueba.json')
  .then((response) =>response.json())
  .then((user)=>{
     return fetch(`https://api.github.com/users/${user.name}/repos`)
  })
  .then((respues) => {
    return respues.json()
  })
  .then((fil) => {
    let e=fil.filter(fil)
  })
