from bottle import route, run, template, static_file, request, response, redirect
import json
import psycopg2
import requests

conn = psycopg2.connect(dbname="agilis", user="ai9707" , password="gpvfieda", host="pgserver.mah.se")
cursor = conn.cursor()

def api_response():
    '''
    Hämtar API från arbetsförmedlingen och lägger i en jsonfil
    '''
    res = requests.get('https://api.arbetsformedlingen.se/af/v0/platsannonser/matchning?lanid=12&sida=1&antalrader=100', headers={'Accept-language': 'application/json'})
    if res.status_code != 200:
        raise Exception("ERROR")
    api_res = json.dumps(res.json())
    print(api_res)
    return api_res

@route("/")
def index():
    return template("index", root="static")

@route("/static/<filename>")
def server_static(filename):
    return static_file(filename, root="static")

@route("/check_login", method="POST")
def check_login():
    '''
    Jämför användardata från htmlform med data från databas, alltså ser om inloggningsuppgifterna stämmer
    '''
    try:
        username = getattr(request.forms ,"username")
        password = getattr(request.forms, "password")
        cursor.execute("select losen from profil where email= '" + (username) + "'")
        database_password = cursor.fetchone()
        if database_password[0] == password:
            response.set_cookie('account', username, secret= '123')
            return redirect("profil")
        else:
            return redirect("/")
    except:
        return redirect("/")

@route("/register", method="POST")
def register():
    '''
    Lägger in data från htmlform i databasen, registrerar en ny användare
    '''
    first_name = getattr(request.forms ,"first_name")
    last_name = getattr(request.forms, "last_name")
    email = getattr(request.forms, "email")
    password = getattr(request.forms, "password")
    query = "insert into profil(email, fnamn, enamn, losen) values (%s, %s, %s, %s)"
    cursor.execute(query, [str(email), str(first_name), str(last_name), str(password)])
    conn.commit()
    return template("index", root="static")

@route("/sokjobb")
def sok_jobb():
    '''
    Ser till så användaren är inloggad med hjälp av cookies, samt skickar med API med jobb så JavaScript kan arbeta med den
    '''
    username = request.get_cookie('account', secret='123')
    if username:
        return template("sokjobb", root="static", api_response=api_response())
    else:
        return redirect("/")

@route("/signout")
def signout():
    '''
    Loggar ut genom att ta bort cookien
    '''
    response.delete_cookie('account')
    return redirect("/")

@route("/kontakt")
def kontakt():
    return template("kontakt", root="static")

@route("/info")
def info():
    return template("info", root="static")

@route("/profil")
def profil():
    username = request.get_cookie('account', secret='123')
    if username:
        return template("profil", root="static")
    else:
        return redirect("/")

@route("/cv_personligt_brev")
def cv():
    return template("cv_personligt_brev", root="static")

@route("/sparade_cv_pb")
def sparade_cv_pb():
    return template("sparade_cv_pb", root="static")

'''
@route("/upload")
def upload():
    img = request.post.get("filename")
    move_file("resourses/upload/img[name], img")


@app.route("/upload", methods=['POST'])
def upload_file():
    def custom_stream_factory(total_content_length, filename, content_type, content_length=None):
        import tempfile
        tmpfile = tempfile.NamedTemporaryFile('wb+', prefix='flaskapp', suffix='.nc')
        app.logger.info("start receiving file ... filename => " + str(tmpfile.name))
        return tmpfile

'''

run(host="localhost", port=8081)

