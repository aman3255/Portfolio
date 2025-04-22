/*==================== MENU SHOW Y HIDDEN ====================*/
const  navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close');

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', ()=>{
        navMenu.classList.add('show-menu');
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', ()=>{
        navMenu.classList.remove('show-menu');
    })
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction(){
    const navMenu = document.getElementById('nav-menu');
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*==================== ACCORDION SKILLS ====================*/
const skillsHeader = document.querySelectorAll('.skills__header');

function toggleSkills() {
    // Toggle between adding and removing the "skills__open" and "skills__close" class
    if(this.parentNode.classList.contains('skills__open')){
        this.parentNode.classList.remove('skills__open');
        this.parentNode.classList.add('skills__close');
    } else {
        this.parentNode.classList.remove('skills__close');
        this.parentNode.classList.add('skills__open');
    }
}

skillsHeader.forEach((el) => {
    el.addEventListener('click', toggleSkills);
});

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll('[data-target]'),
    tabContents = document.querySelectorAll('[data-content]')

tabs.forEach(tab =>{
    tab.addEventListener('click', ()=>{
        const target = document.querySelector(tab.dataset.target);

        tabContents.forEach(tabContent =>{
            tabContent.classList.remove('qualification__active');
        });

        target.classList.add('qualification__active');

        tabs.forEach(tab =>{
            tab.classList.remove('qualification__active');
        })
        tab.classList.add('qualification__active');
    })
})

/*==================== Expertise MODAL ====================*/
const modalViews = document.querySelectorAll('.Expertise__modal'),
    modalBtns = document.querySelectorAll('.Expertise__button'),
    modalCloses = document.querySelectorAll('.Expertise__modal-close');

let modal = function (modalClick){
    modalViews[modalClick].classList.add('active-modal');
};

modalBtns.forEach((modalBtn, i)=>{
    modalBtn.addEventListener('click', ()=>{
        modal(i);
    })
});

modalCloses.forEach(modalClose => {
    modalClose.addEventListener('click', () =>{
        modalViews.forEach((modalView) =>{
            modalView.classList.remove('active-modal');
        });
    });
});

/*==================== PORTFOLIO SWIPER  ====================*/
// let swiper = new Swiper(".portfolio__container", {
//     cssMode: true,
//     loop: true,
//     navigation: {
//         nextEl: ".swiper-button-next",
//         prevEl: ".swiper-button-prev",
//     },
//     pagination: {
//         el: ".swiper-pagination",
//         clickable: true,
//     },
// });
/*==================== ARTICLES ====================*/
let swiperarticles = new Swiper(".articles__container", {
    loop: true,
    grapCursor: true,
    spaceBetween: 40,
  
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    breakpoints: {
      568: {
        slidesPerView: 2,
      },
    },
  });
/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset;

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id');

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link');
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    })
}
window.addEventListener('scroll', scrollActive);

window.addEventListener('scroll', function() {
    const scrollUp = document.getElementById('scroll-up');
    let footer = document.getElementById('footer');
    let rect = footer.getBoundingClientRect(); // Gets the current position of the footer

    // Check if the top of the footer is visible
    if (rect.top <= window.innerHeight) {
        // If the footer is visible, change the button's color
        scrollUp.classList.add("scrollup--footer");
    } else {
        // Otherwise, remove the class
        scrollUp.classList.remove("scrollup--footer");
    }
});

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader(){
    const nav = document.getElementById('header');
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);


/*==================== SHOW SCROLL UP ====================*/
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollUp);

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

// Google recaptcha
window.onload = function() { 
    var el = document.getElementById('g-recaptcha-response'); 
    if (el) { 
      el.setAttribute('required', 'required'); 
    } 
  }

// validate all field in the contact form
document.getElementById("check").onclick = function() {
    let allAreFilled = true;
    document.getElementById("submit_form").querySelectorAll("[required]").forEach(function(i) {
      if (!allAreFilled) return;
      if (!i.value) { allAreFilled = false;  return; }
    })
    if (!allAreFilled) {
      alert('Fill all the fields');
    }
  };


  const sr = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 800, // Faster duration
    reset: true,
    easing: 'ease-in-out',
    delay: 50 // Shorter delay
});

sr.reveal('.header', {});
sr.reveal('.nav__logo', { delay: 25 });
sr.reveal('.nav__menu', { delay: 50 });
sr.reveal('.nav__list', { delay: 75 });
sr.reveal('.nav__item', { interval: 30 });
sr.reveal('.nav__btns', { delay: 100 });
sr.reveal('.nav__toggle', { delay: 125 });
sr.reveal('.change-theme', { delay: 150 });

