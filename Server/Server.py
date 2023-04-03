from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import oracledb as odb
import json
from datetime import datetime, timedelta
import random as rng
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager

app = Flask(__name__)
CORS(app)

app.config["JWT_SECRET_KEY"] = "please-remember-to-change-me"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(app)

@app.route("/adddb", methods = ['GET','POST'])
def adddb():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    connection = odb.connect(user="s101230", password="s101230", dsn="217.173.198.135:1521/tpdb")
    cur = connection.cursor()

    # retrieve the last expert ID



    query = "SELECT PASSWORD FROM CUSTOMER WHERE EMAIL LIKE :emailstr"
    cur.execute(query, emailstr = email)
    result = cur.fetchall()

    print("===================================================")
    print("Dlugosc: ", len(result))

    if len(result) == 0:
        print("Result to Null")
        return {"msg": "Nie ma takiego maila"}, 401

    if result[0][0] == password:
        print(email)
        print(password)
        access_token = create_access_token(identity=email)
        response = {"access_token":access_token}

    else:
        print("Zły" + email)
        print("Zły" + password)
        return {"msg": "Złe dane"}, 401


    return response

@app.route("/testowanko", methods = ['GET','POST'])
def testowanko():
    print("Sprawdzenie")
    email = request.json.get("email", None)
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    repassword = request.json.get("repassword", None)
    if password != repassword:
        return {"msg": "Hasła nie są takie same"}, 401
    access_token = create_access_token(identity=email)
    response = {"access_token":access_token}

    print(email)
    print(username)
    print(password)
    print(repassword)

    connection = odb.connect(user="s101230", password="s101230", dsn="217.173.198.135:1521/tpdb")
    cur = connection.cursor()

    # retrieve the last expert ID


    query = "SELECT CUSTOMER_ID FROM CUSTOMER ORDER BY CUSTOMER_ID DESC FETCH FIRST 1 ROW ONLY"
    cur.execute(query)
    result = cur.fetchall()

        # extract the expert ID from the result tuple
    if result:
        CUSTOMER_ID= result[0][0] + 1
    else:
        CUSTOMER_ID = 1

    LOGIN = username
    PASSWORD = password
    NAME = username
    REG_DATE = datetime.now()
    LAST_LOGIN = datetime.now()
    EMAIL = email
    PHONE_NUM = None
    IS_PREMIUM = 0
    TYPE = "USER"

    values = (CUSTOMER_ID, LOGIN, PASSWORD, NAME, REG_DATE, LAST_LOGIN, EMAIL, PHONE_NUM, IS_PREMIUM, TYPE)

    query = "INSERT INTO CUSTOMER (CUSTOMER_ID, LOGIN, PASSWORD, NAME, REG_DATE, LAST_LOGIN, EMAIL, PHONE_NUM, IS_PREMIUM, TYPE) VALUES (:1, :2, :3, :4, :5, :6, :7, :8, :9, :10)"

    cur.execute(query, values)

    connection.commit()
    connection.close()

    return response

@app.route('/profile')
def my_profile():
    response_body = {
        "name": "Nagato",
        "about" :"Hello! I'm a full stack developer that loves python and javascript"
    }
    return response_body

@app.route("/logout", methods=['GET',"POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response

@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response


if __name__ == "__main__":
    app.run(debug=True)