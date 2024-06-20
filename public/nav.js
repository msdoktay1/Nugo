
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        page = event.target.getAttribute('data-page');
        loadPage(page);
    });
});
function loadPage(page) {
    fetch(page)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = data;
            const newContent = tempDiv.querySelector('#container');
            container.innerHTML = newContent.innerHTML;

            // Sayfa yüklendikten sonra gerekli scriptleri yeniden ekleyin
            const scriptTags = tempDiv.querySelectorAll('script');
            scriptTags.forEach(script => {
                const newScript = document.createElement('script');
                newScript.textContent = script.textContent;
                document.body.appendChild(newScript);
            });

            // Yeni sayfa için gerekli event listener'ları tekrar bağlayın
            initializePage();
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}
loadPage("index.html");