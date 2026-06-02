// Sayfa yüklendiğinde form elementini yakalıyoruz
document.addEventListener("DOMContentLoaded", function() {
    const themeToggle = document.getElementById("themeToggle");
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }

    if (themeToggle) {
        themeToggle.textContent = document.body.classList.contains("dark-mode") ? "Aydınlık Mod" : "Karanlık Mod";

        themeToggle.addEventListener("click", function() {
            document.body.classList.toggle("dark-mode");

            if (document.body.classList.contains("dark-mode")) {
                localStorage.setItem("theme", "dark");
                themeToggle.textContent = "Aydınlık Mod";
            } else {
                localStorage.setItem("theme", "light");
                themeToggle.textContent = "Karanlık Mod";
            }
        });
    }

    const commentForm = document.getElementById("commentForm");

    if (!commentForm) {
        return;
    }

    // Form gönderilmeye çalışıldığında çalışacak fonksiyon
    commentForm.addEventListener("submit", function(event) {
        // Formun sayfayı yenilemesini engelliyoruz (Önce kontrol edeceğiz)
        event.preventDefault();

        // Input değerlerini alıyoruz (sağındaki solundaki boşlukları trim ile temizliyoruz)
        const adSoyad = document.getElementById("adSoyad").value.trim();
        const email = document.getElementById("email").value.trim();
        const yorum = document.getElementById("yorum").value.trim();

        // Hata mesajı alanlarını yakalıyoruz
        const errorAd = document.getElementById("errorAd");
        const errorEmail = document.getElementById("errorEmail");
        const errorYorum = document.getElementById("errorYorum");
        const successMsg = document.getElementById("successMsg");

        // Her gönderimde önce eski hata ve başarı mesajlarını temizliyoruz
        errorAd.textContent = "";
        errorEmail.textContent = "";
        errorYorum.textContent = "";
        successMsg.textContent = "";

        // Kontrol değişkenimiz (Eğer hata varsa false olacak)
        let isValid = true;

        // 1. Ad Soyad Kontrolü
        if (adSoyad === "") {
            errorAd.textContent = "Lütfen adınızı ve soyadınızı giriniz.";
            isValid = false;
        } else if (adSoyad.length < 3) {
            errorAd.textContent = "Ad soyad en az 3 karakter olmalıdır.";
            isValid = false;
        }

        // 2. E-posta Kontrolü (İçinde @ ve . var mı diye bakan basit regex)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === "") {
            errorEmail.textContent = "Lütfen e-posta adresinizi giriniz.";
            isValid = false;
        } else if (!emailRegex.test(email)) {
            errorEmail.textContent = "Geçerli bir e-posta adresi giriniz (Örn: isim@mail.com).";
            isValid = false;
        }

        // 3. Yorum Alanı Kontrolü
        if (yorum === "") {
            errorYorum.textContent = "Lütfen bir yorum veya öneri yazınız.";
            isValid = false;
        } else if (yorum.length < 10) {
            errorYorum.textContent = "Yorumunuz biraz daha açıklayıcı olmalıdır (en az 10 karakter).";
            isValid = false;
        }

        // Eğer hiçbir hata yoksa (isValid hala true ise)
        if (isValid) {
            // Başarı mesajını gösteriyoruz
            successMsg.textContent = "Teşekkürler babuş! Yorumunuz başarıyla gönderildi (Simüle edildi).";
            
            // Formu temizliyoruz
            commentForm.reset();
        }
    });
});




// --- DİNAMİK FOTOĞRAF GALERİSİ ÖZELLİĞİ ---
// Sayfadaki tüm galeri resimlerini ve modal elementlerini yakalıyoruz
const modal = document.getElementById("galleryModal");
const modalImg = document.getElementById("modalImg");
const captionText = document.getElementById("modalCaption");
const closeBtn = document.getElementById("modalClose");
const galleryItems = document.querySelectorAll(".gallery-item");

// Eğer sayfada galeri elemanları varsa çalıştır (Hata vermemesi için kontrol)
if (galleryItems.length > 0 && modal) {
    galleryItems.forEach(item => {
        item.addEventListener("click", function() {
            modal.style.display = "block";
            modalImg.src = this.src;
            captionText.textContent = this.alt; // Resmin alt etiketini yazı olarak basıyoruz
        });
    });

    // Kapatma butonuna basınca modalı gizle
    closeBtn.addEventListener("click", function() {
        modal.style.display = "none";
    });

    // Modalin dışındaki siyah alana basınca da kapansın
    modal.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
}
