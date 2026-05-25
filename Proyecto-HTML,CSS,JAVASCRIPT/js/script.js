let usuarios = [
    {
        nombre: "Prueba",
        email: "test@gmail.com",
        password: "1234",
        tmb: 1600,
        favoritos: []
    }
];

const baseRecetas = [

    { id: 1, nombre: "Ensalada Ligera de Pollo y Aguacate", tipo: "definicion", rango: "bajo", kcal: 350, desc: "Baja en calorías, ideal para metabolismos ajustados que buscan perder grasa sin pasar hambre." },
    { id: 2, nombre: "Tortilla de Espinacas y 2 Claras", tipo: "definicion", rango: "bajo", kcal: 220, desc: "Cena ligera, saciante y con muy pocas calorías para asegurar el déficit." },

    { id: 3, nombre: "Salmón a la Plancha con Champiñones", tipo: "mantenimiento", rango: "bajo", kcal: 500, desc: "Grasas saludables y proteínas de alta calidad para mantener el peso de forma equilibrada." },
    { id: 4, nombre: "Crema de Verduras con Pavo picado", tipo: "mantenimiento", rango: "bajo", kcal: 450, desc: "Fácil de digerir y perfecta para mantener el tono muscular en metabolismos moderados." },

    { id: 5, nombre: "Bowl de Avena con Plátano y Miel", tipo: "volumen", rango: "bajo", kcal: 650, desc: "Aporte extra de energía y carbohidratos saludables para subir de peso de forma limpia." },
    { id: 6, nombre: "Arroz con Pollo y un puñado de Nueces", tipo: "volumen", rango: "bajo", kcal: 700, desc: "Comida densa en nutrientes orientada a ganar masa muscular sin pasarse de calorías." },

    // --- DIETAS RANGO ALTO (>= 2000 kcal en total) ---
    { id: 7, nombre: "Ensalada de Pollo, Aguacate y Pasta", tipo: "definicion", rango: "alto", kcal: 550, desc: "Diseñada para personas con metabolismo alto. Permite perder grasa manteniendo un buen rendimiento." },
    { id: 8, nombre: "Tortilla con Pavo y Queso Light", tipo: "definicion", rango: "alto", kcal: 480, desc: "Gran aporte de proteínas para proteger la masa muscular en metabolismos exigentes." },

    { id: 9, nombre: "Salmón a la Plancha con Arroz Integral", tipo: "mantenimiento", rango: "alto", kcal: 800, desc: "Plato contundente con carbohidratos complejos y Omega-3 para metabolismos muy activos." },
    { id: 10, nombre: "Pasta Integral boloñesa con Ternera Magra", tipo: "mantenimiento", rango: "alto", kcal: 850, desc: "Aporte energético elevado para mantener el peso y cubrir el desgaste diario." },

    { id: 11, nombre: "Batido de Avena, Plátano, Crema de Cacahuete y Leche", tipo: "volumen", rango: "alto", kcal: 1100, desc: "Bomba calórica saludable. Ideal para metabolismos rápidos a los que les cuesta subir de peso." },
    { id: 12, nombre: "Arroz con Ternera, Huevo frito y Aguacate", tipo: "volumen", rango: "alto", kcal: 1250, desc: "Plato hipercalórico y denso para fases de volumen exigentes en personas grandes o muy activas." }
];

const entrenamientos = {
    definicion: "<strong>Cardio HIIT:</strong> 20 minutos de intervalos intensos + 15 minutos de caminata en pendiente para maximizar la quema de grasa.",
    mantenimiento: "<strong>Rutina Híbrida:</strong> 3 días de fuerza full-body + 2 días de cardio moderado para mantener tono y salud cardiovascular.",
    volumen: "<strong>Rutina de Fuerza (Hipertrofia):</strong> 4 días enfocados en movimientos compuestos (Sentadillas, Press Banca) con cargas pesadas."
};

let usuarioLogueado = null;
let objetivoActual = "definicion";


function switchView(viewId) {
    document.querySelectorAll('.view').forEach(view => view.classList.remove('active'));
    document.getElementById(viewId).classList.add('active');
}


