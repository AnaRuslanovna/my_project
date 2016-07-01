var jsonProductLogin,
    gsonArrProducts;

function registration() {
    document.querySelector('#regBtn').addEventListener('click', function () {

        var newUser = document.getElementById("username").value,
            newLogin = document.getElementById("pwdLogin").value,
            registration = 'username=' + newUser + '&password=' + newLogin,
            xhrRegistration = new XMLHttpRequest();

            xhrRegistration.open('POST', 'http://smktesting.herokuapp.com/api/register/', true);
            xhrRegistration.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhrRegistration.setRequestHeader('Accept', "application/json");
            xhrRegistration.onreadystatechange = function () {
                if (this.readyState === 4) {
                    xhrRegistration.onload = function () {
                        gsonProductComments3 = JSON.parse(xhrRegistration.responseText);

                        if (gsonProductComments3.success === true) {
                            alert("Успешная регистрация! Теперь войдите в систему");
                            $("#myModal").modal("hide");
                        }
                        else {
                            var registrationValid = document.querySelector(".validRegistration");
                                registrationValid.className = "validRegistration";
                        }
                    };
                }
            };
        xhrRegistration.send(registration);
    });
}
registration();

function login() {
    document.querySelector('.btn').addEventListener('click', function (event) {
        event.preventDefault();

        var user = document.querySelector("#InputPassword").value,
            login = document.querySelector("#Inputlogin").value,
            registration = 'username=' + login + '&password=' + user,
            xhrLogin = new XMLHttpRequest();

            xhrLogin.open('POST', 'http://smktesting.herokuapp.com/api/login/', true);
            xhrLogin.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhrLogin.setRequestHeader('Accept', "application/json");
            xhrLogin.onreadystatechange = function () {
                if (this.readyState === 4) {
                    xhrLogin.onload = function () {
                        jsonProductLogin = JSON.parse(xhrLogin.responseText);

                        if (jsonProductLogin.success === true) {
                            var registrationHidden = document.getElementById("registrationMenu");
                                registrationHidden.className = "hidden";
                            var rateHiddenOff = document.querySelector('.new-review');
                                rateHiddenOff.className = 'new-review';

                            document.getElementById("title").innerHTML = gsonArrProducts[0].title;
                            document.getElementById("idImg").src = "http://smktesting.herokuapp.com/static/" + gsonArrProducts[0].img;
                            document.getElementById("description").innerHTML = gsonArrProducts[0].text;

                            var hiddenHroff = document.querySelector(".itemView");
                                hiddenHroff.className = "itemView";
                            var exit = document.querySelector(".exit");
                                exit.className = "exit";
                            createElements1();
                            SubmitReviewForItem();
                        }
                        else {
                            var loginValidation = document.querySelector(".loginValidation");
                                loginValidation.className = ".loginValidation";
                        }
                    };
                }
            };
        xhrLogin.send(registration);
    });
}
login();

document.querySelector(".exit").addEventListener("click", function () {
    window.location.reload();
});