'use strict'

import { LoadSourses, ShowNews, search } from './functions.js'

const enterKeyKode = 13
let soursesSelect = 'selector'
let selectedSource = 'any'
let selectedText = ''
let newsContainer = document.getElementById('news-container')

let searchInput = document.getElementById('searcher')
let searchSource = document.getElementById('selector')
let searchButton = document.getElementById('btn-search')
let LoadMoreButton = document.getElementById('btn-load-more')

LoadSourses(soursesSelect)
ShowNews(selectedText, selectedSource)

function SearchNews () {
  newsContainer.innerHTML = ''
  search(searchInput.value, searchSource.value)
}

searchSource.onchange = function () {
  SearchNews()
}

searchInput.onkeypress = function (key) {
  if (key.which === enterKeyKode) {
    SearchNews()
  }
}

searchButton.onclick = function () {
  SearchNews()
}

LoadMoreButton.onclick = function () {
  ShowNews(selectedText, selectedSource)
}
