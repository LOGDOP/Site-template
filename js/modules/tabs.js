function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
     ///////// Tabs
     const tabsParent = document.querySelector(tabsParentSelector);
     const tabs = document.querySelectorAll(tabsSelector);
     const tabsContent = document.querySelectorAll(tabsContentSelector);
     
 
     function hideTabContent () {
         tabsContent.forEach(el => {
             el.classList.add("hide");
             el.classList.remove("show", "fade");
         });
 
         tabs.forEach(el => {
             el.classList.remove(activeClass);
         });
     }
 
     function showTabContent (i = 0) {
         tabsContent[i].classList.add("show", "fade");
         tabsContent[i].classList.remove("hide");
         tabs[i].classList.add(activeClass);
     }
 
     hideTabContent();
     showTabContent(0);
 
     tabsParent.addEventListener("click", (event) => {
         let target = event.target;
 
         if (target && target.classList.contains(tabsSelector.slice(1))) {
             tabs.forEach((el,i) => {
                 if (el === target) {
                     hideTabContent();
                     showTabContent(i);
                 }
             });
         }
     });
}

export default tabs;