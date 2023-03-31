# app.py
import oracledb as odb
from datetime import datetime
from flask import Flask, jsonify

app = Flask(__name__)


@app.route('/Register', methods=['GET'])
def run_app():
    connection = odb.connect(user="s101230", password="s101230", dsn="217.173.198.135:1521/tpdb")
    cur = connection.cursor()

    # retrieve the last expert ID
    query = "SELECT EXPERT_ID FROM EXPERT ORDER BY EXPERT_ID DESC FETCH FIRST 1 ROW ONLY"
    cur.execute(query)
    result = cur.fetchall()

    # extract the expert ID from the result tuple
    if result:
        EXPERT_ID = result[0][0] + 1
    else:
        EXPERT_ID = 1

    NAME = 'Duwiel'
    SURNAME = 'Secondski'
    COMPANY = 'Zarządowa'
    EMAIL = 'Drooogie@mail.com'
    PHONE_NUM = '987654321'
    SPECIALIZATION = 'Dawcy i ich pojazdy'
    LAST_VISIT = datetime.strptime('2023-02-03', '%Y-%m-%d').date()
    LOCALIZATION = 'Opole'

    values = (EXPERT_ID, NAME, SURNAME, COMPANY, EMAIL, PHONE_NUM, SPECIALIZATION, LAST_VISIT, LOCALIZATION)

    query = "INSERT INTO EXPERT (EXPERT_ID, NAME, SURNAME, COMPANY, EMAIL, PHONE_NUM, SPECIALIZATION, LAST_VISIT, " \
            "LOCALIZATION) VALUES (:1, :2, :3, :4, :5, :6, :7, :8, :9) "
    cur.execute(query, values)
    connection.commit()
    connection.close()
    data = {'message': 'Flask app executed!'}
    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True)
