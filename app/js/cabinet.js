const CabinetEdit = {
    listFields() {
        return ["edit-data", "edit-address", "edit-pass"]
    },
    changeUserData() {
        this.action(0);
    },

    changeAddress() {
        this.action(1);
    },

    changePassWord() {
        this.action(2);
    },
    action(a) {
        let ac = document.getElementById(this.listFields()[a]);
        if (window.screen.width > 768) {
            ac.style.cssText = `display:block; z-index: 6`;

            document.getElementById("cabinet-main-container").style.marginLeft = "-401px";
            document.getElementById("cabinet-header-sidebar").style.marginRight = "401px";
            document.getElementById("cabinet-header-sidebar-gray").style.right = "0";

        } else {
            ac.style.cssText = `right: -50px;`;
            document.getElementById("cabinet-header-sidebar-gray").style.right = "-50px";
            document.body.style.position = 'fixed';
        }

        let w = document.getElementsByClassName("cabinet-wrapper");
        for (let i = 0; i < w.length; i++) {
            w[i].style.cssText = `display: block; opacity: 0.8`;
        }
    },
    close() {
        if (window.screen.width > 768) {
            document.getElementById("cabinet-main-container").style.marginLeft = "0";
            document.getElementById("cabinet-header-sidebar").style.marginRight = "0";
            document.getElementById("cabinet-header-sidebar-gray").style.right = "-401px";
        } else {
            for (let i = 0; i < this.listFields().length; i++) {
                document.getElementById(this.listFields()[i]).style.right = "-410px";
            }
            document.getElementById("cabinet-header-sidebar-gray").style.right = "-401px";
            document.body.style.position = '';
        }


        let w = document.getElementsByClassName("cabinet-wrapper");
        for (let i = 0; i < w.length; i++) {
            w[i].style.cssText = `opacity:0; display: none;`;
        }

        setTimeout(() => {
            for (let i = 0; i < this.listFields().length; i++) {
                document.getElementById(this.listFields()[i]).style.zIndex = "3";
            }
        }, 1000);
    }
};

Inputmask("+7 (9{3}) 9{3}-9{2}-9{2}").mask(document.getElementById("cabinet-edit-text-tel"));