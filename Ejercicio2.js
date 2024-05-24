// Lea el archivo users.json suministrado por el instructor y tome como base
// las capturas para luego mostrar todos los datos de usuario de cada
// aprendiz, este ejercicio de desarrolla con promesas.
// a. Imprima el resultado en una tabla donde solo nos mostrar el nombre
// y el avatar de cada aprendiz
// function leer() {
//   fetch('user.json')
//     .then((responde) => {
//       return responde.json();
//     })
//     .then((datos) => {
//       console.log(datos)
//         for (const iterator of datos) {
//       console.log(iterator)
//   }
//     })
// }
// leer()
let promesa = new Promise((resolve, reject) => {
    fetch("user.json")
    .then((response) => response.json())
    .then((data) => {
        const aprendices = data.users.filter(user => user.aprendiz);
        const promises = aprendices.map(user => {
            return fetch(`https://api.github.com/users/${user.name}`)
                    .then(response => response.json())
                    .then(userData => ({ name: user.name, avatar: userData.avatar_url }));
        });

        Promise.all(promises)
            .then(resultado => resolve(resultado))
            .catch(error => reject(error));
    })
    .catch((error) => {
        reject(error);
    });
});

promesa.then((resultado) => {
    console.table(resultado);
}).catch((error) => {
    console.error('Error:', error);
});