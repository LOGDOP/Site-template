window.addEventListener("DOMContentLoaded", () => {
 
    ///////// Tabs
    const tabsParent = document.querySelector(".tabheader__items");
    const tabs = document.querySelectorAll(".tabheader__item");
    const tabsContent = document.querySelectorAll(".tabcontent");
    const info = document.querySelector(".tabcontent__descr");

    function hideTabContent () {
        tabsContent.forEach(el => {
            el.classList.add("hide");
            el.classList.remove("show", "fade");
        });

        tabs.forEach(el => {
            el.classList.remove("tabheader__item_active");
        });
    }

    function showTabContent (i = 0) {
        tabsContent[i].classList.add("show", "fade");
        tabsContent[i].classList.remove("hide");
        tabs[i].classList.add("tabheader__item_active");
    }

    hideTabContent();
    showTabContent(0);

    tabsParent.addEventListener("click", (event) => {
        let target = event.target;

        if (target && target.classList.contains("tabheader__item")) {
            tabs.forEach((el,i) => {
                if (el === target) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    /////////////// Timer

    const now = new Date();

    const deadline = new Date(`${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate() + 1}`);
    
    function getTimeRemaining(endtime){
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000 ) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'second': seconds
        };
    }

    function getZero(num){
        if (num >= 0 && num < 10){
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            second = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);
        
            updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            second.innerHTML = getZero(t.second);

            if (t.total <= 0 ){
                clearInterval(timeInterval);
            }
        }
        }

        setClock('.timer', deadline);

        ////////// modal 

        const modalTriger = document.querySelectorAll('[data-modal]'),
            modal = document.querySelector(".modal");

        function showModal () {
            modal.classList.add("show");
            modal.classList.remove("hide");
            document.body.style.overflow = "hidden";
        }

        function hideModal(){
            modal.classList.add("hide");
            modal.classList.remove("show");
            document.body.style.overflow = "";
            clearInterval(modaTimerId);
        }

        

        modalTriger.forEach(el => {
            el.addEventListener("click", showModal);
        });

        modal.addEventListener("click", (e) => {
            if (e.target === modal || e.target.getAttribute('data-close') == ""){
                hideModal();
            }
        });

        document.addEventListener("keydown", (e) => {
            if (e.code === "Escape" && modal.classList.contains("show")){
                hideModal();
            }
        });


        const modaTimerId = setTimeout(showModal, 20000);

        function showModalByScroll() {
            if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
                showModal();
                window.removeEventListener("scroll", showModalByScroll);
            }
        }
        
        window.addEventListener("scroll", showModalByScroll);


/////////////////// карточки
                
        class MenuCard {
            constructor (img, alt, title, descr, price, parentSelector, ...classes){
                this.img = img;
                this.alt = alt;
                this.title = title;
                this.descr = descr;
                this.price = price;
                this.classes = classes;
                this.parent = document.querySelector(parentSelector);
                this.transfer = 2.6;
                this.changeToBYN();
            }

            changeToBYN () {
                this.price = Math.floor(this.price * this.transfer);
            }

            render () {
                const element = document.createElement("div");

                if (this.classes.length === 0 ) {
                    this.element = "menu__item";
                    element.classList.add(this.element);
                }
                else {
                    this.classes.forEach(classEl => element.classList.add(classEl));
                }
                
                element.innerHTML = `
                        <img src=${this.img} alt=${this.alt}>
                        <h3 class="menu__item-subtitle">${this.title}</h3>
                        <div class="menu__item-descr">${this.descr}</div>
                        <div class="menu__item-divider"></div>
                        <div class="menu__item-price">
                            <div class="menu__item-cost">Цена:</div>
                            <div class="menu__item-total"><span>${this.price}</span> BYN/день</div>
                        </div>
                `;

                this.parent.append(element);

            }
        }

        const getResorce = async (url) => {
            const res = await fetch(url);

            if(!res.ok){
                throw new Error(`Could not fetch ${url}, status ${res.status}`);
            }
    
            return await res.json();  ///Promice
        };

        axios.get("http://localhost:3000/menu")
            .then(data => {
                data.data.forEach(({img, alt, title, descr, price}) => {
                    new MenuCard(img, alt, title, descr, price, '.menu .container').render();
                });
            });

       /*  getResorce("http://localhost:3000/menu")
            .then(data => {
                data.forEach(({img, alt, title, descr, price}) => {
                    new MenuCard(img, alt, title, descr, price, '.menu .container').render();
                });
            }); */

        /////////// Forms

    const forms = document.querySelectorAll("form");

    const message = {
        loading: "img/form/spinner.svg",
        seccess: "Спасибо! Скоро мы с вами свяжемся",
        failure: "Что-то пошло не так..."
    };

    forms.forEach(el => {
        bindData(el);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": 'application/json'
            },
            body: data
        });

        return await res.json();  ///Promice
    }

    function bindData (form) {
        form.addEventListener('submit', (e)=>{
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
                `;
            form.insertAdjacentElement("afterend", statusMessage);

           

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            

           
            postData("http://localhost:3000/requests", json)
            .then(data => {
                console.log(data);
                showThanksModal(message.seccess);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        });
    }


    function showThanksModal(message) {
        const prevModalDialog = document.querySelector(".modal__dialog");
        prevModalDialog.classList.add("hide");
        showModal();

        const thanksModal = document.createElement("div");
        thanksModal.classList.add("modal__dialog");
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector(".modal").append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add("show");
            prevModalDialog.classList.remove("hide");
            hideModal();
        }, 4000);
    }

   ///// Slider 

    const slides = document.querySelectorAll(".offer__slide"),
        slider = document.querySelector(".offer__slider"),
        prev = document.querySelector(".offer__slider-prev"),
        next = document.querySelector(".offer__slider-next"),
        total = document.querySelector("#total"),
        current = document.querySelector("#current"),
        slidesWrapper = document.querySelector(".offer__slider-wrapper"),
        slidesField = document.querySelector(".offer__slider-inner"),
        width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    let offset = 0;

    function deleteNotDigits(str){
        return +str.replace(/\D/g, "");
    }
    
    function zero () {
        if (slides.length < 10){
            total.textContent = `0${slides.length}`;
            current.textContent = `0${slideIndex}`;
        }
        else if (slides.length <= 10){
            total.textContent = slides.length;
            current.textContent = slideIndex;
        }
    }

    zero();
   

    slidesField.style.width = 100 * slides.length + "%";
    slidesField.style.display = "flex";
    slidesField.style.transition = "0.5s all";

    slidesWrapper.style.overflow = "hidden";

    slides.forEach(el => {
        el.style.width = width;
    });

    slider.style.position = "relative";

    const indicators = document.createElement("ol"),
        dots = [];
    indicators.classList.add("carousel-indicators");
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++){
        const dot = document.createElement("li");
        dot.classList.add("dot");
        dot.setAttribute("data-slide-to", i + 1);
        indicators.append(dot);

        if (i == 0){
            dot.style.opacity = 1;
        }
        dots.push(dot);
    }


    next.addEventListener("click", () => {
        if (offset == deleteNotDigits(width) * (slides.length -1)){
            offset = 0;
        }
        else {
            offset += deleteNotDigits(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if(slideIndex == slides.length){
            slideIndex = 1;
        }
        else {
            slideIndex++;
        }

       zero();

        dots.forEach(dot => dot.style.opacity = ".5");
        dots[slideIndex - 1].style.opacity = 1;
    });

    prev.addEventListener("click", () => {
        if (offset == 0){
            
            offset = deleteNotDigits(width) * (slides.length -1);
        }
        else {
            offset -= deleteNotDigits(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if(slideIndex == 1){
            slideIndex = slides.length;
        }
        else {
            slideIndex--;
        }

       zero();

        dots.forEach(dot => dot.style.opacity = ".5");
        dots[slideIndex - 1].style.opacity = 1;
    })

    dots.forEach(dot => {
        dot.addEventListener("click", (e) => {
            const slideTo = e.target.getAttribute("data-slide-to");

            slideIndex = slideTo;

            offset = deleteNotDigits(width) * (slideTo -1);
            slidesField.style.transform = `translateX(-${offset}px)`;
           
           zero();

            dots.forEach(dot => dot.style.opacity = ".5");
            dots[slideIndex - 1].style.opacity = 1;
        }) 
    })

////////// Calc
    const result = document.querySelector(".calculating__result span");

    let sex, height, weight, age, ratio;

    if(localStorage.getItem("sex")){
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem("sex", "female")
    }

    if(localStorage.getItem("ratio")){
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem("ratio", 1.375)
    }

    function initLocalSetting (selector, activeClass){
        const elements = document.querySelectorAll(selector);

        elements.forEach(el =>{
           el.classList.remove(activeClass); 
           if(el.getAttribute("id") === localStorage.getItem("sex")){
            el.classList.add(activeClass);
           }
           if(el.getAttribute("data-ratio") === localStorage.getItem("ratio")){
            el.classList.add(activeClass);
           }
        });
    }

    initLocalSetting("#gender div", "calculating__choose-item_active");
    initLocalSetting(".calculating__choose_big div", "calculating__choose-item_active");

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio){
            result.textContent = "____";
            return;
        }

        if (sex === "female"){
            result.textContent = ((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio).toFixed(2);
        }
        else {
            result.textContent = ((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio).toFixed(2);
        }
    }

    calcTotal();

    function getStaticInformation (selector, activeClass){
        const elements = document.querySelectorAll(selector);

        elements.forEach(el => {
            el.addEventListener("click", (e) => {
                if (e.target.getAttribute("data-ratio")){
                    ratio = +e.target.getAttribute("data-ratio");
                    localStorage.setItem("ratio", +e.target.getAttribute("data-ratio"));
                }
                else {
                    sex = e.target.getAttribute("id");
                    localStorage.setItem("sex", e.target.getAttribute("id"));
                }
    
                elements.forEach(el => {
                    el.classList.remove(activeClass);
                })
    
                e.target.classList.add(activeClass);
                calcTotal();
            });
        });
    }

    getStaticInformation("#gender div", "calculating__choose-item_active");
    getStaticInformation(".calculating__choose_big div", "calculating__choose-item_active");

    function getDinamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener("input", () => {

            if(input.value.match(/\D/g)){
                input.style.border = "1px solid red";
            } else {
                input.style.border ="none";
            }

            switch(input.getAttribute('id')){
                case "height":
                    height = +input.value;
                    break;
                case "weight":
                    weight = +input.value;
                    break;
                case "age":
                    age = +input.value;
                    break;
            }
            calcTotal();
        });
        
    }

    getDinamicInformation("#height");
    getDinamicInformation("#weight");
    getDinamicInformation("#age");


});