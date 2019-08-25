$(function() {
  let username = document.querySelector("#username");
  let password = document.querySelector("#password");
  let loginForm = document.querySelector("#login-form");

  loginForm.addEventListener("submit", login);

  function login(e) {
    e.preventDefault();
    console.log("OKKK");
    e = username.value;
    p = password.value;
    console.log({ e, p });
    if (e === "asim" && p === "dahal") {
      console.log("ahe");
      window.location.href = "/dashboard.html";
    }
  }
  $("#login-form-link").click(function(e) {
    $("#login-form")
      .delay(100)
      .fadeIn(100);
    $("#register-form").fadeOut(100);
    $("#register-form-link").removeClass("active");
    $(this).addClass("active");
    e.preventDefault();
  });
  $("#register-form-link").click(function(e) {
    $("#register-form")
      .delay(100)
      .fadeIn(100);
    $("#login-form").fadeOut(100);
    $("#login-form-link").removeClass("active");
    $(this).addClass("active");
    e.preventDefault();
  });
});