function handleRegister(e) {
    e.preventDefault();
    const nombre = document.getElementById('reg-nombre').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const peso = parseFloat(document.getElementById('reg-peso').value);
    const altura = parseFloat(document.getElementById('reg-altura').value);
    const edad = parseInt(document.getElementById('reg-edad').value);
    const genero = document.getElementById('reg-genero').value;
    const actividad = parseFloat(document.getElementById('reg-actividad').value);

    if (usuarios.find(u => u.email === email)) {
        alert("Este correo ya está registrado.");
        return;
    }

    let tmbRefinada = 0;
    if (genero === "hombre") {
        tmbRefinada = (10 * peso) + (6.25 * altura) - (5 * edad) + 5;
    } else {
        tmbRefinada = (10 * peso) + (6.25 * altura) - (5 * edad) - 161;
    }
    const tmbFinal = Math.round(tmbRefinada * actividad);

    const nuevoUsuario = {
        nombre: nombre,
        email: email,
        password: password,
        tmb: tmbFinal,
        favoritos: []
    };

    usuarios.push(nuevoUsuario);
    usuarioLogueado = nuevoUsuario;

    entrarAlDashboard();
}


function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-password').value;

    const user = usuarios.find(u => u.email === email && u.password === pass);

    if (user) {
        usuarioLogueado = user;
        entrarAlDashboard();
    } else {
        alert("Credenciales incorrectas. Prueba con test@gmail.com y contraseña 1234");
    }
}


function entrarAlDashboard() {
    switchView('view-dashboard');
    document.getElementById('user-nav').style.display = 'flex';
    document.getElementById('nav-username').innerText = `Hola, ${usuarioLogueado.nombre}`;
    document.getElementById('dash-tmb').innerText = usuarioLogueado.tmb;

    cargarContenido();
}

function setObjetivo(obj) {
    objetivoActual = obj;
    document.querySelectorAll('.btn-objetivo').forEach(btn => btn.classList.remove('selected'));
    if (obj === 'definicion') document.getElementById('btn-def').classList.add('selected');
    if (obj === 'mantenimiento') document.getElementById('btn-man').classList.add('selected');
    if (obj === 'volumen') document.getElementById('btn-vol').classList.add('selected');

    cargarContenido();
}


function cargarContenido() {
    document.getElementById('entrenamiento-contenido').innerHTML = entrenamientos[objetivoActual];

    let rangoUsuario = "bajo";
    if (usuarioLogueado.tmb >= 2000) {
        rangoUsuario = "alto";
    }

    const container = document.getElementById('recetas-container');
    container.innerHTML = "";

    const recetasFiltradas = baseRecetas.filter(receta => {
        return receta.tipo === objetivoActual && receta.rango === rangoUsuario;
    });

    recetasFiltradas.forEach(receta => {
        const esFav = usuarioLogueado.favoritos.includes(receta.id);

        const card = document.createElement('div');
        card.className = 'receta-card';


        card.innerHTML = `
            <div class="receta-header">
                <h4>${receta.nombre}</h4>
                <span class="kcal-tag">${receta.kcal} Kcal</span>
            </div>
            <p style="font-size:0.8rem; color:#27ae60; font-weight:bold; margin-top:0.2rem;">
                 Adaptada a tu TMB (${rangoUsuario === 'bajo' ? 'Rango < 2000 kcal' : 'Rango >= 2000 kcal'})
            </p>
            <p style="margin: 0.5rem 0; font-size:0.9rem; color:#555;">${receta.desc}</p>
            <button class="btn-fav ${esFav ? 'is-fav' : ''}" onclick="toggleFavorito(${receta.id})">
                ${esFav ? 'Quitar de Favoritos' : 'Guardar en Favoritos'}
            </button>
        `;
        container.appendChild(card);
    });

    document.getElementById('fav-counter').innerText = `Favoritos: ${usuarioLogueado.favoritos.length}`;
}


function toggleFavorito(idReceta) {
    const index = usuarioLogueado.favoritos.indexOf(idReceta);
    if (index > -1) {
        usuarioLogueado.favoritos.splice(index, 1);
    } else {
        usuarioLogueado.favoritos.push(idReceta);
    }
    cargarContenido();
}


function logout() {
    usuarioLogueado = null;
    document.getElementById('user-nav').style.display = 'none';
    document.getElementById('form-login').reset();
    document.getElementById('form-registro').reset();
    switchView('view-login');
}