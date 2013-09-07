import cherrypy
import argparse
import os
from note_store import Note

class DictaChevServer(object):
    
    @cherrypy.expose
    def index(self):
        return "fuck yeh"

    @cherrypy.expose
    def create_note(self):
        note = Note()
        note.create_note("marley's box", "open all hours..with a kebab and a back alley")
        return "note created"

def start_server():
    """ Starts the client proxy """

    parser = argparse.ArgumentParser(description='DictaChev Server')
    parser.add_argument('--host', default='127.0.0.1')
    parser.add_argument('-p', '--port', default=9000, type=int)
    parser.add_argument('--ssl', action='store_true')
    args = parser.parse_args()

    cherrypy.config.update({
        'server.socket_host': args.host,
        'server.socket_port': args.port,
        'tools.staticdir.root': os.path.abspath(os.path.join(os.path.dirname(__file__), 'static'))
    })

    cherrypy.quickstart(DictaChevServer())

if __name__ == '__main__':
    start_server()


