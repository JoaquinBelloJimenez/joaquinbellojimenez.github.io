const API_KEY = 'api_key';
const BASE_URL = 'https://api.themoviedb.org/3';

const translations = {
    es: {
        title: 'Buscador de Películas',
        placeholder: 'Busca una película...',
        searchBtn: 'Buscar',
        error: 'Error al buscar películas. Inténtalo de nuevo.',
        noResults: 'No se encontraron películas.',
        unknown: 'Desconocido',
    },
    en: {
        title: 'Movie Search',
        placeholder: 'Search for a movie...',
        searchBtn: 'Search',
        error: 'Error searching for movies. Try again.',
        noResults: 'No movies found.',
        unknown: 'Unknown',
    },
};

let currentLang = 'es';

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const resultsContainer = document.getElementById('results');
    const themeToggle = document.getElementById('themeToggle');
    const langEs = document.getElementById('langEs');
    const langEn = document.getElementById('langEn');

    // Modo oscuro
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        themeToggle.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // Idioma
    const savedLang = localStorage.getItem('lang');
    if (savedLang) {
        setLanguage(savedLang);
    }

    langEs.addEventListener('click', () => setLanguage('es'));
    langEn.addEventListener('click', () => setLanguage('en'));

    function setLanguage(lang) {
        currentLang = lang;
        const t = translations[lang];
        document.getElementById('appTitle').textContent = t.title;
        searchInput.placeholder = t.placeholder;
        searchBtn.textContent = t.searchBtn;
        langEs.classList.toggle('btn-group__btn--active', lang === 'es');
        langEn.classList.toggle('btn-group__btn--active', lang === 'en');
        localStorage.setItem('lang', lang);
    }

    searchBtn.addEventListener('click', searchMovies);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchMovies();
        }
    });

    async function searchMovies() {
        const query = searchInput.value.trim();
        if (!query) return;

        try {
            const apiLang = currentLang === 'es' ? 'es-ES' : 'en-US';
            const response = await fetch(
                `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&language=${apiLang}`
            );
            const data = await response.json();
            displayResults(data.results);
        } catch (error) {
            console.error('Error:', error);
            resultsContainer.innerHTML = `<p>${translations[currentLang].error}</p>`;
        }
    }

    function displayResults(movies) {
        if (movies.length === 0) {
            resultsContainer.innerHTML = `<p>${translations[currentLang].noResults}</p>`;
            return;
        }

        resultsContainer.innerHTML = '';
        movies.forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.className = 'movie';
            const year = movie.release_date
                ? movie.release_date.split('-')[0]
                : translations[currentLang].unknown;
            movieElement.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                <h3>${movie.title}</h3>
                <p>📅 ${year}</p>
            `;
            resultsContainer.appendChild(movieElement);
        });
    }
});