function cards() {
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

   /*  axios.get("http://localhost:3000/menu")
        .then(data => {
            data.data.forEach(({img, alt, title, descr, price}) => {
                new MenuCard(img, alt, title, descr, price, '.menu .container').render();
            });
        }); */

    getResorce("http://localhost:3000/menu")
        .then(data => {
            data.forEach(({img, alt, title, descr, price}) => {
                new MenuCard(img, alt, title, descr, price, '.menu .container').render();
            });
        });

}

module.exports = cards;