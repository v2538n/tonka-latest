var itemPageScroll = {
    scrollY: 0,
    footerY: 0,
    screenHeight: 0,
    offset: 0,
    lockScrollDesktopVersion: false,

    names: {
        page: ".page-item",
        footer: ".footer",
        header: ".header",
        headerTopLine: ".header__top-line",
        constructor: "#constructor",
        imageLayer: "#imageLayer",
    },

    /*
        Инициализация скроллера
    */
    init: function () {
        this.page = document.querySelector(this.names.page);
        if(!this.page) {
            return;
        }

        this.header = this.page.querySelector(this.names.header);
        this.topLine = this.page.querySelector(this.names.headerTopLine);
        this.constructor = this.page.querySelector(this.names.constructor);
        this.imageLayer = this.constructor.querySelector(this.names.imageLayer);

        this.footer = this.page.querySelector(this.names.footer);
        if(!this.footer) {
            return;
        }

        this.updatePosition();

        window.addEventListener('resize', () => {
            this.updatePosition();
        });

        window.addEventListener('scroll', (e) => {
            this.scrollY = window.scrollY;

            let windowWidth = window.innerWidth;
            if(windowWidth > 768) {
                this.updateHeader();
            } else {
                this.mobileUpdateHeader();
            }
        });
    },

    /*
        Обновляем состояние и позицию хедера
    */
    updateHeader: function() {
        if(this.scrollY > 0) {
            this.page.classList.add('fixed-header');
        } else {
            this.page.classList.remove('fixed-header');
        }

        if(this.scrollY + window.innerHeight > this.footerY) {
            // Вычисляем смещение
            this.offset =  this.footerY - (this.scrollY + window.innerHeight);
        } else {
            this.offset = 0;
        }

        this.header.style.top = this.offset + "px";
        this.constructor.style.bottom = -1*this.offset + "px";
    },


    /*
        Позиции элементов
    */
    updatePosition: function () {
        this.footerY = this.footer.offsetTop;
        this.screenHeight =  window.innerHeight;
        this.constructorY = this.constructor.offsetTop;
        this.headerTopLineHeight = this.topLine.offsetHeight;
    },

    /*
        Мобильное отображение
    */
    mobileUpdateHeader: function() {
        this.page.classList.remove('fixed-header');

        if(this.scrollY > 0) {
            this.page.classList.add('fixed-header-menu');
        } else {
            this.page.classList.remove('fixed-header-menu');
        }

        // Достиг ли конструктор хедера?
        let cy =  this.constructorY + this.header.offsetHeight;

        if(this.scrollY + this.headerTopLineHeight >= cy) {
            this.constructor.classList.add('fixed-mini');

            let p = 320 - (this.scrollY + this.headerTopLineHeight - cy);
            console.log(p);
            // Уменьшаем изображение
            if(this.imageLayer.offsetHeight > 75) {
                this.imageLayer.style.maxHeight = p + "px";
                this.imageLayer.style.minHeight = p + "px";
            } else {
                this.imageLayer.style.maxHeight = "75px";
                this.imageLayer.style.minHeight = "75px";
            }

            this.page.style.paddingTop =  this.constructor.offsetHeight + "px";
        } else {
            this.constructor.classList.remove('fixed-mini');
            this.page.style.paddingTop =  "0px";
            this.imageLayer.style.maxHeight = "320px";
            this.imageLayer.style.minHeight = "320px";
        }
    },

}

document.addEventListener("DOMContentLoaded", ()=> {
    itemPageScroll.init();
});