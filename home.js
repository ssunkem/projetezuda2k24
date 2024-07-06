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
const db = firebase.firestore();
const storage = firebase.storage();

const gallery = document.querySelector('.gallery');
const loadMoreButton = document.getElementById('loadMore');

let lastVisible = null;

// Verifica se o usuário está autenticado
auth.onAuthStateChanged(user => {
    if (user) {
        // Usuário está autenticado, carregar fotos
        loadPhotos();
    } else {
        // Usuário não está autenticado, redirecionar para a tela de login
        window.location.href = 'index.html';
    }
});

// Função para carregar fotos do Firestore
const loadPhotos = async () => {
    let query = db.collection('photos').orderBy('timestamp').limit(6);
    
    if (lastVisible) {
        query = query.startAfter(lastVisible);
    }

    const snapshot = await query.get();
    
    if (snapshot.empty) {
        loadMoreButton.disabled = true;
        loadMoreButton.textContent = "No more photos";
        return;
    }
    
    lastVisible = snapshot.docs[snapshot.docs.length - 1];
    
    snapshot.forEach(doc => {
        const photoData = doc.data();
        const photoCard = document.createElement('div');
        photoCard.className = 'photo-card';
        
        const img = document.createElement('img');
        img.src = photoData.url;
        photoCard.appendChild(img);
        
        const date = document.createElement('p');
        date.textContent = `Data: ${new Date(photoData.timestamp.seconds * 1000).toLocaleDateString()}`;
        photoCard.appendChild(date);
        
        const time = document.createElement('p');
        time.textContent = `Hora: ${new Date(photoData.timestamp.seconds * 1000).toLocaleTimeString()}`;
        photoCard.appendChild(time);
        
        gallery.appendChild(photoCard);
    });
};

loadMoreButton.addEventListener('click', loadPhotos);
