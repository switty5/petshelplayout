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
        }

    }
};

var nav = {
    init: function () {
        var _this = this;
        $childLinkToggle = $(".child-link-toggle");
        $inputSearch = $("#input-search");

        /* TOP nav toggle links */
        $childLinkToggle.click(function () {
            $(this).parents('.parent-link-toggle').toggleClass('nav--active');
        });

        /* Поиск в TOP nav */
        $inputSearch.keyup(function () {
            $('.p-dropdown__body').show();
        });
    }
};

$(document).ready(function () {
    loginRegPage.init();
    nav.init();
    store.init();
});