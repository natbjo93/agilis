const workCategory = {
    "1": "Administration, ekonomi, juridik",
  
    "2": "Bygg och anläggning",
  
    "20": "Chefer och verksamhetsledare",
  
    "3": "Data/IT",
  
    "5": "Försäljning, inköp, marknadsföring",
  
    "6": "Hantverksyrken",
  
    "7": "Hotell, restaurang, storhushåll",
  
    "8": "Hälso- och sjukvård",
  
    "9": "Industriell tillverkning",
  
    "10": "Installation, drift, underhåll",
  
    "4": "Kropps- och skönhetsvård",
  
    "11": "Kultur, media, design",
  
    "22": "Militärt arbete",
  
    "13": "Naturbruk",
  
    "14": "Naturvetenskapligt arbete",
  
    "15": "Pedagogiskt arbete",
  
    "12": "Sanering och renhållning",
  
    "16": "Socialt arbete",
  
    "17": "Säkerhetsarbete",
  
    "18": "Tekniskt arbete",
  
    "19": "Transport"     
}

// if ($("#Category_select")[0].selectedIndex <= 0) {
//   const url = 'https://api.arbetsformedlingen.se/af/v0/platsannonser/matchning?lanid=12&sida=1&antalrader=100';
//   getJobList(url, callback);

// }

var CheckValue = $('#Category_select option:selected').val()
if (CheckValue == -1) {
  const url = 'https://api.arbetsformedlingen.se/af/v0/platsannonser/matchning?lanid=12&sida=1&antalrader=100';
    getJobList(url, callback);
}

$("#Category_select").change(function() {
    const url = 'https://api.arbetsformedlingen.se/af/v0/platsannonser/matchning?lanid=1&yrkesomradeid=' + this.value + '&sida=1&antalrader=20';
    getJobList(url, callback);
});

function getJobList(url, callback) {
    $.ajax({
        url: url,
        type: "GET",
        success: function(result){
            callback(result)
        }
    });
}
// $("#Category_select").change(function() {
//   const url = 'https://api.arbetsformedlingen.se/af/v0/platsannonser/matchning?lanid=1&yrkesomradeid=' + this.value + '&sida=1&antalrader=20';
//   getJobList(url, callback);
// });

// function getJobList(url, callback) {
//   $.ajax({
//       url: url,
//       type: "GET",
//       success: function(result){
//           callback(result)
//       }
//   });
// }

// const url = 'https://api.arbetsformedlingen.se/af/v0/platsannonser/matchning?lanid=12&sida=1&antalrader=100';

// let JobList = getJobList(url, callback);

function callback(result) {
    console.log(result);
    const firstJob = result.matchningslista.matchningdata[0];
    getJobAndDisplay(firstJob.annonsid);
    $("#no_btn").on('click', function(e, variable) {
        jobList = result.matchningslista.matchningdata;
    
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
}

  // Här börjar all kod som hanterar API requesten och skriver ut information
function getJobAndDisplay(annonsid) {
    const url = 'https://api.arbetsformedlingen.se/af/v0/platsannonser/' + annonsid;
    console.log(annonsid)
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
        });
      }});
  }
  