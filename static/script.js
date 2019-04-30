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
        $('#annonsrubrik').fadeOut('slow', function() {
          $(this).text(result.platsannons.annons.annonsrubrik).fadeIn('slow');
        });
        $('#yrkesbenamning').fadeOut('slow', function() {
          $(this).text(result.platsannons.annons.yrkesbenamning).fadeIn('slow');
        });
        $('#annonstext').fadeOut('slow', function() {
          $(this).text(result.platsannons.annons.annonstext).fadeIn('slow');
        });
        $('#kommunnamn').fadeOut('slow', function() {
          $(this).text(result.platsannons.annons.kommunnamn).fadeIn('slow');
          idx++;
          $('#annonsrubrik').data('currentIndex', idx);
          $("#btn1").removeProp('disabled');
        });
      }});
  });
});