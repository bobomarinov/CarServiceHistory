import logging
import pandas as pd
import pyodbc
from flask import Flask
from flask import request, render_template
from flask_cors import CORS
from flask_restful import Resource, Api, reqparse
from http.client import OK

server = 'localhost'
database = 'CAR_HISTORY'
Trusted_Connection = 'yes'

cnxn = pyodbc.connect(
    'DRIVER={ODBC Driver 17 for SQL Server};SERVER=' + server + ';DATABASE=' + database + ';Trusted_Connection=' + Trusted_Connection + ';')
cursor = cnxn.cursor()

app = Flask(__name__)
api = Api(app)
CORS(app)


# add to header to allow cross origin requests
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response


logging.getLogger('flask_cors').level = logging.DEBUG


# function to read data from database
def get_data(query):
    df = pd.read_sql_query(query, cnxn)
    return df


def write_data(query):
    cursor.execute(query)
    cnxn.commit()


# API functions
# by car id
@app.route('/api/cars', methods=['GET', 'POST', 'DELETE', 'PUT'])
def car():
    '''
    if request.method == 'GET':
        print(request.args)
        if request.args.get('CAR_ID'):
            car_id = request.args.get('CAR_ID')
            query = "SELECT * FROM [CAR_HISTORY].[dbo].[CARS] WHERE ID = " + car_id
            df = get_data(query)
            return df.to_json(orient='records')
        elif request.form['CAR_ID']:
            car_id = request.form['CAR_ID']
            query = "SELECT * FROM [CAR_HISTORY].[dbo].[CARS] WHERE ID = " + car_id
            df = get_data(query)
            return df.to_json(orient='records')
        else:
            return "No car id provided"
    '''
    if request.method == 'GET':
        print(request.args)
        if request.args.get('CAR_ID'):
            car_plate = request.args.get('CAR_ID')
            query = "SELECT * FROM [CAR_HISTORY].[dbo].[CARS] WHERE CAR_PLATE = '" + car_plate+"'"
            df = get_data(query)
            return df.to_json(orient='records')
        elif request.form['CAR_ID']:
            car_id = request.form['CAR_ID']
            query = "SELECT * FROM [CAR_HISTORY].[dbo].[CARS] WHERE CAR_PLATE = '" + car_id+"'"
            return df.to_json(orient='records')
        else:
            return "No car id provided"
    elif request.method == 'POST':
        # if request.args is not emtpy

        if request.args:
            print("Using args")
            car_name = request.args.get('CAR_NAME')
            car_brand = request.args.get('CAR_BRAND')
            car_model = request.args.get('CAR_MODEL')
            car_year = request.args.get('CAR_YEAR')
            car_plate = request.args.get('CAR_PLATE')
            #check if there is car with the same plate
            query_check = "SELECT * FROM [CAR_HISTORY].[dbo].[CARS] WHERE CAR_PLATE = '" + car_plate+"'"
            df = get_data(query_check)
            if df.empty:
                query = "INSERT INTO [CAR_HISTORY].[dbo].[CARS] (CAR_NAME, CAR_BRAND, CAR_MODEL, CAR_YEAR, CAR_PLATE) VALUES ('{}', '{}', '{}', '{}', '{}')".format(
                    car_name, car_brand, car_model, car_year, car_plate)
                write_data(query)
                #get the id of the car
                query = "SELECT ID FROM [CAR_HISTORY].[dbo].[CARS] WHERE CAR_NAME = '{}' AND CAR_BRAND = '{}' AND CAR_MODEL = '{}' AND CAR_YEAR = '{}' AND CAR_PLATE = '{}'".format(
                    car_name, car_brand, car_model, car_year, car_plate)
                df = get_data(query)
                car_id = df['ID'][0]
                return str(car_id)
            else:
                return "Car with the same plate already exists"

        elif request.form:
            print("Using form")
            car_name = request.form['CAR_NAME']
            car_brand = request.form['CAR_BRAND']
            car_model = request.form['CAR_MODEL']
            car_year = request.form['CAR_YEAR']
            car_plate = request.form['CAR_PLATE']
            query = "INSERT INTO [CAR_HISTORY].[dbo].[CARS] (CAR_NAME, CAR_BRAND, CAR_MODEL, CAR_YEAR, CAR_PLATE) VALUES ('{}', '{}', '{}', '{}', '{}')".format(
                car_name, car_brand, car_model, car_year, car_plate)
            write_data(query)
            return "OK"
        else:
            return "ERROR"
    elif request.method == 'DELETE':
        if request.args.get('CAR_ID'):
            car_id = request.args.get('CAR_ID')
            pre_query = "DELETE FROM [CAR_HISTORY].[dbo].[EVENTS] WHERE CAR_ID = " + car_id
            query = "DELETE FROM [CAR_HISTORY].[dbo].[CARS] WHERE ID = " + car_id
            write_data(pre_query)
            write_data(query)
            return "OK"
        elif request.form['CAR_ID']:
            car_id = request.form['CAR_ID']
            pre_query = "DELETE FROM [CAR_HISTORY].[dbo].[EVENTS] WHERE CAR_ID = " + car_id
            query = "DELETE FROM [CAR_HISTORY].[dbo].[CARS] WHERE ID = " + car_id
            write_data(pre_query)
            write_data(query)
            return "OK"
        return "OK"
    elif request.method == 'PUT':
        if request.args.get("CAR_NAME") is not None:
            car_name = request.args.get('CAR_NAME')
            car_id = request.args.get('CAR_ID')
            query = "UPDATE [CAR_HISTORY].[dbo].[CARS] SET CAR_NAME = '{}' WHERE ID = {}".format(car_name, car_id)
            write_data(query)
        if request.args.get("CAR_BRAND") is not None:
            car_brand = request.args.get('CAR_BRAND')
            car_id = request.args.get('CAR_ID')
            query = "UPDATE [CAR_HISTORY].[dbo].[CARS] SET CAR_BRAND = '{}' WHERE ID = {}".format(car_brand, car_id)
            write_data(query)
        if request.args.get("CAR_MODEL") is not None:
            car_model = request.args.get('CAR_MODEL')
            car_id = request.args.get('CAR_ID')
            query = "UPDATE [CAR_HISTORY].[dbo].[CARS] SET CAR_MODEL = '{}' WHERE ID = {}".format(car_model, car_id)
            write_data(query)
        if request.args.get("CAR_YEAR") is not None:
            car_year = request.args.get('CAR_YEAR')
            car_id = request.args.get('CAR_ID')
            query = "UPDATE [CAR_HISTORY].[dbo].[CARS] SET CAR_YEAR = {} WHERE ID = {}".format(car_year, car_id)
            write_data(query)
        if request.args.get("CAR_PLATE") is not None:
            car_plate = request.args.get('CAR_PLATE')
            car_id = request.args.get('CAR_ID')
            query = "UPDATE [CAR_HISTORY].[dbo].[CARS] SET CAR_PLATE = '{}' WHERE ID = {}".format(car_plate, car_id)
            write_data(query)
        return "OK"


