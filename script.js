document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('livroForm');
    const livrosList = document.getElementById('livrosList');
    
    // Função para carregar livros do LocalStorage
    function carregarLivros() {
        const livros = JSON.parse(localStorage.getItem('livros')) || [];
        livrosList.innerHTML = '';
        livros.forEach(function(livro) {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.textContent = `Título: ${livro.titulo}, Autor: ${livro.autor}`;
            const btnRemover = document.createElement('button');
            btnRemover.className = 'btn btn-danger btn-sm';
            btnRemover.textContent = 'Remover';
            btnRemover.addEventListener('click', function() {
                removerLivro(livro.titulo);
            });
            li.appendChild(btnRemover);
            livrosList.appendChild(li);
        });
    }

    // Função para adicionar um novo livro
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const titulo = document.getElementById('tituloLivro').value;
        const autor = document.getElementById('autorLivro').value;
        const livros = JSON.parse(localStorage.getItem('livros')) || [];
        
        // Verificar se o livro já existe
        const livroExistente = livros.some(livro => livro.titulo === titulo);
        if (livroExistente) {
            alert('Este livro já foi adicionado.');
            return;
        }

        livros.push({ titulo, autor });
        localStorage.setItem('livros', JSON.stringify(livros));
        carregarLivros();
        form.reset();
    });

    // Função para remover um livro
    function removerLivro(titulo) {
        const livros = JSON.parse(localStorage.getItem('livros')) || [];
        const livrosAtualizados = livros.filter(livro => livro.titulo !== titulo);
        localStorage.setItem('livros', JSON.stringify(livrosAtualizados));
        carregarLivros();
    }

    // Carregar livros ao inicializar
    carregarLivros();
});
