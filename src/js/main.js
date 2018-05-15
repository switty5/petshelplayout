var store = {
    init: function () {

    }
};

var loginRegPage = {
    init: function () {
        var _this = this;
        $login = $("#login");
        $password = $("#password");
        $passwordConfirm = $("#password_confirm");

        /* клик на кнопку вход/регистрации */
        $(".login_reg_submit").click(function () {
            _this.checkInput($login);
            _this.checkInput($password);
            _this.checkInput($passwordConfirm);
            _this.comparingPasswords();
        });

        /* проверка ввода в инпуте */
        $("input").keyup(function () {
            $(this).parent().parent().removeClass("err_input")
        })
    },
    checkInput: function (input) {
        if (input.val() === "") {
            input.parent().parent().addClass("err_input")
        }
    },
    comparingPasswords: function () {
        if ($password.val() !== $passwordConfirm.val()) {
            $password.parent().parent().addClass("err_input");
            $passwordConfirm.parent().parent().addClass("err_input")
            console.log($password)
            console.log($passwordConfirm)
        }

    }
};

var nav = {
    init: function () {
        var _this = this;
        $menuItem = $(".p-menu__item");
        $navLinkIcon = $(".p-nav__link-icon");
        $dropdownForIcons = $(".p-dropdown__for-icons");

        /* TOP меню основные линки(left) */
        $menuItem.click(function () {
            $(this).toggleClass('nav--active');
        });

        /* TOP меню поиск */
        $navLinkIcon.click(function () {
            $(this).parents('.p-toolbar__items').toggleClass('nav--active');
            $(this).siblings(".p-dropdown__for-icons").find('input').focus();
        });
    }
};

$(document).ready(function () {
    loginRegPage.init();
    nav.init();
    store.init();
});