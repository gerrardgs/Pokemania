// Event listener untuk setiap menu
document.getElementById('home-link').addEventListener('click', function (event) {
  event.preventDefault();
  setActiveMenu('home-link');
  window.location.href = 'index.html'; // Navigasi ke halaman beranda
});

document.getElementById('pokemon-link').addEventListener('click', function (event) {
  event.preventDefault();
  setActiveMenu('pokemon-link');
  window.location.href = 'pokemon.html'; // Navigasi ke halaman pokemon.html
});

document.getElementById('item-link').addEventListener('click', function (event) {
  event.preventDefault();
  setActiveMenu('item-link');
  window.location.href = 'item.html'; // Navigasi ke halaman item.html
});

document.getElementById('contact-link').addEventListener('click', function (event) {
  event.preventDefault();
  setActiveMenu('contact-link');
  window.location.href = 'contact.html'; // Navigasi ke halaman contact.html
});


// Transparansi Navigasi ketika discroll
window.addEventListener("scroll", function () {
  var header = document.querySelector(".nav-container");
  if (window.scrollY > 50) {
    header.classList.add("translucent");
  } else {
    header.classList.remove("translucent");
  }
});


// Animasi untuk perpindahan button start-journey
var startJourneyButton = document.getElementById('start-journey');
startJourneyButton.addEventListener('click', function (event) {
  event.preventDefault();
  var introSection = document.getElementById('find');
  introSection.scrollIntoView({ behavior: 'smooth' });
});


// Fungsi untuk menetapkan kelas aktif pada menu yang dipilih
function setActiveMenu(menuId) {
  var menus = document.querySelectorAll('.nav-container nav ul li a');
  menus.forEach(function (menu) {
    menu.classList.remove('active');
  });

  var activeMenu = document.getElementById(menuId);
  activeMenu.classList.add('active');
}


// Panggil fungsi ini saat halaman dimuat
window.addEventListener('load', function () {
  images.forEach(function (image, index) {
    if (index !== 0) {
      image.style.display = 'none';
    }
  });

  if (window.location.pathname === '/home.html') {
    setActiveMenu('home-link');
  }
});


// Fungsi untuk mengatur menu yang aktif
function setActiveMenu(linkId) {
  var menuLinks = document.querySelectorAll('.nav-container li a');
  menuLinks.forEach(function (link) {
    link.classList.remove('active');
  });

  var activeLink = document.getElementById(linkId);
  activeLink.classList.add('active');
}


// Fungsi untuk mengatur slideshow
var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  if (n > x.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = x.length }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndex - 1].style.display = "block";
}


// Fungsi untuk mengatur scroll on top
var scrollToTopBtnVisible = false;

window.addEventListener("scroll", function () {
  var scrollToTopBtn = document.getElementById("scrollToTopBtn");
  if ((document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) && !scrollToTopBtnVisible) {
    scrollToTopBtn.style.display = "block";
    setTimeout(function () {
      scrollToTopBtn.style.opacity = "1";
    }, 10);
    scrollToTopBtnVisible = true;
  } else if (!(document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) && scrollToTopBtnVisible) {
    scrollToTopBtn.style.opacity = "0";
    setTimeout(function () {
      scrollToTopBtn.style.display = "none";
    }, 300);
    scrollToTopBtnVisible = false;
  }
});


// Fungsi untuk scroll lebih smooth
function scrollToTopSmoothly() {
  var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;

  if (currentScroll > 0) {
    window.requestAnimationFrame(scrollToTopSmoothly);
    window.scrollTo(0, currentScroll - (currentScroll / 35));
  }
}

function scrollToTop() {
  scrollToTopSmoothly();
}