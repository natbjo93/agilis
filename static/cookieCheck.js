/* kolla cookie */

function getCookie(name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length == 2) {
      return parts.pop().split(";").shift();
    }
}
  
if(getCookie('account')) {
  console.log('account')
  $("#login_or_logout").attr("href", "/signout");
  $("#login_or_logout").html("Logga ut");
  console.log($("#login_or_logout"));
} else {
  $("#login_or_logout").attr("href", "/login");
  $("#login_or_logout").html("Logga in/registrera dig");
}

var profile_pic = $("#profilbild").attr('src');
console.log(profile_pic)

if (profile_pic == 'None'){
$("#profilbild").attr("src", "static/default_profile_pic.png");
console.log('hej')
}
else {
$("#profilbild").attr("src", profile_pic);
console.log(profile_pic)  
}
