#create new flask web page
from flask import Flask, render_template, request, redirect, url_for
import requests
import pandas as pd

app = Flask(__name__)
#define API address
api_address = 'http://localhost:5000/'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/AddCar', methods=['GET', 'POST'])
def AddCar():
    if request.method == 'POST':
        car_name = request.form['CAR_NAME']
        car_brand = request.form['CAR_BRAND']
        car_model = request.form['CAR_MODEL']
        car_year = request.form['CAR_YEAR']
        car_plate = request.form['CAR_PLATE']
        #send request to api
        #add headers to request
        #headers = {'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type,Authorization', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS'}
        request.args = {'CAR_NAME': car_name, 'CAR_BRAND': car_brand, 'CAR_MODEL': car_model, 'CAR_YEAR': car_year, 'CAR_PLATE': car_plate}
        respone = requests.post(api_address + 'api/cars', data=request.args)
        #send post request to api
    
        print(respone)
        return redirect(url_for('index'))
        
    return render_template('AddCar.html')

#CheckCarInfo
@app.route('/CheckCarInfo', methods=['GET', 'POST', 'DELETE', 'PUT'])
def CheckCarInfo():
    if request.method == 'GET':
        return render_template('CheckCarInfo.html')
    elif request.method == 'POST':
        car_id = request.form['CAR_ID']
        #send request to api
        request.args = {'CAR_ID': car_id}
        response = requests.get(api_address + 'api/cars', data=request.args)
        #return OK and same page
        return render_template('CheckCarInfo.html', response=response.status_code,CAR_ID = response.json()[0]['ID'], CAR_NAME = response.json()[0]['CAR_NAME'], CAR_BRAND = response.json()[0]['CAR_BRAND'], CAR_MODEL = response.json()[0]['CAR_MODEL'], CAR_YEAR = response.json()[0]['CAR_YEAR'], CAR_PLATE = response.json()[0]['CAR_PLATE'])
    elif request.method == 'DELETE':
        car_id = request.form['CAR_ID']
        #send request to api
        request.args = {'CAR_ID': car_id}
        response = requests.delete(api_address + 'api/cars', data=request.args)
        #return OK and same page
        return render_template('CheckCarInfo.html', response=response.status_code) 

    #return render_template('CheckCarInfo.html')
#check service history by car id
@app.route('/CheckServiceHistory', methods=['GET', 'POST'])
def CheckServiceHistory(CAR_ID_REDIRECT = None):
    if request.method == 'POST':
        if (CAR_ID_REDIRECT == None):
            car_id = request.form['CAR_ID']
        else:
            car_id = CAR_ID_REDIRECT
        request.args = {'CAR_ID': car_id}
        
        response = requests.get(api_address + 'api/events/car', data=request.args)
        for x in response.json():
            print(x['ID'])
        #return OK and same page
        return render_template('CheckServiceHistory.html',service_history = response.json(), len = len(response.json()))
    else:
        return render_template('CheckServiceHistory.html')

#delete service history by event id
@app.route('/DeleteServiceHistory', methods=['GET', 'POST'])
def DeleteServiceHistory():
    if request.method == 'POST':
        event_id = request.form['EVENT_ID']
        CAR_ID = request.form['CAR_ID']
        request.args = {'EVENT_ID': event_id}
        response = requests.delete(api_address + 'api/events', data=request.args)
        #return redirect to CheckServiceHistory
        return redirect(url_for('CheckServiceHistory', CAR_ID_REDIRECT = CAR_ID), code=307)
    else:
        return render_template('CheckServiceHistory.html')

    


if __name__ == '__main__':
    app.run(debug=True,host= '0.0.0.0', port=80)