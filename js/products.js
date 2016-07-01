var gsonProductComments1,
    gsonProductComments2,
    gsonProductComments3, 	
    gsonArrProducts;

var xhrProducts = new XMLHttpRequest();
    xhrProducts.open('GET', 'http://smktesting.herokuapp.com/api/products/', true);
    xhrProducts.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhrProducts.setRequestHeader('Accept', "application/json");
    xhrProducts.onreadystatechange = function () {
        if (this.readyState === 4) {
            xhrProducts.onload = function () {
                gsonArrProducts = JSON.parse(xhrProducts.responseText);

                for (var i = 0; i < gsonArrProducts.length; i++) {
                    var item1 = document.getElementById('item1').addEventListener('click', function () {
                                document.getElementById("commentsReview").innerHTML = "";
                                document.getElementById("title").innerHTML = gsonArrProducts[0].title;
                                document.getElementById("idImg").src = "http://smktesting.herokuapp.com/static/" + gsonArrProducts[0].img;
                                document.getElementById("description").innerHTML = gsonArrProducts[0].text;
                            createElements1();
                            var hiddenHroff = document.querySelector(".itemView");
                            hiddenHroff.className = "itemView";
                        }
                    );

                    var item2 = document.getElementById('item2').addEventListener('click', function () {
                                document.getElementById("commentsReview").innerHTML = "";
                                document.getElementById("title").innerHTML = gsonArrProducts[1].title;
                                document.getElementById("idImg").src = "http://smktesting.herokuapp.com/static/" + gsonArrProducts[1].img;
                                document.getElementById("description").innerHTML = gsonArrProducts[1].text;
                            createElements2();
                        var hiddenOff = document.querySelector(".itemView");
                        hiddenOff.className = "itemView";
                    });
                }
            };
        }
    };
xhrProducts.send();

var xhrGetReviews = new XMLHttpRequest();
    xhrGetReviews.open('GET', 'http://smktesting.herokuapp.com/api/reviews/1', true);
    xhrGetReviews.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhrGetReviews.setRequestHeader('Accept', "application/json");
    xhrGetReviews.onreadystatechange = function () {
        if (this.readyState === 4) {
            xhrGetReviews.onload = function createElements1() {
                gsonProductComments1 = JSON.parse(xhrGetReviews.responseText);
            };
        }
    };

xhrGetReviews.send();
function createElements1() {
    for (var i = gsonProductComments1.length - 1; i > 0; i--) {
            var newDiv = document.createElement("div");
                newDiv.className = "review " + "js-item-" + [i];
                document.querySelector(".comments").appendChild(newDiv);
            var newSpan = document.createElement("span");
                newSpan.className = "reviewRate";
                newDiv.appendChild(newSpan);
                newSpan.innerHTML = "Rate :" + gsonProductComments1[i].rate;
            var newP = document.createElement("p");
                newP.className = "reviewComment";
                newDiv.appendChild(newP);
                newP.innerHTML = "Comment  :" + gsonProductComments1[i].text;
    }
}

var xhrReviews2 = new XMLHttpRequest();
    xhrReviews2.open('GET', 'http://smktesting.herokuapp.com/api/reviews/2', true);
    xhrReviews2.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhrReviews2.setRequestHeader('Accept', "application/json");
    xhrReviews2.onreadystatechange = function () {
        if (this.readyState === 4) {
                xhrReviews2.onload = function () {
                    gsonProductComments2 = JSON.parse(xhrReviews2.responseText);
            };
        }
    };
xhrReviews2.send();

function createElements2() {
    for (var i = gsonProductComments2.length - 1; i > 0; i--) {
            var newDiv = document.createElement("div");
                newDiv.className = "review " + "js-item-" + [i];
                document.querySelector(".comments").appendChild(newDiv);
            var newSpan = document.createElement("span");
                newSpan.className = "reviewRate";
                newDiv.appendChild(newSpan);
                newSpan.innerHTML = "Rate :" + gsonProductComments2[i].rate;
            var newP = document.createElement("p");
                newP.className = "reviewComment";
                newDiv.appendChild(newP);
                newP.innerHTML = "Comment text :" + gsonProductComments2[i].text;
    }
}
function SubmitReviewForItem() {
    var submitReview = document.querySelector(".btnReview");
        submitReview.addEventListener("click", function () {
        var review = document.querySelector("#content").value,
            star = document.getElementsByName('star');
        for (var i = 0; i < star.length; i++) {
            if (star[i].type == "radio" && star[i].checked) {
                var rate = star[i].value
            }

        }
        var reviews1 = "rate=" + rate + "&text=" + review;
        if (document.querySelector(".Item1").innerHTML === "product1") {
            var xhrPostReviewProd1 = new XMLHttpRequest();
                xhrPostReviewProd1.open('POST', 'http://smktesting.herokuapp.com/api/reviews/1', true);
                xhrPostReviewProd1.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                xhrPostReviewProd1.setRequestHeader('Accept', "application/json");
                xhrPostReviewProd1.setRequestHeader('Authorization', 'Token ' + jsonProductLogin.token);
                xhrPostReviewProd1.onreadystatechange = function () {
                    if (this.readyState === 4) {
                        xhrPostReviewProd1.onload = function () {
                            document.querySelector("#content").value = "";
                        }
                    }
                };
            xhrPostReviewProd1.send(reviews1);
        } else {
            var xhrPostReviewProd2 = new XMLHttpRequest();
                xhrPostReviewProd2.open('POST', 'http://smktesting.herokuapp.com/api/reviews/2', true);
                xhrPostReviewProd2.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                xhrPostReviewProd2.setRequestHeader('Accept', "application/json");
                xhrPostReviewProd2.setRequestHeader('Authorization', 'Token ' + jsonProductLogin.token);
                xhrPostReviewProd2.onreadystatechange = function () {
                    if (this.readyState === 4) {
                        xhrPostReviewProd2.onload = function () {
                            document.querySelector("#content").value = "";
                        }
                    }
                };
            xhrPostReviewProd2.send(reviews1);
        }
    })
}