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
// Get the <span> element that closes the modal
var spanCV = document.getElementsByClassName("closeCV")[0];
// When the user clicks on <span> (x), close the modal
spanCV.onclick = function() {
  modalCV.style.display = "none";
}

/* PB */
var modalPB = document.getElementById("myModalPB");

$("#PB_btn").on('click', function(e, variable) {
  modalPB.style.display = "block";
});
// Get the <span> element that closes the modal
var spanPB = document.getElementsByClassName("closePB")[0];
// When the user clicks on <span> (x), close the modal
spanPB.onclick = function() {
  modalPB.style.display = "none";
}

/* PIC */
var modalPIC = document.getElementById("myModalPIC");

$("#pic_btn").on('click', function(e, variable) {
  modalPIC.style.display = "block";
});
// Get the <span> element that closes the modal
var spanPIC = document.getElementsByClassName("closePIC")[0];
// When the user clicks on <span> (x), close the modal
spanPIC.onclick = function() {
  modalPIC.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modalCV) {
    modalCV.style.display = "none";
  }
  else if (event.target == modalPB) {
    modalPB.style.display = "none";
  }
  else if (event.target == modalPIC) {
    modalPIC.style.display = "none";
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

// Här börjar all kod som hanterar API requesten och skriver ut information
function getJobAndDisplay(annonsid) {
  const url = 'https://api.arbetsformedlingen.se/af/v0/platsannonser/' + annonsid;

  $.ajax({
    url: url,
    type: "GET",
    success: function(result) {
      $('#annonsrubrik').fadeOut('fast', function() {
        
        $(this).text(result.platsannons.annons.annonsrubrik).fadeIn('fast');
      });
      $('#yrkesbenamning').fadeOut('fast', function() {
        $(this).text(result.platsannons.annons.yrkesbenamning).fadeIn('fast');
      });
      $('#annonstext').fadeOut('fast', function() {
        $(this).text(result.platsannons.annons.annonstext).fadeIn('fast');
      });
      $('#kommunnamn').fadeOut('fast', function() {
        $(this).text("Kommun:" + "\n" + result.platsannons.annons.kommunnamn).fadeIn('fast');
      });
      $('#varaktighet').fadeOut('fast', function() {
        $(this).text(result.platsannons.villkor.varaktighet).fadeIn('fast');
      });
      $('#arbetstid').fadeOut('fast', function() {
        $(this).text(result.platsannons.villkor.arbetstid).fadeIn('fast');
      });
      $('#lonetyp').fadeOut('fast', function() {
        $(this).text(result.platsannons.villkor.lonetyp).fadeIn('fast');
      });
      $('#loneform').fadeOut('fast', function() {
        $(this).text(result.platsannons.villkor.loneform).fadeIn('fast');
      });
      $('#sista_ansokningsdag').fadeOut('fast', function() {
        const expire_date = new Date(result.platsannons.ansokan.sista_ansokningsdag).toLocaleDateString();
        $(this).text("Sista ansökningsdag:" + "\n" + expire_date).fadeIn('fast');
      });
      $('#apply').attr('action', result.platsannons.ansokan.webbplats);
      $('#webbplats').fadeOut('fast', function() {
        $(this).text("Ansök via:" + "\n" + result.platsannons.ansokan.webbplats).fadeIn('fast');
        // Denna sista bit måste sitta på sista paragrafen
        // $(this).removeProp('disabled');
      });
    }});
}

// Renderar första jobbet vid inladdning av sidan
const firstJob = JSON.parse($('#btn1').attr('api_response')).matchningslista.matchningdata[0];
getJobAndDisplay(firstJob.annonsid);

$(function () {
  $("#no_btn").on('click', function(e, variable) {
    apiResponseObject = JSON.parse($(btn1).attr('api_response'));
    jobList = apiResponseObject.matchningslista.matchningdata;

    // använd data-CurrentIndex för att lagra lokal variabel, som är var i jobblistan vi hämtar id
    var idx = $('#no_btn').data('currentIndex');
    if (idx === undefined) {
      idx = 1;
    }

    const annonsId = jobList[idx].annonsid;

    getJobAndDisplay(annonsId);

    // Öka index för vilket jobb i jobblistan vi ska hämta nästa gång
    idx++;
    $('#no_btn').data('currentIndex', idx);

  });    
});

