from bottle import route, run, template, static_file, request, response, redirect
import json
import psycopg2
import requests
import os
import uuid

conn = psycopg2.connect(dbname="agilis", user="ai9707" , password="gpvfieda", host="pgserver.mah.se")
cursor = conn.cursor()

def get_pbs_names():
    '''
    Hämtar personliga brevs namn för inloggad användare
    '''
    username = request.get_cookie('account', secret='123')
    cursor.execute("select pb_namn from personligabrev where email= '" + (username) + "'")
    pb_fetch = cursor.fetchall()
    pb_names = []
    for i in pb_fetch:
        pb_names.append(i[0])
    print(pb_names)
    return pb_names

def get_pbs_location():
    '''
    Hämtar personliga brev path för inloggad användare
    '''
    username = request.get_cookie('account', secret='123')
    cursor.execute("select pb from personligabrev where email = '" + (username) + "'")
    pb_fetch = cursor.fetchall()
    pb_locations = []
    for i in pb_fetch:
        pb_locations.append(i[0])
    print(pb_locations)
    return pb_locations

@route("/")
def index():
    return template("index", root="static")

@route("/static/<filename>")
def server_static(filename):
    return static_file(filename, root="static")

@route("/static/uploads/<filepath:path>")
def server_static(filepath):
    return static_file(filepath, root="static/uploads/")

@route("/login")
def login():
    return template("login", root="static")

@route("/kontakt")
def kontakt():
    return template("kontakt", root="static")

@route("/info")
def info():
    return template("info", root="static")

@route("/cv_personligt_brev")
def cv():
    return template("cv_personligt_brev", root="static")

@route("/sparade_cv_pb")
def sparade_cv_pb():
    return template("sparade_cv_pb", root="static")

@route("/register_sucess")
def register_sucess():
    return template("register_sucess", root="static")

@route("/check_login", method="POST")
def check_login():
    '''
    Jämför användardata från htmlform med data från databas, alltså ser om inloggningsuppgifterna stämmer
    '''
    try:
        username = getattr(request.forms ,"username")
        password = getattr(request.forms, "password")
        cursor.execute("select losen from profil where email = '" + (username) + "'")
        database_password = cursor.fetchone()
        if database_password[0] == password:
            response.set_cookie('account', username, secret= '123')
            return redirect("/profil")
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
    query = "insert into profil(email, first_name, last_name, losen) values (%s, %s, %s, %s)"
    cursor.execute(query, [str(email), str(first_name), str(last_name), str(password)])
    conn.commit()
    return template("register_sucess", root="static")


@route("/sokjobb")
def sok_jobb():
    '''
    Ser till så att användaren är inloggad med hjälp av cookies, sen visar upp jobb genom Javascripten
    '''
    username = request.get_cookie('account', secret='123')
    if username:
        return template("sokjobb", root="static")
    else:
        return redirect("/login")

@route("/signout")
def signout():
    '''
    Loggar ut genom att ta bort cookien
    '''
    response.delete_cookie('account')
    return redirect("/")

@route("/profil")
def profil():
    '''
    Profil med cookies. Massor variabler som skickas med för användarens information ska visas på profilen
    '''
    username = request.get_cookie('account', secret='123')
    if username:
        cursor.execute("select first_name, last_name, email, profile_pic, cv from profil where email = '" + (username) + "'")
        namelist = cursor.fetchone()
        first_name = namelist[0]
        last_name = namelist[1]
        email = namelist[2]
        profile_pic = namelist[3]
        cv = namelist[4]
        pb_names = get_pbs_names()
        pb_locations = get_pbs_location()
        pb_data = {
            'names': pb_names,
            'locations': pb_locations
        }
        return template("profil", root="static", first_name = first_name, last_name = last_name, email = email, profile_pic = profile_pic, cv = cv, pb_data = json.dumps(pb_data))
    else:
        return redirect("/login")

@route("/uploadpic", method="POST")
def uploadpic():
    '''
    Till för filuppladdning av bilder
    '''
    user_email = request.get_cookie('account', secret="123")
    upload = request.files.get('filename')
    name, ext = os.path.splitext(upload.filename)
    if ext not in ('.jpg, .png, .jpeg'):
        return "File extension not allowed."
    save_path = "static/uploads/{}".format(user_email)
    if not os.path.exists(save_path):
        os.makedirs(save_path)
    file_path = "{path}/{file}".format(path=save_path, file=upload.filename)
    upload.save(file_path)
    cursor.execute("update profil set profile_pic = '{}' where email = '{}'".format(file_path, user_email))
    conn.commit()
    return redirect("/profil")

@route("/uploadcv", method="POST")
def uploadcv():
    '''
    Till för filuppladdning av CV
    '''
    user_email = request.get_cookie('account', secret="123")    
    upload = request.files.get('filename')
    name, ext = os.path.splitext(upload.filename)
    name = str(uuid.uuid4())
    print(name)
    if ext not in ('.pdf'):
        return "File extension not allowed."
    save_path = "static/uploads/{}".format(user_email)
    if not os.path.exists(save_path):
        os.makedirs(save_path)
    file_path = "{path}/{file}".format(path=save_path, file=name + ext)
    upload.save(file_path)
    cursor.execute("update profil set cv = '{}' where email = '{}'".format(file_path, user_email))
    conn.commit()
    return redirect("/profil")

@route("/uploadpb", method="POST")
def uploadpb():
    '''
    Till för filuppladdning av Personliga brev
    '''
    user_email = request.get_cookie('account', secret="123")
    pb_namn = getattr(request.forms, "pb_namn")
    upload = request.files.get('filename')
    name, ext = os.path.splitext(upload.filename)
    name = str(uuid.uuid4())
    print(name)
    if ext not in ('.pdf'):
        return "File extension not allowed."
    save_path = "static/uploads/{}".format(user_email)
    if not os.path.exists(save_path):
        os.makedirs(save_path)
    file_path = "{path}/{file}".format(path=save_path, file=name + ext)
    upload.save(file_path)
    cursor.execute("insert into personligabrev(id, email, pb, pb_namn) values ('{}', '{}', '{}', '{}')".format(uuid.uuid4(), user_email, file_path, pb_namn))
    conn.commit()
    return redirect("/profil")

@route("/change_pw", method="POST")
def change_pw():
    '''
    Ändra lösenord
    '''
    user_email = request.get_cookie('account', secret="123")
    password = getattr(request.forms, "password")
    cursor.execute("update profil set losen = '{}' where email = '{}'".format(password, user_email))
    conn.commit()
    return redirect("/profil")

run(host="localhost", port=8086, reloader=True)

