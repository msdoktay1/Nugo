
let score = 0;
function initializeFirebase() {
    document.addEventListener('DOMContentLoaded', function () {
        console.log("asdfasdf ");
        const firebaseConfig = {
            apiKey: "AIzaSyCO7-e9DT3uLsk1ej-DXblbOloUgBDm_uc",
            authDomain: "nugo-ea4a5.firebaseapp.com",
            projectId: "nugo-ea4a5",
            storageBucket: "nugo-ea4a5.appspot.com",
            messagingSenderId: "526788026458",
            appId: "1:526788026458:web:f1d09c26fedd94f3313863",
            measurementId: "G-VCFC8SYWFV"
        };
        const firebaseApp = firebase.initializeApp(firebaseConfig);

        console.log("asdfasdf ");
        const container = document.getElementById('container');
        const auth = firebase.auth();
        const db = firebase.firestore();

        //const url = 'https://nugo-ea4a5.web.app/#tgWebAppData=user%3D%257B%2522id%2522%253A961183898%252C%2522first_name%2522%253A%2522Oktay%2522%252C%2522last_name%2522%253A%2522I%25C5%259F%25C4%25B1k%2522%252C%2522username%2522%253A%2522oktayio%2522%252C%2522language_code%2522%253A%2522tr%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D-2382945368090841598%26chat_type%3Dsender%26auth_date%3D1718629153%26hash%3D418923842fcaf51cea559a2c53f2ec8c97961b21870ff884c0f3b29e6ca933ee&tgWebAppVersion=7.2&tgWebAppPlatform=tdesktop&tgWebAppBotInline=1&tgWebAppThemeParams=%7B%22accent_text_color%22%3A%22%23168acd%22%2C%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%2340a7e3%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22destructive_text_color%22%3A%22%23d14e4e%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23999999%22%2C%22link_color%22%3A%22%23168acd%22%2C%22secondary_bg_color%22%3A%22%23f1f1f1%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%23168acd%22%2C%22subtitle_text_color%22%3A%22%23999999%22%2C%22text_color%22%3A%22%23000000%22%7D';
        const url = window.location.href.toString();
        // URL'den # işaretinden sonrasını al
        const paramsStartIndex = url.indexOf('#');
        const urlParams = new URLSearchParams(url.slice(paramsStartIndex + 1));

        // tgWebAppData parametresini al
        const tgWebAppData = urlParams.get('tgWebAppData');
        const decodedData = decodeURIComponent(tgWebAppData);

        let userDataStr = decodedData.split('=')[1];
        console.log('userDataStr:', userDataStr);
        const jsonEndIndex = userDataStr.indexOf('&');
        if (jsonEndIndex !== -1) {
            userDataStr = userDataStr.substring(0, jsonEndIndex);
        }
        console.log('userDataStr:', userDataStr);
        const userData = JSON.parse(userDataStr); // JSON verisini nesneye dönüştür
        const userId = userData.id;// Kullanıcı ID'sini alıyoruz
        localStorage.setItem("userId", userId);
        console.log(urlParams);
        try {
            const docRef = db.collection('Users').doc(userId.toString());
            docRef.get().then((doc) => {
                try {
                    document.getElementById('score').innerText = doc.data().coin;
                    score = doc.data().coin;
                    localStorage.setItem("score", score);
                    setTimeout(() => {
                        document.getElementById('spinner').style.display = 'none';
                        document.getElementById('container').style.display = 'block';
                    }, 3000);
                } catch (e) {
                    setTimeout(() => {
                        document.getElementById('spinner').style.display = 'none';
                        document.getElementById('container').style.display = 'block';
                        localStorage.setItem("score", score);
                    }, 3000);
                }
            });
        } catch (e) { }
    });
};
initializeFirebase();
function initializePage() {
    console.log("coinnn :", localStorage.getItem("score"))
    score = localStorage.getItem("score");
    document.getElementById('score').innerText = score;
    const image = document.getElementById('click');
    let activeTouches = new Set(); // Aktif dokunmaları izlemek için Set kullanıyoruz
    const canvasContainer = document.getElementById('score');
    const db = firebase.firestore();
    const movingImage = document.getElementById('score-icon');
    // Dokunma başlangıcı işlemleri
    document.getElementById('click').addEventListener('touchstart', function (event) {
        // Dokunma sayısını kontrol et
        activeTouches.add(event.changedTouches[0].identifier); // Dokunma kimliğini Set'e ekleyin

        if (activeTouches.size >= 2) {
            event.preventDefault();
            setFirebase(event.changedTouches[0]);
            // Belirli sayıda dokunma olduğunda işlemi gerçekleştir
            // Örneğin, 3 dokunma gerekiyorsa
            const targetX = event.changedTouches[0].clientX;
            const targetY = event.changedTouches[0].clientY;
            moveImage(targetX, targetY);
            // Resmin hedefe doğru animasyonu
        }
    });
    document.getElementById('click').addEventListener('touchend', function (event) {
        activeTouches.delete(event.changedTouches[0].identifier);
    });
    image.addEventListener("click", function (event) {
        const targetX = event.clientX;
        const targetY = event.clientY;
        setFirebase(event);

        // Resmin hedefe doğru animasyonu
        moveImage(targetX, targetY);
    });

    function setFirebase(event) {
        const userId = localStorage.getItem("userId");
        const docRef = db.collection('Users').doc(userId.toString());
        score++;
        localStorage.setItem("score", score);
        let count = 0;
        count++;
        const counterElement = document.createElement('div');
        counterElement.className = 'counter';
        counterElement.textContent = '+' + count;
        document.getElementById('score').innerText = score;
        docRef.set({
            id: userId,
            coin: score,
        });

        // Tıklama olayının gerçekleştiği noktaya göre konumlandırma
        counterElement.style.position = 'absolute';
        counterElement.style.left = (event.clientX - 20) + 'px'; // 20px soluna kaydırma
        counterElement.style.top = (event.clientY - 50) + 'px'; // 20px üstüne kaydırma
        counterElement.style.backgroundColor = 'transparent'; // Arkaplanı şeffaf yap

        document.body.appendChild(counterElement);

        // Yukarı doğru hareket edecek +1 elementini belirli aralıklarla güncelle
        let offset = 0;
        const interval = setInterval(function () {
            offset -= 5; // Yükseklik artışı hızı
            counterElement.style.top = (event.clientY - 50 + offset) + 'px'; // 20px üstüne kaydırma
        }, 50); // Hareket güncelleme aralığı

        // Belirli bir süre sonra +1 elementini kaldır
        setTimeout(function () {
            clearInterval(interval); // Hareket güncellemeyi durdur
            document.body.removeChild(counterElement); // +1 elementini kaldır
        }, 1000); // Hareket süresi (1000ms = 1 saniye)
    }
    function moveImage(targetX, targetY) {

        const _image = canvasContainer;
        // Hedef noktasına doğru uzaklık hesaplama

        const newImage = document.createElement('div');
        newImage.classList.add('movingImage');
        newImage.style.left = targetX + 'px'; // x koordinatına göre konumlandır
        newImage.style.top = targetY + 'px'; // y koordinatına göre konumlandır

        // Resmi canvasContainer içine ekleyin
        document.body.appendChild(newImage);
        // Hareketin animasyonu
        const currentX = _image.offsetLeft;
        const currentY = _image.offsetTop;
        console.log("cx : ", currentX, " cy : ", currentY, " x : ", targetX, " y : ", targetY);
        const distance = Math.sqrt((currentX - targetX) ** 2 + (currentY - targetY) ** 2);
        newImage.style.transition = 'transform ' + (distance / 1000) + 's ease-in-out';
        newImage.style.transform = `translate(${currentX - targetX}px, ${currentY - targetY}px)`;

        // Animasyon bittikten sonra resmi gizle
        setTimeout(() => {
            newImage.style.display = 'none';
            document.body.removeChild(newImage);
        }, distance);
    }
};
initializePage();