# all cars
@app.route('/api/cars/all', methods=['GET'])
def cars():
    query = "SELECT * FROM [CAR_HISTORY].[dbo].[CARS]"
    df = get_data(query)
    return df.to_json(orient='records', date_format='iso')


# by event id

@app.route('/api/events', methods=['GET', 'POST', 'DELETE', 'PUT'])
def event():
    if request.method == 'GET':
        event_id = request.args.get('EVENT_ID')
        query = "SELECT * FROM [CAR_HISTORY].[dbo].[EVENTS] WHERE ID = {}".format(event_id)
        print(query)
        df = get_data(query)
        return df.to_json(orient='records', date_format='iso')
    elif request.method == 'POST':
        car_plate = request.args.get('CAR_ID')
        event_date = request.args.get('EVENT_DATE')
        event_millage = request.args.get('EVENT_MILLAGE')
        event_descrition = request.args.get('EVENT_DESCRITION')
        if request.args.get('EVENT_REPEATABLE') == 'on':
            event_repeatable = 1
        else:
            event_repeatable = 0
        next_event_date = request.args.get('NEXT_EVENT_DATE')
        next_event_millage = request.args.get('NEXT_EVENT_MILLAGE')

        # get the car id
        query = "SELECT ID FROM [CAR_HISTORY].[dbo].[CARS] WHERE CAR_PLATE = '{}'".format(car_plate)
        df = get_data(query)
        car_id = df['ID'][0]

        query = "INSERT INTO [CAR_HISTORY].[dbo].[EVENTS] (CAR_ID, EVENT_DATE, EVENT_MILLAGE, EVENT_DESCRITION, EVENT_REPEATABLE, NEXT_EVENT_DATE, NEXT_EVENT_MILLAGE) VALUES ({}, '{}', {}, '{}', {}, '{}', {})".format(
            car_id, event_date, event_millage, event_descrition, event_repeatable, next_event_date, next_event_millage)
        print(query)
        write_data(query)
        return "OK"
    elif request.method == 'DELETE':
        event_id = request.args.get('EVENT_ID')
        # event_id = request.form['EVENT_ID']
        query = "DELETE FROM [CAR_HISTORY].[dbo].[EVENTS] WHERE ID = {}".format(event_id)
        print(query)
        write_data(query)
        return "OK"
    elif request.method == 'PUT':
        if request.args.get("CAR_ID") is not None:
            car_id = request.args.get('CAR_ID')
            event_id = request.args.get('EVENT_ID')
            query = "UPDATE [CAR_HISTORY].[dbo].[EVENTS] SET CAR_ID = {} WHERE ID = {}".format(car_id, event_id)
            write_data(query)
        if request.args.get("EVENT_DATE") is not None:
            event_date = request.args.get('EVENT_DATE')
            event_id = request.args.get('EVENT_ID')
            query = "UPDATE [CAR_HISTORY].[dbo].[EVENTS] SET EVENT_DATE = '{}' WHERE ID = {}".format(event_date,
                                                                                                     event_id)
            write_data(query)
        if request.args.get("EVENT_MILLAGE") is not None:
            event_millage = request.args.get('EVENT_MILLAGE')
            event_id = request.args.get('EVENT_ID')
            query = "UPDATE [CAR_HISTORY].[dbo].[EVENTS] SET EVENT_MILLAGE = {} WHERE ID = {}".format(event_millage,
                                                                                                      event_id)
            write_data(query)
        if request.args.get("EVENT_DESCRITION") is not None:
            event_descrition = request.args.get('EVENT_DESCRITION')
            event_id = request.args.get('EVENT_ID')
            query = "UPDATE [CAR_HISTORY].[dbo].[EVENTS] SET EVENT_DESCRITION = '{}' WHERE ID = {}".format(
                event_descrition, event_id)
            write_data(query)
        if request.args.get("EVENT_REPEATABLE") is not None:
            event_repeatable = request.args.get('EVENT_REPEATABLE')
            event_id = request.args.get('EVENT_ID')
            query = "UPDATE [CAR_HISTORY].[dbo].[EVENTS] SET EVENT_REPEATABLE = {} WHERE ID = {}".format(
                event_repeatable, event_id)
            write_data(query)
        if request.args.get("NEXT_EVENT_DATE") is not None:
            next_event_date = request.args.get('NEXT_EVENT_DATE')
            event_id = request.args.get('EVENT_ID')
            query = "UPDATE [CAR_HISTORY].[dbo].[EVENTS] SET NEXT_EVENT_DATE = '{}' WHERE ID = {}".format(
                next_event_date, event_id)
            write_data(query)
        if request.args.get("NEXT_EVENT_MILLAGE") is not None:
            next_event_millage = request.args.get('NEXT_EVENT_MILLAGE')
            event_id = request.args.get('EVENT_ID')
            query = "UPDATE [CAR_HISTORY].[dbo].[EVENTS] SET NEXT_EVENT_MILLAGE = {} WHERE ID = {}".format(
                next_event_millage, event_id)
            write_data(query)
        return "OK"


