
const filmes = [
  {
    id: 0,
    nome: 'Harry Potter',
    genero: 'fantasia',
    lancamento: 2001
  },
  {
    id: 1,
    nome: 'Avatar',
    genero: 'fantasia',
    lancamento: 2010
  },
  {
    id: 2,
    nome: 'O Senhor dos Anéis',
    genero: 'fantasia',
    lancamento: 2000
  },
  {
    id: 3,
    nome: 'Branquelas',
    genero: 'comédia',
    lancamento: 2007
  },
  {
    id: 4,
    nome: 'A Lagoa Azul',
    genero: 'romance',
    lancamento: 1983
  }
]


let filmesFavoritos = [];


const btn1 = document.querySelector('button');
const listaFilmes = document.querySelector('#listaFilmes');


const renderizarLista = () => {

  listaFilmes.innerHTML = "";

  const favoritosDoLocalStorage = localStorage.getItem('favoritos');
  filmesFavoritos = favoritosDoLocalStorage ? JSON.parse(favoritosDoLocalStorage) : [];


  filmes.forEach((filme) => {
    const itemLista = document.createElement('li');
    listaFilmes.append(itemLista);

    itemLista.innerHTML = `Meu filme ${filme.nome}`;


    const favorito = document.createElement('img');
    
    const isFavorito = filmesFavoritos.some(f => f.id === filme.id);
    favorito.src = isFavorito ? 'img/heart-fill.svg' : 'img/heart.svg';

    favorito.style.cursor = 'pointer';

    favorito.addEventListener('click', (e) => {
      favoritoClicado(e, filme);
    });

    itemLista.append(favorito);
  });
}

btn1.addEventListener('click', () => {

  const inputUsuario = document.querySelector('#filmeInput');

  let id = filmes.length;

  filmes.push({ id: id, nome: inputUsuario.value, genero: '', lancamento: '' });
  console.log(filmes);

  renderizarLista();

  inputUsuario.value = '';
});

const favoritoClicado = (eventoDeClique, objetoFilme) => {
  const favoriteState = {
    favorited: 'img/heart-fill.svg',
    notFavorited: 'img/heart.svg'
  };
   
  if (eventoDeClique.target.src.includes(favoriteState.notFavorited)) {

    eventoDeClique.target.src = favoriteState.favorited;
    saveToLocalStorage(objetoFilme);
  } else {

    eventoDeClique.target.src = favoriteState.notFavorited;
    removeFromLocalStorage(objetoFilme.id);
  }
}




const saveToLocalStorage = (objetoFilme) => {

  if (localStorage.getItem('favoritos')) {
    filmesFavoritos = JSON.parse(localStorage.getItem('favoritos'));
  }
 
  filmesFavoritos.push(objetoFilme);

  const moviesJSON = JSON.stringify(filmesFavoritos);

  localStorage.setItem('favoritos', moviesJSON);
}


const removeFromLocalStorage = (id) => {
  
  if (localStorage.getItem('favoritos')) {
    filmesFavoritos = JSON.parse(localStorage.getItem('favoritos'));
  }

  const filmesFiltrados = filmesFavoritos.filter(movie => movie.id !== id);
 
  const filmesFiltradosJSON = JSON.stringify(filmesFiltrados);
 
  localStorage.setItem('favoritos', filmesFiltradosJSON);
}





window.onload = () => {
  renderizarLista();
};
