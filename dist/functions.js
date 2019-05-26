/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/functions.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/functions.js":
/*!**************************!*\
  !*** ./src/functions.js ***!
  \**************************/
/*! exports provided: LoadSourses, ShowNews, search */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"LoadSourses\", function() { return LoadSourses; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ShowNews\", function() { return ShowNews; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"search\", function() { return search; });\n\n\nconst KeyApi = '5111bb88801547829bedfe0f7332cbd0';\nconst countNewsOnPage = 5;\nconst countNews = 8;\nconst notFound = 'There are no articles matching your request';\nlet currPage = 1;\nfunction LoadSourses(selectId) {\n  let url = 'https://newsapi.org/v2/sources?country=us&language=en&apiKey=' + KeyApi;\n  let request = new Request(url);\n  fetch(request).then(function (response) {\n    return response.json();\n  }).then(json => Load(json, selectId));\n}\n\nfunction Load(json, selectId) {\n  if (json.status) {\n    let documentFragment = document.createDocumentFragment();\n    let select = document.getElementById(selectId);\n    let firstItem = document.createElement('option');\n    firstItem.value = 'any';\n    firstItem.textContent = 'any';\n    documentFragment.appendChild(firstItem);\n    let sources = json.sources;\n    sources.forEach(function (sourceItem) {\n      let newItem = document.createElement('option');\n      newItem.value = sourceItem.id;\n      newItem.textContent = sourceItem.name;\n      documentFragment.appendChild(newItem);\n    });\n    select.appendChild(documentFragment);\n  }\n}\n\nfunction newNewsCard(article) {\n  let newsCard = document.createElement('div');\n  newsCard.className = 'news__news-card';\n  let newsCardHeader = document.createElement('h3');\n  newsCardHeader.className = 'card-item card-header';\n  newsCardHeader.textContent = article.title;\n  newsCard.appendChild(newsCardHeader);\n  let newsCardImage = document.createElement('img');\n  newsCardImage.className = 'card-item card-image';\n  newsCardImage.setAttribute('src', article.urlToImage);\n  newsCard.appendChild(newsCardImage);\n  let newsCardDesrription = document.createElement('p');\n  newsCardDesrription.className = 'card-item card-desrription';\n  newsCardDesrription.textContent = article.description;\n  newsCard.appendChild(newsCardDesrription);\n  let newsCardReadMore = document.createElement('button');\n  newsCardReadMore.className = 'card-item card-read-more buttonColor';\n  newsCardReadMore.setAttribute('type', 'submit');\n\n  newsCardReadMore.onclick = () => window.open(article.url, '_blank');\n\n  newsCardReadMore.textContent = 'Read more';\n  newsCard.appendChild(newsCardReadMore);\n  return newsCard;\n}\n\nfunction createUrl(text, source) {\n  let url = 'https://newsapi.org/v2/top-headlines?language=en&page=' + currPage + '&pageSize=' + countNewsOnPage;\n  currPage++;\n\n  if (text !== '') {\n    url += '&q=' + text;\n  }\n\n  if (source !== 'any') {\n    url += '&sources=' + source;\n  }\n\n  url += '&apiKey=' + KeyApi;\n  return url;\n}\n\nfunction ShowNews(selectedText, selectedSource) {\n  let url = createUrl(selectedText, selectedSource);\n  let request = new Request(url);\n  fetch(request).then(function (response) {\n    return response.json();\n  }).then(json => Show(json));\n}\n\nfunction Show(json) {\n  if (json.status) {\n    let news = document.getElementById('news-container');\n    let articles = json.articles;\n    articles.forEach(article => {\n      news.appendChild(newNewsCard(article));\n    });\n\n    if (articles.length === 0 || currPage === countNews + 1) {\n      let moreNews = document.getElementById('load-more');\n      moreNews.style.display = 'none';\n    }\n\n    if (articles.length === 0) {\n      var noNewsFind = document.getElementById('news-container');\n\n      if (noNewsFind.innerHTML === '') {\n        noNewsFind.innerHTML = notFound;\n      }\n    }\n  }\n}\n\nfunction search(text, source) {\n  currPage = 1;\n  ShowNews(text, source);\n}\n\n//# sourceURL=webpack:///./src/functions.js?");

/***/ })

/******/ });