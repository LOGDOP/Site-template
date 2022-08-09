function tabs() {
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
}

module.exports = tabs;