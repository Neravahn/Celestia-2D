from flask import Flask, render_template


app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/main', methods=['POST', 'GET'])
def main():
    return render_template('main.html')

@app.route('/guide', methods= ['GET'])
def guide():
    return render_template('guide.html')

if __name__ == '__main__':
    app.run(debug=True)