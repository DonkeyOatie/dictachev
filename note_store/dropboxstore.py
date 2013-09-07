import dropbox

class DBNote():

    def __init__(self, **kwargs):
        self.app_key = "eii9w0b2wttah9r"
        self.app_secret = "o3yaia029bxqkft"
        flow = dropbox.client.DropboxOAuth2FlowNoRedirect(self.app_key, self.app_secret)
        authorize_url = flow.start()

        print authorize_url
        code = raw_input().strip()
        self.access_token, user_id = flow.finish(code)
        self.client = dropbox.client.DropboxClient(self.access_token)
        print self.client.account_info()

    def create_note(self, text, title):
        f = open('working-data.txt', 'r+')
        f.write(text)
        f.close()
        f = open('working-data.txt')
        response = self.client.put_file(title + '.txt', f)
        print response

if __name__ == "__main__":
    note = DBNote()
    note.create_note("testing the shit out of shit", "fuckity")
