
// Dess två funktioner hanterar att lösenordet visas som tecken eller ***
function asterixPassword() {
  var x = document.getElementById("password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

function asterixPassword2() {
  var x = document.getElementById("password_2");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

/* CV */
var modalCV = document.getElementById("myModalCV");

$("#CV_btn").on('click', function(e, variable) {
  modalCV.style.display = "block";
});

// When the user clicks on <span> (x), close the modal
$('.closeCV').on('click', function () {
  modalCV.style.display = "none";
}) 

/* PB */
var modalPB = document.getElementById("myModalPB");

$("#PB_btn").on('click', function(e, variable) {
  $('#myModalPB').show()
  // modalPB.style.display = "block";
});

// When the user clicks on <span> (x), close the modal
$('.closePB').on('click', function () {
  // modalCV.style.display = "none";
  $('#myModalPB').hide();
}) 

/* PIC */
var modalPIC = document.getElementById("myModalPIC");

$("#pic_btn").on('click', function(e, variable) {
  modalPIC.style.display = "block";
});

// When the user clicks on <span> (x), close the modal
$('.closePIC').on('click', function () {
  $('#myModalPIC').hide();
});

/* PW */
var modalPW = document.getElementById("myModalPW");

$("#PW_btn").on('click', function(e, variable) {
  modalPW.style.display = "block";
});

// When the user clicks on <span> (x), close the modal
$('.closePW').on('click', function () {
  modalPW.style.display = "none";
}) 

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == $('#myModalCV')[0]) {
    modalCV.style.display = "none";
    $('#myModalCV').hide();
  }
  else if (event.target == $('#myModalPB')[0]) {
    $('#myModalPB').hide();
  }
  else if (event.target == $('#myModalPIC')[0]) {
    $('#myModalPIC').hide();
  }
}

/* Jobbknappar att stanna vid scroll */
function sticktothetop() {
  var window_top = $(window).scrollTop();
  var top = $('#stick-here').offset().top;
  if (window_top > top) {
      $('#buttons_div').addClass('stick');
      $('#stick-here').height($('#buttons_div').outerHeight());
  } else {
      $('#buttons_div').removeClass('stick');
      $('#stick-here').height(0);
  }
}
$(function() {
  $(window).scroll(sticktothetop);
  sticktothetop();
});

