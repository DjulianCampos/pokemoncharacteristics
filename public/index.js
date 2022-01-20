function loadPk(pokeName) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
        .then(response => response.json())
        .catch(error => console.error(error));
}

document.querySelector('#submit').addEventListener('click', async () => {
    let res = document.querySelector('#res');
    let pokeName = document.querySelector('#pokemon').value.toLowerCase();
    let pokemon = await loadPk(pokeName);
    let img = document.createElement('img');
    img.setAttribute('src', pokemon.sprites.front_default);
    res.innerHTML = `
    Nome: ${pokemon.name}<br>
    Habilidades: ${pokemon.abilities.map(ability => ability.ability.name).join(', ')}<br>
    Tipo: ${pokemon.types.map(type => type.type.name).join(', ')}<br>
    <!-- pega sómente alguns movimentos -->
    Movimentos: ${pokemon.moves.map(move => move.move.name).slice(0, 4).join(', ')}<br>
    `
    res.appendChild(img);

    if (!pokemon) {
        res.innerHTML = 'Pokemon não encontrado, verifique se você colocou o nome correto.';
    }
})