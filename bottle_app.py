from bottle import route, run, template, static_file, request

import psycopg2
conn = psycopg2.connect(dbname="ai9707", user="ai9707" , password="gpvfieda", host="pgserver.mah.se")
cursor = conn.cursor()

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
    if database_password[0][0] == password:
        return template("profil")
    else:
        print("fel")

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
    return template("profil", root="static")

run(host="localhost", port=9000)

