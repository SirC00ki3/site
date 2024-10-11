// Variáveis globais para o carrinho
let cart = [];
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');

// Função para adicionar itens ao carrinho
function addToCart(nome, preco) {
    const itemIndex = cart.findIndex(item => item.nome === nome);
    if (itemIndex !== -1) {
        cart[itemIndex].quantidade += 1;
    } else {
        cart.push({ nome, preco, quantidade: 1 });
    }
    updateCart();
}

// Função para atualizar o carrinho
function updateCart() {
    cartCount.textContent = cart.reduce((total, item) => total + item.quantidade, 0);
    cartItems.innerHTML = ''; // Limpar o carrinho antes de atualizá-lo
    if (cart.length > 0) {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <h4>${item.nome}</h4>
                <p>R$ ${item.preco.toFixed(2)} x ${item.quantidade}</p>
            `;
            cartItems.appendChild(cartItem);
        });
    } else {
        cartItems.innerHTML = '<p>Seu carrinho está vazio.</p>';
    }
}

// Função para abrir/fechar o modal do carrinho
function toggleCart() {
    const cartModal = document.getElementById('cartModal');
    cartModal.style.display = (cartModal.style.display === 'block' ? 'none' : 'block');
}

// Função para pesquisar produtos
async function search() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();

    if (!searchInput) {
        const produtos = document.querySelectorAll('.produto');
        produtos.forEach(produto => produto.style.display = 'block');
        return;
    }

    try {
        const response = await fetch(`https://api.exemplo.com/produtos?search=${encodeURIComponent(searchInput)}`);
        if (!response.ok) {
            throw new Error('Erro ao buscar produtos');
        }
        const data = await response.json();
        displayProducts(data);
    } catch (error) {
        console.error('Erro:', error);
        alert('Não foi possível buscar produtos. Tente novamente mais tarde.');
    }
}

// Função para exibir produtos na página
function displayProducts(produtos) {
    const gridProdutos = document.querySelector('.grid-produtos');
    gridProdutos.innerHTML = ''; // Limpa a lista atual de produtos

    if (produtos.length === 0) {
        gridProdutos.innerHTML = '<p>Nenhum produto encontrado.</p>';
        return;
    }

    produtos.forEach(produto => {
        const produtoElement = document.createElement('div');
        produtoElement.className = 'produto';
        produtoElement.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}">
            <h3>${produto.nome}</h3>
            <p>R$ ${produto.preco.toFixed(2)}</p>
            <a href="#" class="btn-comprar" onclick="addToCart('${produto.nome}', ${produto.preco})">Comprar</a>
        `;
        gridProdutos.appendChild(produtoElement);
    });
}

// Fechar o modal ao clicar fora
window.onclick = function(event) {
    const cartModal = document.getElementById('cartModal');
    if (event.target === cartModal) {
        cartModal.style.display = 'none';
    }
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Códigos de inicialização podem ser colocados aqui
});
