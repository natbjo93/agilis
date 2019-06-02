/* Sätter default profile pic för nya användare */
var profile_pic = $("#profilbild").attr('src');

if (profile_pic == 'None'){
  $("#profilbild").attr("src", "static/default_profile_pic.png");
}
else {
  $("#profilbild").attr("src", profile_pic);
}

/* Visar upp personliga brev och CV i ny flik*/
let pb_data = $("#display_PB").attr('pb_data');
var port = location.port 

$('li').on('click', function(event) {
  const clickedElement = $(event.target);

  if (clickedElement.attr('pb_location')) {
    window.open('http://localhost:' + port + '/' + $(event.target).attr('pb_location'))
  }
});

pb_data = JSON.parse(pb_data);
const pb_names = pb_data.names;
const pb_paths = pb_data.locations;

var index = 0;
pb_names.forEach(name => {
    const ourNewElement = `<li pb_location="${pb_paths[index]}">${name}</li>`;
    $('#display_PB').append(ourNewElement);
    index++;
});

var display_CV = $("#display_CV").text();

function displayCV(id) { 
  window.open(display_CV);
}

var display_PB = $("#display_PB").text();


function displayPB(id) { 
  console.log('herro')
  window.open(id);
}
