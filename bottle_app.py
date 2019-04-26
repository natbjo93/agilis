from bottle import route, run, template, static_file, request
import json

import psycopg2
conn = psycopg2.connect(dbname="ai9707", user="ai9707" , password="gpvfieda", host="pgserver.mah.se")
cursor = conn.cursor()

import requests

def api_response():
    res = requests.get('https://api.arbetsformedlingen.se/af/v0/platsannonser/matchning?lanid=12&sida=1&antalrader=10', headers={'Accept-language': 'application/json'})
    if res.status_code != 200:
        raise Exception("ERROR")
    api_res = json.dumps(res.json())
    return api_res
    # print(test)

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
    database_password = cursor.fetchall()
    try:
        if database_password[0][0] == password:
            return template("profil")
        else:
            return template("index")
    except:
        print(database_password)
        if database_password[0] == password:
            return template("profil")
        else:
            return template("index")

@route("/register", method="POST")
def register():
    first_name = getattr(request.forms ,"first_name")
    last_name = getattr(request.forms, "last_name")
    email = getattr(request.forms, "email")
    password = getattr(request.forms, "password")
    cursor.execute("insert into profil(email, fnamn, Enamn, losen) values ('" + (email) + "', '" + (first_name) + "', '" + (last_name) + "', '" + (password) + "')")
    conn.commit()
    return template("index")

@route("/profil")
def profil():
    # api_response()
    return template("profil", root="static", api_response=api_response())

@route("/kontakt")
def kontakt():
    return template("kontakt", root="static")

@route("/info")
def kontakt():
    return template("info", root="static")

@route("/sokjobb")
def kontakt():
    return template("sokjobb", root="static")

run(host="localhost", port=8000)

