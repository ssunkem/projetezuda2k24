// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyD0WkFuUuB4CYxpZ2qGCdzh5329yJWHQiA",
    authDomain: "projete-2024.firebaseapp.com",
    projectId: "projete-2024",
    storageBucket: "projete-2024.appspot.com",
    messagingSenderId: "775611315252",
    appId: "1:775611315252:web:cdafe5270c752bc2208661"
};

// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log('Tentando login com:', email);
    
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log('Login bem-sucedido:', userCredential);
            // Login bem-sucedido
            window.location.href = 'home.html';
        })
        .catch((error) => {
            console.error('Erro ao fazer login:', error);
            alert('Falha no login. Verifique suas credenciais e tente novamente.');
        });
});