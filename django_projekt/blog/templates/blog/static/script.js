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

var v="{{=api_response}}";
console.log(v);

function passingVariables(variable) {
  console.log(variable);
}

$(function () {
  $("#btn1").on('click', function(e, variable) {
    // disable button till the operation is completed
    $(this).prop('disabled', 'disabled');
    // console.log({$(this).attr('api_response'));
    apiResponseObject = JSON.parse($(this).attr('api_response'));

    jobList = apiResponseObject.matchningslista.matchningdata;

    // use data-currentIndex to store the local variable i
    var idx = $('#annonsrubrik').data('currentIndex');
    if (idx === undefined) {
      idx = 0;
    }

    const url = 'https://api.arbetsformedlingen.se/af/v0/platsannonser/' + jobList[idx].annonsid;
    console.log(apiResponseObject)

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