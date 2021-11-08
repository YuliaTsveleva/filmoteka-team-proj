'use strict'

import ApiService from './apiService'
import movieTemplate from '../templates/film-card-template.hbs';

const nameOfMovieToSearch = new ApiService;

const refs = {
    gallery: document.querySelector('.gallery_trending'),
    inputField: document.querySelector('.search-form__input'),
};


const onSearchListener = document.querySelector('.search-form-js');
// console.log(onSearchListener);

onSearchListener.addEventListener('submit', onSearch);

function onSearch(event) {
    event.preventDefault()
    if (!refs.inputField.value) {
        alert('Введите название фильма')
        return
    }

    if (nameOfMovieToSearch.query === refs.inputField.value) {
        alert("Поиск фильма с таким названием был выполнен, введите другое название")
        return
    }

    //===выполненеие поиска нового названия===
    if (nameOfMovieToSearch.query !== refs.inputField.value) {
        clearContent();
        nameOfMovieToSearch.query = refs.inputField.value;
    }
    // console.log(nameOfMovieToSearch.fetchSearchMovies());

    nameOfMovieToSearch.fetchSearchMovies().then(renderMakrup);

    //==adding search result to the localStorage==
    nameOfMovieToSearch.fetchSearchMovies().then(result => {
        localStorage.setItem("surchResult", JSON.stringify(result));
    });

};

function renderMakrup(name) {
    refs.gallery.insertAdjacentHTML('beforeend', movieTemplate(name))
}

function clearContent() { //==очистка содержимого страницы перед выведением результатов поиска===
    refs.gallery.innerHTML = '';
    nameOfMovieToSearch.resetPage;
    localStorage.clear("surchResult");
};