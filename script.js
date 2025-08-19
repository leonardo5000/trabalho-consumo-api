const content = document.getElementById('content');
let page = Number(window.location.hash.replace("#", ""))
let maxpage = 0

async function getCharacters() {
  const response = await fetch(`https://rickandmortyapi.com/api/character${isNaN(page) ? '' : '?page=' + page}`)
  const data = await response.json()
  maxpage = data.info.pages
  const lista = document.createElement('ul')
  let characters = ''
  
  data.results.forEach(element => {
    characters += `<li>
      <a href="detail.html#${element.id}">${element.name}</a>
      <img src="${element.image}" alt="${element.name}"/>
    </li>`
  });
  
  lista.innerHTML = characters
  content.appendChild(lista)

  let paginate
  if (!page || page === 1) {
    paginate = ` <button id="next" onClick="next()">Próximo</button>`
  }
  if (page > 1 && page < maxpage) {
    paginate = ` <button id="prev" onClick="prev()">Anterior</button>
    <button id="next" onClick="next()">Próximo</button>`
  }
  if (page >= maxpage) {
    paginate = ` <button id="prev" onClick="prev()">Anterior</button>`
  }

  document.getElementById('paginate').innerHTML = paginate
}
getCharacters()

function next() {
  const newPage = page === 0 ? 2 : page + 1
  window.location.hash = "#" + newPage
  window.location.reload()
}

function prev() {
  const newPage = page === 0 ? 2 : page - 1
  window.location.hash = "#" + newPage
  window.location.reload()
}

async function searchById() {
  const id = document.getElementById('characterIdInput').value;
  if (!id || isNaN(id)) {
    alert("Por favor, digite um ID válido!");
    return;
  }
  window.location.href = `detail.html#${id}`;
}

async function fetchCharacters() {
  try {
    const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
    const data = await response.json();
    maxPage = data.info.pages;

    content.innerHTML = '';

    const characterList = document.createElement('div');
    characterList.className = 'character-list';

    data.results.forEach(character => {
      characterList.innerHTML += `
        <div class="character-item">
          <img src="${character.image}" alt="${character.name}" width="100">
          <h3 class="character-name" onclick="viewCharacter(${character.id})">${character.name}</h3>
          <p><strong>Status:</strong> ${character.status}</p>
          <a href="detail.html#${character.id}" class="detail-link">Ver detalhes</a>
        </div>
      `;
    });
    content.appendChild(characterList);
    renderPagination();

  } catch (error) {
    content.innerHTML = `<p>Erro ao carregar personagens: ${error.message}</p>`;
  }
}
function viewCharacter(id) {
  window.location.href = `detail.html#${id}`;
}
