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

    commentForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const adSoyad = document.getElementById("adSoyad").value.trim();
        const email = document.getElementById("email").value.trim();
        const yorum = document.getElementById("yorum").value.trim();

        const errorAd = document.getElementById("errorAd");
        const errorEmail = document.getElementById("errorEmail");
        const errorYorum = document.getElementById("errorYorum");
        const successMsg = document.getElementById("successMsg");

        errorAd.textContent = "";
        errorEmail.textContent = "";
        errorYorum.textContent = "";
        successMsg.textContent = "";

        let isValid = true;

        if (adSoyad === "") {
            errorAd.textContent = "Lütfen adınızı ve soyadınızı giriniz.";
            isValid = false;
        } else if (adSoyad.length < 3) {
            errorAd.textContent = "Ad soyad en az 3 karakter olmalıdır.";
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === "") {
            errorEmail.textContent = "Lütfen e-posta adresinizi giriniz.";
            isValid = false;
        } else if (!emailRegex.test(email)) {
            errorEmail.textContent = "Geçerli bir e-posta adresi giriniz (Örn: isim@mail.com).";
            isValid = false;
        }

        if (yorum === "") {
            errorYorum.textContent = "Lütfen bir yorum veya öneri yazınız.";
            isValid = false;
        } else if (yorum.length < 10) {
            errorYorum.textContent = "Yorumunuz biraz daha açıklayıcı olmalıdır (en az 10 karakter).";
            isValid = false;
        }

        if (isValid) {
            successMsg.textContent = "Teşekkürler babuş! Yorumunuz başarıyla gönderildi (Simüle edildi).";
            
            commentForm.reset();
        }
    });
});

const modal = document.getElementById("galleryModal");
const modalImg = document.getElementById("modalImg");
const captionText = document.getElementById("modalCaption");
const closeBtn = document.getElementById("modalClose");
const galleryItems = document.querySelectorAll(".galeri-ogesi");

if (galleryItems.length > 0 && modal) {
    galleryItems.forEach(item => {
        item.addEventListener("click", function() {
            modal.style.display = "block";
            modalImg.src = this.src;
            captionText.textContent = this.alt;
        });
    });

    closeBtn.addEventListener("click", function() {
        modal.style.display = "none";
    });

    modal.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
}
