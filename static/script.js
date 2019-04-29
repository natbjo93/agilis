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

    const url = 'https://api.arbetsformedlingen.se/af/v0/platsannonser/' + jobList[idx].annonsid;

    const url_2 = 'https://api.arbetsformedlingen.se/af/v0/platsannonser/' + jobList[idx].annonsid + '/typ=html?lang=SV';

    $.ajax({
      url: url,
      type: "GET",
      success: function(result) {
        $.ajax(
          { url: url_2,
            type: "GET",
            success: function(returnData) { 

              // Jquery find <mytag attribute="foo">...</mytag> and store it in mydata
              const mydata = $(returnData).find('div[class="text"]');
              // Insert into current page to somewhere with class="after-me"
              console.log(mydata.innerHtml())
              $('#lan').load(mydata);
           },
           error: function(error) {
             console.log('error', error)
           }
        });  

    console.log(jobList);
    $('#annonsid, #annonsnamn, #kommunnamn, #lan, #anstallningstyp, #publiceraddatum, #sista_ansokningsdag').fadeOut('slow', function() {
      $(this).text(jobList[idx].annonsid).fadeIn('slow');
      // idx = (idx <= (jobList.length - 2)) ? (idx + 1) : 0;

      // enable button because the operation is now completed
      $("#btn1").removeProp('disabled');
    });
    $('#annonsnamn').fadeOut('slow', function() {
      $(this).text(jobList[idx].annonsrubrik).fadeIn('slow');
    });
    $('#kommunnamn').fadeOut('slow', function() {
      $(this).text(jobList[idx].kommunnamn).fadeIn('slow');
    });
    $('#lan').fadeOut('slow', function() {
      $(this).text(jobList[idx].lan).fadeIn('slow');
    });
    $('#anstallningstyp').fadeOut('slow', function() {
      $(this).text(jobList[idx].anstallningstyp).fadeIn('slow');
    });
    $('#publiceraddatum').fadeOut('slow', function() {
      $(this).text(jobList[idx].publiceraddatum).fadeIn('slow');
    });
    $('#sista_ansokningsdag').fadeOut('slow', function() {
      $(this).text(jobList[idx].sista_ansokningsdag).fadeIn('slow');
    });

      //Denna del under måste sitta på sista anropsparagrafen
      idx++;
      $('#annonsid').data('currentIndex', idx);
    });
  
  
  });
});