# all events
@app.route('/api/events/all', methods=['GET'])
def events():
    query = "SELECT * FROM [CAR_HISTORY].[dbo].[EVENTS]"
    df = get_data(query)
    return df.to_json(orient='records', date_format='iso')


# all events by car id
@app.route('/api/events/car', methods=['GET'])
def events_car():
    """
    if request.args.get("CAR_ID"):
        car_id = request.args.get('CAR_ID')
        query = "SELECT * FROM [CAR_HISTORY].[dbo].[EVENTS] WHERE CAR_ID = {}".format(car_id)
        df = get_data(query)
        return df.to_json(orient='records', date_format='iso')
    elif request.form['CAR_ID']:
        car_id = request.form['CAR_ID']
        query = "SELECT * FROM [CAR_HISTORY].[dbo].[EVENTS] WHERE CAR_ID = {}".format(car_id)
        df = get_data(query)
        print(df)
        return df.to_json(orient='records', date_format='iso')
    else:
        return "ERROR"
    """
    if request.args.get("CAR_ID"):
        car_plate = request.args.get('CAR_ID')
        query1 = "SELECT * FROM [CAR_HISTORY].[dbo].[CARS] WHERE CAR_PLATE = '" + car_plate +"'"
        #get car_id from car_plate
        df = get_data(query1)
        car_id = df['ID'].values[0].astype(str)
        query2 = "SELECT * FROM [CAR_HISTORY].[dbo].[EVENTS] WHERE CAR_ID = '" + car_id +"'"
        df = get_data(query2)
        return df.to_json(orient='records', date_format='iso')
    elif request.form['CAR_ID']:
        car_plate = request.form['CAR_ID']
        query1 = "SELECT * FROM [CAR_HISTORY].[dbo].[CARS] WHERE CAR_PLATE = '" + car_plate +"'"
        #get car_plate from car_id
        df = get_data(query1)
        car_id = df['CAR_PLATE'][0]
        query2 = "SELECT * FROM [CAR_HISTORY].[dbo].[EVENTS] WHERE CAR_ID = '" + car_id +"'"
        df = get_data(query2)
        return df.to_json(orient='records', date_format='iso')
    else:
        return "ERROR"

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
