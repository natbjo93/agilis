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

var array1=["word1" , "word2" , "word3" , "word4" , "word5" , "word6" ];

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
    var idx = $('#annonsid').data('currentIndex');
    if (idx === undefined) {
      idx = 0;
    }
    console.log(jobList);
    $('#annonsid, #annonsnamn').fadeOut('slow', function() {
      $(this).text(jobList[idx].annonsid).fadeIn('slow');
      // idx = (idx <= (jobList.length - 2)) ? (idx + 1) : 0;

      // enable button because the operation is now completed
      $("#btn1").removeProp('disabled');
    });
    $('#annonsnamn').fadeOut('slow', function() {
      $(this).text(jobList[idx].annonsrubrik).fadeIn('slow');

      idx++;
      $('#annonsid').data('currentIndex', idx);
    });

    
  });
});