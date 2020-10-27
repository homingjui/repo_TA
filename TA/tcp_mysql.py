import socket
import threading
import MySQLdb

host = ''        # Symbolic name meaning all available interfaces
port = 1903     # Arbitrary non-privileged port
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind((host, port))
s.listen(1)

db = MySQLdb.connect(host="localhost",
    user="root", passwd="landis", db="TA")

sql = "INSERT INTO xxx (data) VALUES (%s)"

print "[*] Listening on %s:%d" % (host, port)

def recive(client): 
    while True:
        request = client.recv(128)[:-1]
        if not request:
	    break
	print(request)
	client.send("get "+request+"\n")
	cursor = db.cursor()
	val = [(request)]
    	cursor.execute(sql, val)
	db.commit()
	cursor.close()

    client.send("send end")
    print addr,"connection closed"
    client.close()

cursor = db.cursor()
cursor.execute("show tables")
results = cursor.fetchall()
print results
cursor.close()

while True:
    try:
        client, addr = s.accept()
        print "New connection from: %s" % (addr[0])
        client_handler = threading.Thread(target=recive, args=(client,))
        client_handler.start()
    except KeyboardInterrupt:
        s.close()
        db.close()
        print ("server closed")

