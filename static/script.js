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


// Här börjar all kod som hanterar API requesten
var v="{{=api_response}}";
console.log(v);

function passingVariables(variable) {
  console.log(variable);
}

$(function () {
  $("#btn1").on('click', function(e, variable) {
    //stänger av knappen tills operationen är klar
    $(this).prop('disabled', 'disabled');
    apiResponseObject = JSON.parse($(this).attr('api_response'));

    jobList = apiResponseObject.matchningslista.matchningdata;

    // använd data-CurrentIndex för att lagra lokal variabel
    var idx = $('#annonsrubrik').data('currentIndex');
    if (idx === undefined) {
      idx = 0;
    }

    const url = 'https://api.arbetsformedlingen.se/af/v0/platsannonser/' + jobList[idx].annonsid;
    console.log(apiResponseObject)

    // Här under hämtar vi vad vi vill ha från jsonfilen, och bestämmer i vilken div vi vill lägga datan i
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
        $('#webbplats').fadeOut('fast', function() {
          $(this).text("Ansök via:" + "\n" + result.platsannons.ansokan.webbplats).fadeIn('fast');
          // Denna sista bit måste sitta på sista paragrafen
          idx++;
          $('#annonsrubrik').data('currentIndex', idx);
          $("#btn1").removeProp('disabled');
        });
      }});
  });
});

// Här slutar hanteringen av API request