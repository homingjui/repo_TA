import socket
import threading
import MySQLdb

host = ''        # Symbolic name meaning all available interfaces
port = 1905     # Arbitrary non-privileged port
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind((host, port))
s.listen(1)

print "[*] Listening on %s:%d" % (host, port)

def recive(client):
    while True:
        request = client.recv(128)[:-1]
        if not request:
	    break
	print(request)
	client.send("get "+request+"\n")
    print "connection closed"
    client.send("send end")
    client.close()

while True:
    try:
        client, addr = s.accept()
        print "New connection from: %s" % (addr[0])
        client_handler = threading.Thread(target=recive, args=(client,))
        client_handler.start()
    except KeyboardInterrupt:
        s.close()
        print ("server closed")

