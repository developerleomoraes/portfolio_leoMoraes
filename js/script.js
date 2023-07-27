// General

(function() {
    "use strict";

    //Selector function
    const select = (el, all = false) => {
        el = el.trim()
        if(all) {
            return [...document.querySelectorAll(el)]
        } else {
            return document.querySelector(el)
        }
    }

    // Event Listener Function
    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all)
        if(selectEl) {
            if(all) {
                selectEl.forEach(e => e.addEventListener(type, listener))
            } else {
                selectEl.addEventListener(type, listener)
            }
        } 
    }


    // Scroll Event Listener
    const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
    }


    // Navbar links active state on scroll
    let navbarlinks = select('#navbar .scrollto', true)
    const navbarlinkActive = () => {
        let position = window.scrollY + 200
        navbarlinks.forEach(navbarlink => {
            if(!navbarlink.hash) return

            let section = select(navbarlink.hash)
            if(!section) return

            if(position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                navbarlink.classList.add('active')
            } else {
                navbarlink.classList.remove('active')
            }
        })
    }
    
    window.addEventListener('load', navbarlinkActive)
    onscroll(document, navbarlinkActive)


    // Scrolls to an element with header offset
    const scrollto = (el) => {
        let elementPos = select(el).offsetTop
        window.scrollTo({
            top: elementPos,
            behavior: 'smooth'
        })
    }

    //Back to top button
    let backToTop = select('.button-back-to-top')
    if(backToTop) {
        const toggleBackTopTop = () => {
            if(window.scrollY > 100) {
                backToTop.classList.add('active')
            } else {
                backToTop.classList.remove('active')
            }
        }
        window.addEventListener('load', toggleBackTopTop)
        onscroll(document, toggleBackTopTop)
    }


    // Mobile nav toggle
    on('click', '.mobile-nav-toggle', function(e){
        select('body').classList.toggle('mobile-nav-active')
        this.classList.toggle('bi-list')
        this.classList.toggle('bi-x')
    })


    // Scrool with ofset on links with a class name .scrollto
    on('click', '.scrollto', function(e) {
        if(select(this.hash)) {
            e.preventDefault()

            let body = select('body')
            if(body.classList.contains('mobile-nav-active')) {
                body.classList.remove('mobile-nav-active')
                let navbarToggle = select('.mobile-nav-toggle')
                navbarToggle.classList.toggle('bi-list')
                navbarToggle.classList.toggle('bi-x')
            }
            scrollto(this.hash)
        }
    }, true)


    // Scroll with ofset on page load with hash lnks in the url
    window.addEventListener('load', () => {
        if(window.location.hash) {
            if(select(window.location.hash)) {
                scrollto(window.location.hash)
            }
        }
    })

    // Name effect
    const typed = select('.typed')
    if(typed) {
        let typed_strings = typed.getAttribute('data-typed-items')
        typed_strings = typed_strings.split(',')
        new Typed('.typed', {
            strings: typed_strings,
            loop: true,
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000
        })
    }


    // Eu alterei o nome do class ESSA FUNÇÃO TEM QUE SER REFEITA
    //Opacity in Skills
    /*const skillsOpacity = () => {
        const skillsContent = document.querySelector('#skills .skills-content');
        // Selecionar todos os elementos .technologies
        const technologies = document.querySelectorAll('#skills .technologies');

        // Adicionar um event listener de 'mouseenter' para cada elemento .technologies
        technologies.forEach(technology => {
        technology.addEventListener('mouseenter', () => {
            // Quando o mouse entrar em um elemento .technologies
            // Definir a opacidade de .skills-content como 50%
            skillsContent.style.opacity = '0.5'
            technology.style.opacity = '1.5'
        });

        // Adicionar um event listener de 'mouseleave' para cada elemento .technologies
        technology.addEventListener('mouseleave', () => {
            // Quando o mouse sair de um elemento .technologies
            // Definir a opacidade de .skills-content como 100% (valor padrão)
            skillsContent.style.opacity = '1'
            technology.style.opacity = '1.5'
        });
        });
    }*/

    

    // Portfolio isotope and filter
    window.addEventListener('load', () => {
        let portfolioContainer = select('.portfolio-container')
        if(portfolioContainer) {
            let portfoloIsoptope = new Isotope(portfolioContainer, {
                itemSelector: '.portfolio-item'
            })

            let portfolioFilters = select('#portfolio-filters li', true)

            on('click', '#portfolio-filters li', function(e) {
                e.preventDefault()
                portfolioFilters.forEach(function(el) {
                    el.classList.remove('filter-active')
                })
                this.classList.add('filter-active')

                portfoloIsoptope.arrange({
                    filter: this.getAttribute('data-filter')
                })
                portfoloIsoptope.on('arrangeComplete', function() {
                    AOS.refresh()
                })
            }, true)
        }
    })

    //Initiate portfolio lightbox
    const portfolioLightbox = GLightbox({
        select: '.portfolio-lightbox'
    })

    
    // Portfolio Details Slider
    new Swiper('.portfolio-details-slider', {
        speed: 400,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        }
    })


    // Animation on scroll
    window.addEventListener('load', () => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        })
    })

    // Initiate Pure Counter
    new PureCounter()
    skillsOpacity()

})()