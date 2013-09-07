from evernote.api.client import EvernoteClient
import evernote.edam.type.ttypes as Types
import datetime

class Note():
    developer_token = 'S=s1:U=75daf:E=148523ea620:C=140fa8d7a22:P=1cd:A=en-devtoken:V=2:H=1aff37da54eb4416edc62a633e525b72'

    def __init__(self, **kwargs):
        self.client = EvernoteClient(token=self.developer_token, sandbox=True)
        self.note_store = self.client.get_note_store()
        self.notebooks = self.note_store.listNotebooks()

    def create_note(self, note_text, title=None):
        if title==None:
            title=str(datetime.datetime.now())
        note = Types.Note()
        note.title = title
        note.content = '<?xml version="1.0" encoding="UTF-8"?>'
        note.content += '<!DOCTYPE en-note SYSTEM ' \
            '"http://xml.evernote.com/pub/enml2.dtd">'
        note.content += '<en-note>' + note_text + '</en-note>'
        created_note = self.note_store.createNote(note)

if __name__ == "__main__":
    note = Note()

    text = "is a douche"
    title = "KK Klauschie"

    note.create_note(text, title)


