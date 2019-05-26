'use strict'

const KeyApi = '5111bb88801547829bedfe0f7332cbd0'

const countNewsOnPage = 5
const countNews = 8
const notFound = 'There are no articles matching your request'
let currPage = 1

export function LoadSourses (selectId) {
  let url = 'https://newsapi.org/v2/sources?country=us&language=en&apiKey=' + KeyApi
  let request = new Request(url)
  fetch(request).then(function (response) {
    return response.json()
  }).then(json => Load(json,selectId)) 
} 


function Load(json, selectId) { 
  if (json.status) { 
  let documentFragment = document.createDocumentFragment() 
  let select = document.getElementById(selectId) 
  let firstItem = document.createElement('option') 
  firstItem.value = 'any' 
  firstItem.textContent = 'any' 
  documentFragment.appendChild(firstItem) 
  let sources = json.sources 
  sources.forEach(function (sourceItem) { 
  let newItem = document.createElement('option') 
  newItem.value = sourceItem.id 
  newItem.textContent = sourceItem.name 
  documentFragment.appendChild(newItem) 
  }) 
  select.appendChild(documentFragment) 
  }
}


function newNewsCard (article) {
  let newsCard = document.createElement('div')
  newsCard.className = 'news__news-card'

  let newsCardHeader = document.createElement('h3')
  newsCardHeader.className = 'card-item card-header'
  newsCardHeader.textContent = article.title
  newsCard.appendChild(newsCardHeader)

  let newsCardImage = document.createElement('img')
  newsCardImage.className = 'card-item card-image'
  newsCardImage.setAttribute('src', article.urlToImage)
  newsCard.appendChild(newsCardImage)

  let newsCardDesrription = document.createElement('p')
  newsCardDesrription.className = 'card-item card-desrription'
  newsCardDesrription.textContent = article.description
  newsCard.appendChild(newsCardDesrription)

  let newsCardReadMore = document.createElement('button')
  newsCardReadMore.className = 'card-item card-read-more buttonColor'
  newsCardReadMore.setAttribute('type', 'submit')
  newsCardReadMore.onclick = () => window.open(article.url, '_blank')
  newsCardReadMore.textContent = 'Read more'
  newsCard.appendChild(newsCardReadMore)

  return newsCard
}

function createUrl (text, source) {
  let url = 'https://newsapi.org/v2/top-headlines?language=en&page=' + currPage + '&pageSize=' + countNewsOnPage
  currPage++
  if (text !== '') {
    url += '&q=' + text
  }
  if (source !== 'any') {
    url += '&sources=' + source
  }
  url += '&apiKey=' + KeyApi
  return url
}

export function ShowNews (selectedText, selectedSource) {
  let url = createUrl(selectedText, selectedSource)
  let request = new Request(url)
  fetch(request).then(function (response) {
    return response.json()
  }).then(json => Show(json)) 
}

function Show(json)
{
  if (json.status) {
    let news = document.getElementById('news-container')
    let articles = json.articles
    articles.forEach((article) => { news.appendChild(newNewsCard(article)) })
    if ((articles.length === 0) || (currPage === (countNews + 1))) {
      let moreNews = document.getElementById('load-more')
      moreNews.style.display = 'none'
    }
    if (articles.length === 0) {
      var noNewsFind = document.getElementById('news-container')
      if (noNewsFind.innerHTML === '') {
        noNewsFind.innerHTML = notFound
      }
    }
  }
}


export function search (text, source) {
  currPage = 1
  ShowNews(text, source)
}
