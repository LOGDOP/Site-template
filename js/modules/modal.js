function modal() {
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


}

module.exports = modal;