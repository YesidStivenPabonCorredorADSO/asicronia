async function getUsers() {
    try {
        let response = await fetch('/Json/user.json');
        let datos = await response.json();

        const aprendices = datos.users.filter(user => user.aprendiz);


        const promises = aprendices.map(async user => {
            let userResponse = await fetch(`https://api.github.com/users/${user.user}`)
            let userData = await userResponse.json();
            return { 
                name: userData.name, 
                user: userData.login, 
                repos: userData.public_repos, 
                aprendiz: userData.site_admin 
            };
        });


        let resultado = await Promise.all(promises);


        let filteredResult = resultado.filter(user => user.site_admin === false);
        return filteredResult;
    } catch (error) {
        throw error;
    }
}

getUsers().then(users => {
    console.table(users.map(user => ({
        name: user.name,
        user: user.login,
        repos: user.public_repos,
        aprendiz: user.site_admin
    })));
}).catch(error => {
    console.error('Error fetching users:', error);
});