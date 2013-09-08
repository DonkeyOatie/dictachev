import cherrypy
import argparse
import os
from note_store import EVNote, DBNote
import datetime

class DictaChevServer(object):
    
    @cherrypy.expose
    def index(self):
        return "fuck yeh"

    @cherrypy.expose
    def create_note(self, **params):
        title = params.get('title', str(datetime.datetime.now()))
        text = params.get('text', '')
        note = EVNote()
        note.create_note(text, title)
        return "note created"

def CORS():
    cherrypy.response.headers['Access-Control-Allow-Origin'] = '*'

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
    cherrypy.tools.CORS = cherrypy.Tool('before_finalize', CORS)
    cherrypy.quickstart(DictaChevServer())

if __name__ == '__main__':
    start_server()


