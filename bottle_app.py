from bottle import route, run, template, static_file, request, response, redirect
import json

import psycopg2
conn = psycopg2.connect(dbname="agilis", user="ai9707" , password="gpvfieda", host="pgserver.mah.se")
cursor = conn.cursor()

import requests

def api_response():
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
    username = getattr(request.forms ,"username")
    password = getattr(request.forms, "password")
    cursor.execute("select losen from profil where email= '" + (username) + "'")
    database_password = cursor.fetchone()
    print(type(database_password))
    if database_password[0] == password:
        response.set_cookie('account', username, secret= '123')
        return template("profil", root="static")
    else:
        return redirect("index")


@route("/register", method="POST")
def register():
    first_name = getattr(request.forms ,"first_name")
    last_name = getattr(request.forms, "last_name")
    email = getattr(request.forms, "email")
    password = getattr(request.forms, "password")
    query = "insert into profil(email, fnamn, enamn, losen) values (%s, %s, %s, %s)"
    cursor.execute(query, [str(email), str(first_name), str(last_name), str(password)])
   # cursor.execute("insert into profil(email, fnamn, Enamn, losen) values ('" + (email) + "', '" + (first_name) + "', '" + (last_name) + "', '" + (password) + "')")
    conn.commit()
    return template("index", root="static")

@route("/sokjobb")
def sok_jobb():
    username = request.get_cookie('account', secret='123')
    if username:
        return template("sokjobb", root="static", api_response=api_response())
    else:
        return redirect("/")

@route("/signout")
def signout():
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

run(host="localhost", port=8081)

