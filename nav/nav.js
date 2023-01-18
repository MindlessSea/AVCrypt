document.addEventListener('DOMContentLoaded', function() {
    var container = document.querySelector('.nav-container');
    var head = document.querySelector('head');

    head.innerHTML += "<link rel=\"stylesheet\" href=\"nav/nav.css\">";

    fetch('nav/nav.html')
        .then(function(response) {
            return response.text();
        })
        .then(function(html) {
            container.innerHTML = html;
        });
});