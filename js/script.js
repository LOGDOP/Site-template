import calc from "./modules/calc";
import cards from './modules/cards';
import forms from './modules/forms';
import modal from './modules/modal';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';
import {showModal} from './modules/modal'

window.addEventListener("DOMContentLoaded", () => {
    const modalTimerId = setTimeout(() => showModal(".modal", modalTimerId), 20000);
    const now = new Date();
    const deadline = new Date(`${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate() + 1}`);

    calc();
    cards();
    forms('form', modalTimerId);
    slider({
        container: ".offer__slider",
        slide: ".offer__slide",
        nextArrow: ".offer__slider-next",
        prevArrow: ".offer__slider-prev",
        totalCounter: "#total",
        currentCounter: "#current",
        wrapper: ".offer__slider-wrapper",
        field: ".offer__slider-inner"
    });
    modal('[data-modal]', ".modal", modalTimerId);
    tabs(".tabheader__item", ".tabcontent", ".tabheader__items",  "tabheader__item_active");
    timer('.timer', deadline);

        

  


});