/* SCROLL HOME */
sr.reveal('.home__social', { delay: 50 });
sr.reveal('.home__img', { delay: 75 });
sr.reveal('.home__data', { delay: 100 });
sr.reveal('.home_scroll', { delay: 125 });

/* SCROLL ABOUT SECTION */
sr.reveal('.section__title', {});
sr.reveal('.section__subtitle', { delay: 50 });
sr.reveal('.about__container', { delay: 100 });
sr.reveal('.about__img', { origin: 'left', delay: 150 });
sr.reveal('.about__data', { origin: 'right', delay: 150 });
sr.reveal('.about__description', { delay: 200 });
sr.reveal('.about__info', { delay: 250 });
sr.reveal('.about__buttons', { delay: 300 });

/* SCROLL SKILLS */
sr.reveal('.section__title', {});
sr.reveal('.section__subtitle', { delay: 50 });
sr.reveal('.skills__container', { delay: 100 });
sr.reveal('.skills__content', { delay: 150, interval: 50 });
sr.reveal('.skills__header', { delay: 200 });
sr.reveal('.skills__list', { delay: 250 });
sr.reveal('.skills__data', { interval: 30 });
sr.reveal('.skills__titles', { interval: 30 });
sr.reveal('.skills__bar', { interval: 30 });
sr.reveal('.skills__percentage', { interval: 30 });

/* SCROLL QUALIFICATIONS SECTION */
sr.reveal('.section__title', {});
sr.reveal('.section__subtitle', { delay: 50 });
sr.reveal('.qualification__container', { delay: 100 });
sr.reveal('.qualification__tabs', { delay: 150 });
sr.reveal('.qualification__button', { delay: 200 });
sr.reveal('.qualification__sections', { delay: 250 });
sr.reveal('.qualification__content', { delay: 300, interval: 50 });
sr.reveal('.qualification__data', { interval: 50 });
sr.reveal('.qualification__title', { delay: 350 });
sr.reveal('.qualification__subtitle', { delay: 400 });
sr.reveal('.qualification__calendar', { delay: 450 });

/* SCROLL EXPERTISE SECTION */
sr.reveal('.section__title', {});
sr.reveal('.section__subtitle', { delay: 50 });
sr.reveal('.Expertise__container', { delay: 100 });
sr.reveal('.Expertise__content', { delay: 150 });
sr.reveal('.Expertise__icon', { delay: 200 });
sr.reveal('.Expertise__title', { delay: 250 });
sr.reveal('.Expertise__button', { delay: 300 });
sr.reveal('.Expertise__modal', { delay: 350 });
sr.reveal('.Expertise__modal-content', { delay: 400 });
sr.reveal('.Expertise__modal-title', { delay: 450 });
sr.reveal('.Expertise__modal-service', { delay: 500, interval: 50 });

/* SCROLL PORTFOLIO SECTION */
sr.reveal('#portfolio .section__title', { delay: 50 });
sr.reveal('#portfolio .section__subtitle', { delay: 75 });
sr.reveal('#portfolio .portfolio__container', { delay: 100 });
sr.reveal('#portfolio .swiper-wrapper', { delay: 125 });
sr.reveal('#portfolio .portfolio__content', {
    interval: 50,
    delay: 150
});

/* SCROLL Project in mind SECTION */
sr.reveal('.project__title', { delay: 50 });
sr.reveal('.project__description', { delay: 75 });
sr.reveal('.centered-container', { delay: 100 });
sr.reveal('.project__icon', { delay: 125 });

/* SCROLL CONTACT SECTION */
sr.reveal('.contact__title', { delay: 50 });
sr.reveal('.contact__subtitle', { delay: 75 });
sr.reveal('.contact__information', { delay: 100, interval: 50 });
sr.reveal('.contact__form', { delay: 125 });
sr.reveal('.contact__label', { delay: 150, interval: 30 });
sr.reveal('.contact__input', { delay: 175, interval: 30 });
sr.reveal('.g-recaptcha', { delay: 200 });
sr.reveal('#check', { delay: 225 });

/* SCROLL FOOTER SECTION */
sr.reveal('.footer__title', { delay: 50 });
sr.reveal('.footer__subtitle', { delay: 75 });
sr.reveal('.footer__links', { delay: 100 });
sr.reveal('.footer__socials', { delay: 125 });
sr.reveal('.footer__copy', { delay: 150 });
