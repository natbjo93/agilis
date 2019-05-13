#!c:\python27\python.exe

print ("content-type:text/html\r\n\r\n")
import cgi, os
import cgitb
cgitb.enable()

import os, sys
try:
    import msvcrt
    msvcrt.setmode (0, os.O_BINARY)
    msvcrt.setmode (1, os.O_BINARY)
except ImportError:
    pass

form = cgi.FieldStorage()
fileitem = form['filename']

print ("------")
print ("filename", fileitem.filename)
print ("file", fileitem.file)
print ("------")


if fileitem.filename:
    fn = os.path.basename(fileitem.filename)
    open(fn, 'wb').write(fileitem.file.read(250000))
    message = 'The file"' + fn + '"was uploaded succesfully'

else:
    message += 'No file was uploaded'

print ("""<html><body><p>‰</p></body></html>""")
