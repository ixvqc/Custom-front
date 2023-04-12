from flask import Flask, render_template, jsonify, request
from io import BytesIO
from flask_cors import CORS
from bs4 import UnicodeDammit
from flask_sqlalchemy import SQLAlchemy
import oracledb as odb
import json
from datetime import datetime, timedelta
import random as rng
import base64
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



@app.route("/offerData", methods = ['GET','POST'])
def offerData():
    marka = request.json.get("marka", None)
    model = request.json.get("model", None)
    rokOd = request.json.get("rokOd", None)
    rokDo = request.json.get("rokDo", None)
    cenaOd = request.json.get("cenaOd", None)
    cenaDo = request.json.get("cenaDo", None)
    paliwo = request.json.get("fuel_type", None)

    print('sprawdzenie')
    if len(marka) == 0:
        marka = '%'
    print(marka)

    if len(model) == 0:
        model = '%'
    print(model)

    if len(rokOd) == 0:
        rokOd = 1
    print(rokOd)

    if len(rokDo) == 0:
        rokDo = 3000
    print(rokDo)

    if len(cenaOd) == 0:
        cenaOd = '1'
    print(cenaOd)


    if len(cenaDo) == 0:
        cenaDo = '999999999'
    print(cenaDo)

    if len(paliwo) == 0:
        paliwo = '%'
    print(paliwo)



    connection = odb.connect(user="s101230", password="s101230", dsn="217.173.198.135:1521/tpdb")
    cur = connection.cursor()

    # retrieve the last expert ID

    query = "SELECT PRICE FROM OFFER INNER JOIN VEHICLE ON OFFER.VEHICLE_VEHICLE_ID = VEHICLE.VEHICLE_ID WHERE VEHICLE.BRAND LIKE :markastr AND VEHICLE.MODEL LIKE :modelstr AND VEHICLE.FUEL_TYPE LIKE :paliwostr AND extract(YEAR from vehicle.prod_date) BETWEEN :rok1 and :rok2 AND OFFER.PRICE BETWEEN :cena1 and :cena2"
    cur.execute(query, markastr = marka, modelstr = model, paliwostr = paliwo, rok1 = rokOd, rok2 = rokDo, cena1 = cenaOd, cena2 = cenaDo)
    result = cur.fetchall()
    print("Result po query: ", result)

    i = 0
    while i:
        if len(result[i][0]) > 0:
            return
        i = i + 1
        print('I in loop', i)

    print('I out of loop', i)

    i = 0
    x = i

    price = result[x][0]



    query = "SELECT BRAND, PROD_DATE, MILEAGE, FUEL_TYPE, IMAGE FROM VEHICLE INNER JOIN OFFER ON VEHICLE.OFFER_OFFER_ID = OFFER.OFFER_ID WHERE VEHICLE.BRAND LIKE :markastr AND VEHICLE.MODEL LIKE :modelstr AND VEHICLE.FUEL_TYPE LIKE :paliwostr AND extract(YEAR from vehicle.prod_date) BETWEEN :rok1 and :rok2 AND OFFER.PRICE BETWEEN :cena1 and :cena2"
    cur.execute(query, markastr = marka, modelstr = model, paliwostr = paliwo, rok1 = rokOd, rok2 = rokDo, cena1 = cenaOd, cena2 = cenaDo)
    result = cur.fetchall()

    print("===================================================")
    print("Dlugosc: ", len(result))

    #imageBLOB = result[x][4]

   # fimag = str(imageBLOB.read())
    #print(fimag)


    print(result)

    if len(result) == 0:
        print("Result to Null")
        return {"msg": "Nie ma takiego pojazdu"}, 401

    if result[x][0] != "":
        brand = result[x][0]
        year = result[x][1].year
        mileage = int(result[x][2])
        fuel_type = result[x][3]
        print(brand)
        print(year)
        print(price)
        response = {"brand" : brand,"year" : year, "mileage" : mileage, "fuel_type" : fuel_type, "price" : price}

    else:
        print("Zły" + marka)
        return {"msg": "Złe dane"}, 401


    return response



if __name__ == "__main__":
    app.run(debug=True)