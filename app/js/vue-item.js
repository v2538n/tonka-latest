const needOptions = [
    '13', // Объём
    '14', // Упаковка
    '16', // Открытки
    '18', // Материал шильдика
    '20', // Шрифт
    '21', // Текст
];

const colorsByOptionId18 = {
    '64': "#9F7442",
    '63': "#6c4c29",
    '68': "#7b716b",
    '69': "#6C6159"
};

var app = new Vue({
    el: '#item-app',
    data: {
        maxStrings: 3,
        itemVolumes: false,
        itemWraps: false,
        itemCards: false,
        itemMaterials: false,
        itemText: false,
        itemFonts: false,

        allRight: false,

        quantity: 1,
    },
    mounted: function () {
        for (let option of window.itemOptions) {
            switch (+option.option_id) {
                case 13: // Объём
                    //option.value = option.product_option_value[0];
                    this.itemVolumes = option;
                    this.itemVolumes.value =   this.itemVolumes.product_option_value[0];

                    break;
                case 14: // Упаковка
                    this.itemWraps = option;

                    break;
                case 16: // Открытки
                    this.itemCards = option;

                    break;
                case 18: // Материал шильдика
                    this.itemMaterials = option;

                    break;
                case 20: // Шрифт
                    this.itemFonts = option;
                    this.itemFonts.value = false;
                    // Загрузка шрифтов
                    for (let key in this.itemFonts.product_option_value) {

                        if (this.itemFonts.product_option_value[key].name.src) {

                            let file = document.createElement('link');
                            file.rel = 'stylesheet';
                            file.href = this.itemFonts.product_option_value[key].name.src;
                            document.head.appendChild(file);
                        }
                    }
                    break;
                case 21: // Текст
                    this.itemText = option;
                    this.$set(
                        this.itemText,
                        'strings',
                        []
                    );
                    //this.addTextString(false);
                    break;
            }
        }
    },
    watch: {
        // эта функция запускается при любом изменении itemVolumes
        'itemVolumes.value': {
            handler: function (val, oldVal) {
                this.updateChain();
            },
            deep: true
        },
    },
    methods: {
        viewAddStringBtn: function () {
            if (this.itemText.strings && this.itemText.strings.length < this.maxStrings) {
                return true;
            }
            return false;
        },

        addTextString: function (canBeDelete) {
            this.$set(
                this.itemText.strings,
                this.itemText.strings.length,
                {
                    canBeDelete: canBeDelete,
                    value: ""
                }
            );
        },

        removeTextString: function (key) {
            this.itemText.strings.splice(key, 1);
        },

        idToObject: function (option_id) {
            switch (+option_id) {
                case 13: // Объём
                    return this.itemVolumes;
                case 14: // Упаковка
                    return this.itemWraps;
                case 16: // Открытки
                    return this.itemCards;
                case 18: // Материал шильдика
                    return this.itemMaterials;
                case 20: // Шрифт
                    return this.itemFonts;
                case 21: // Текст
                    return this.itemText;
            }
        },

        doesTheParentAllow: function (item) {
            if (item.master_option) {
                let master = this.idToObject(item.master_option);
                if (master.value.option_value_id === item.master_option_value) {
                    return true;
                }
            }
            return false;
        },

        getConstructorProductImage: function () {
            if (this.itemMaterials && this.itemMaterials.value) {
                return "/image/" + this.itemMaterials.value.image_value;
            }
        },

        updateChain: function () {
            // Основня логика обновления и дефолтных полей
            // связанных эелемнтов
            for (let option of window.itemOptions) {
                if (option.product_option_value && option.master_option != 0) {
                    if (option.value && option.last_option_value_id) {

                        let is_set = false;
                        /*for (let newValue of option.product_option_value) {
                            if (this.doesTheParentAllow(newValue) && option.last_option_value_id === newValue.option_value_id) {
                                option.value = newValue;
                                option.last_option_value_id = option.value.option_value_id;
                                is_set = true
                            }
                        }*/
                        if(!is_set) {
                            option.value = this.getFirstAllowedProduct(option.product_option_value);
                            //option.last_option_value_id = option.value.option_value_id;
                        }

                    } else {
                        // Устанавливаем првый разрешённый
                        option.value = this.getFirstAllowedProduct(option.product_option_value);
                        //option.last_option_value_id = option.value.option_value_id;
                    }
                }
            }
        },

        getFirstAllowedProduct: function (options) {
            for (let option of options) {
                if (this.doesTheParentAllow(option)) {
                    return option;
                }
            }
        },

        getStringsOfText: function() {
            if(this.itemText.strings) {
                return this.itemText.strings;
            }
            return [];
        },

        getDesingName: function() {
            if(this.itemFonts.value && this.itemFonts.value.name) {
                return this.itemFonts.value.name.name;
            }
            return "без дизайна";
        },

        getStyleText: function() {
            // Расчёт шрифта
            let fontSize = "24px";
            if(this.itemText.strings) {
                if(this.itemText.strings.length === 2) {
                    fontSize = "20px";
                }

                if(this.itemText.strings.length === 3) {
                    fontSize = "16px";
                }
            }

            // Расчёт цвета
            let color = colorsByOptionId18['64'];
            if(this.itemMaterials && this.itemMaterials.value) {
                color = colorsByOptionId18[this.itemMaterials.value.option_value_id];
            }

            // Шрифт
            let fontFamily = "Roboto";
            let fontWeight = "normal"
            if(this.itemFonts && this.itemFonts.value) {
                fontFamily = this.itemFonts.value.name.fontFamily;
                if( this.itemFonts.value.name.fontWeight) {
                    fontWeight = this.itemFonts.value.name.fontWeight;
                }
            }

            return {
                fontSize: fontSize,
                color: color,
                fontFamily: fontFamily,
                fontWeight: fontWeight,
            }
        },

        /*
            Расчитать цену
        */
        getFullPrice: function() {

            let price = 0;

            for(let option of [this.itemVolumes, this.itemWraps, this.itemCards, this.itemMaterials, this.itemFonts]) {
                if(option.value && option.value.price) {
                    price += parseFloat(option.value.price.replace(/\s/g, ''));
                }
            }
            return price + " руб."
        },

        addQuantity: function(q) {
            if(this.quantity + q  === 0) {
                return;
            }

            this.quantity += q;
        },

        doOrder: function() {

        },

        log: function (obj) {
            console.log(obj);
        },
    }
})