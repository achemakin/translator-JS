/* Модуль 11.
Нужно модифицировать страницу таким образом, чтобы она принимала от пользователя три параметра: 
- слово для перевода (поле для ввода); 
- исходный язык данного слова (выпадающий список) 
- язык, на который нужно перевести слово (выпадающий список).
После ввода данных и нажатия кнопки “Перевести”, страница должна отправлять запрос к API Яндекс.
Переводчика, получать ответ и выводить его на экран (или текст ошибки в случае ее возникновения). */

'use strict'

const formEl = document.forms.translateYandex;      

function translate(from, to, text) {
    var req = new XMLHttpRequest();
    var API_KEY = 'trnsl.1.1.20200403T213633Z.2732d36e41831a03.7f17a1ec58280780a9419bc8d91d44773ee99164';
    var url = 'https://translate.yandex.net/api/v1.5/tr.json/translate';
    url += '?key=' + API_KEY;
    url += '&text=' + text;
    url += '&lang=' + from + '-' + to;    
  
    req.addEventListener('load', function () {       
        var response = JSON.parse(req.response);

        console.log(req.response);
  
        if (response.code !== 200) {
            formEl.text.value = 'Произошла ошибка при получении ответа от сервера:\n\n' + response.message;
            return;
        }

        if (response.text.length === 0) {
            formEl.text.value = 'К сожалению, перевод для данного слова не найден';
            return;
        }

        formEl.text.value = response.text.join(' '); // вставляем его на страницу
    });  
    
    req.open('get', url);
    req.send();
}

formEl.addEventListener('submit', function(event) {
    translate(formEl.selectFrom.value, formEl.selectTo.value, formEl.text.value);
    event.preventDefault(); 
});