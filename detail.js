const content = document.getElementById('detail');
let id = Number(window.location.hash.replace("#", ""))

async function getCharacterDetails() {
  if (!id) {
    content.innerHTML = "<p>Personagem não encontrado!</p>";
    return;
  }

  try {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    const character = await response.json();

    content.innerHTML = `
      <div class="character-card">
        <h2>${character.name}</h2>
        <img src="${character.image}" alt="${character.name}" width="200">
        <p><strong>Espécie:</strong> ${character.species}</p>
        <p><strong>Gênero:</strong> ${character.gender}</p>
        <p><strong>Mundo/Dimensão:</strong> ${character.origin.name}</p>
        <p><strong>Status:</strong> ${character.status}</p>
        <a href="index.html">Voltar para a lista</a>
      </div>
    `;
  } catch (error) {
    content.innerHTML = "<p>Erro ao carregar o personagem.</p>";
  }
}

getCharacterDetails();