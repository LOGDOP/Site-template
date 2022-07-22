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


});