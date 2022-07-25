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
            })
        }
    })

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
            modal = document.querySelector(".modal"),
            closeModal = document.querySelector('[data-close]');

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

        closeModal.addEventListener("click", hideModal);

        modalTriger.forEach(el => {
            el.addEventListener("click", showModal);
        });

        modal.addEventListener("click", (e) => {
            if (e.target === modal){
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

        new MenuCard("img/tabs/vegy.jpg", "vegy", 'Меню "Фитнес"', 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 9, ".menu .container", "menu__item").render();
        new MenuCard("img/tabs/elite.jpg", "elite", 'Меню “Премиум”"', 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 13, ".menu .container", "menu__item").render();
        new MenuCard("img/tabs/post.jpg", "post", 'Меню "Постное""', 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков. ', 7, ".menu .container", "menu__item").render();


        /////////// Forms

    const forms = document.querySelectorAll("form");

    const message = {
        loading: "Загрузка",
        seccess: "Спасибо! Скоро мы с вами свяжемся",
        failure: "Что-то пошло не так..."
    }

    forms.forEach(el => {
        postData(el);
    })

    function postData (form) {
        form.addEventListener('submit', (e)=>{
            e.preventDefault();

            const statusMessage = document.createElement('div');
            statusMessage.classList.add("status");
            statusMessage.textContent = message.loading;
            form.append(statusMessage);

            const xml = new XMLHttpRequest();
            xml.open("POST", "server.php");

            const formData = new FormData(form);

            const obj = {};
            formData.forEach(function (value, key){
                obj[key] = value;
            });

            const json = JSON.stringify(obj);

            xml.send(json);

            xml.onload = function () {
                if (xml.status !== 200){
                    console.log(`Error ${xml.status}: ${xml.statusText}`);
                    statusMessage.textContent = message.failure;
                }
                else {
                    console.log(xml.response);
                    statusMessage.textContent = message.seccess;
                    form.reset();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 2000);
                }
            }

        })
    }
});