from collections import namedtuple
import os
import sys 
print(sys.path)
sys.path.append("/usr/local/lib/python3.8/dist-packages")
sys.path.append("/home/warmongr/Downloads/Assembly-line-Software-master/al/assembly-line-form/helpers")
import helpers
print(sys.path)
from flask_cors import CORS

import psycopg2
import requests

from flask import Flask, render_template, request, jsonify
from flask import redirect, url_for

from helpers import verification_functions


#from flask_restful import reqparser
#from flask_restful import Resource, Api

app = Flask(__name__, template_folder='templates')
app.debug = True
CORS(app)
#app.config['CORS_HEADERS'] = 'Content-Type'

rds_kwargs = dict(user="postgres",password="9812376024",host="172.19.0.2",port=5432,dbname="postgres",)

all_hubs_query = """
SELECT id, name
FROM hubs;
"""

all_clients_query = """
SELECT id, name
FROM lease_clients;
"""

all_client_hubs_query = """
SELECT client_hubs.id, concat_ws(' - ', lease_clients.name, client_hubs.name) as name
FROM client_hubs
        JOIN lease_clients ON client_hubs.client=lease_clients.id;
"""

all_telemetry_models = """
SELECT DISTINCT(model_name) as name
FROM telematics;
"""

all_telemetry_vendors = """
SELECT vendor_id, name
FROM telemetry_vendors
        JOIN vendors ON telemetry_vendors.vendor_id=vendors.id;
"""

all_vehicles_query = """
SELECT id,  registration_number from vehicles ORDER BY registration_number;
"""
@app.route('/')
def abc():
    with psycopg2.connect(**rds_kwargs) as connection:
        with connection.cursor() as cursor:
            dbquery="""SELECT * FROM vehicles"""
            cursor.execute(dbquery)
            a=cursor.fetchall()
    print(a)
    return "hey there"


@app.route('/a')
def index():
    with psycopg2.connect(**rds_kwargs) as connection:
        with connection.cursor() as cursor:
            cursor.execute(all_hubs_query)
            hubs = []
            for hub_item in cursor.fetchall():
                hub = namedtuple('hub', 'id name')
                hub.id = hub_item[0]
                hub.name = hub_item[1]
                hubs.append(hub)
            cursor.execute(all_clients_query)
            clients = []
            for client_item in cursor.fetchall():
                client = namedtuple('client', 'id name')
                client.id = client_item[0]
                client.name = client_item[1]
                clients.append(client)
            cursor.execute(all_client_hubs_query)
            client_hubs = []
            for client_hub_item in cursor.fetchall():
                client_hub = namedtuple('client_hub', 'id name')
                client_hub.id = client_hub_item[0]
                client_hub.name = client_hub_item[1]
                client_hubs.append(client_hub)
            cursor.execute(all_telemetry_models)
            telemetry_models = []
            for telemetry_model_item in cursor.fetchall():
                telemetry_model = namedtuple('telemetry_model', 'name')
                telemetry_model.name = telemetry_model_item[0]
                telemetry_models.append(telemetry_model)
            cursor.execute(all_telemetry_vendors)
            telemetry_vendors = []
            for telemetry_vendor_item in cursor.fetchall():
                telemetry_vendor = namedtuple('telemetry_vendor', 'id name')
                telemetry_vendor.id = telemetry_vendor_item[0]
                telemetry_vendor.name = telemetry_vendor_item[1]
                telemetry_vendors.append(telemetry_vendor)
            return render_template('index.html', client_hubs=client_hubs, clients=clients,
                                   hubs=hubs, telemetry_models=telemetry_models, telemetry_vendors=telemetry_vendors)


@app.route('/hubs_mapping')
def hubs_vehicle_mapping():
    with psycopg2.connect(**rds_kwargs) as connection:
        with connection.cursor() as cursor:
            cursor.execute(all_vehicles_query)
            vehicles = []
            for vehicle_item in cursor.fetchall():
                #print(vehicle_item)
                vehicle = namedtuple('vehicle', 'id registration_number')
                vehicle.id = vehicle_item[0]
                vehicle.number = vehicle_item[1]
                vehicles.append(vehicle)
            cursor.execute(all_hubs_query)
            hubs = []
            for hub_item in cursor.fetchall():
                hub = namedtuple('hub', 'id name')
                hub.id = hub_item[0]
                hub.name = hub_item[1]
                hubs.append(hub)

            return render_template('hubs_vehicle.html', vehicles=vehicles, hubs=hubs)


@app.route('/register', methods=['GET','POST'])
def signup():

    if request.method=="POST":
        params = dict()
        data=request.get_json()
        params["imei"] = data['telemetry_imei']
        params["telemetry_model_name"] = 'RIFA-M'
        params["telemetry_vendor_id"] = data["telemetry_vendor_id"]  # Drop Down
        params["registration_number"] = data['vehicle_registration_number']
        params["chassis_number"] = data['vehicle_chassis_number']
        params["ebin"] = data['ebin']
        params["charger_serial_number"] = data['charger_serial_number']
        params["hub_id"] = data['hub_id']  # Drop Down
        params["client_id"] = data['client_id']  # Drop Down
        params["client_hub_id"] = data['client_hub_id']  # Drop Down
        params["passcode"] = data['passcode']
        print(params)
        with psycopg2.connect(**rds_kwargs) as conn:
            with conn.cursor() as cur:
                dbquery="""
                            INSERT INTO l5_form_data(imei,telemetry_model_name,telemetry_vendor_id,registration_number,chassis_number,ebin,charger_serial_number,hub_id,client_id,client_hub_id,passcode)
                            VALUES (%s, %s, %s, %s,%s, %s, %s, %s,%s, %s, %s)
                        """
                cur.execute(dbquery, (params["imei"], params["telemetry_model_name"],params["telemetry_vendor_id"],params["registration_number"],params["chassis_number"],params["ebin"] ,params["charger_serial_number"] ,params["hub_id"],params["client_id"],params["client_hub_id"], params["passcode"]))
                conn.commit()

        #print(params)
        response = jsonify(message="Simple server is running")
        
        return response
    else:
        print("this is a get request")
        return render_template('index.html')

@app.route('/delete', methods=['GET','POST'])
def delete_vehicle():
    #need to work on delete_vehicle and verify_reg_no 
    if request.method=="POST":
        params = dict()
        data=request.get_json()
        regNo = data['vehicle_registration_number']
        verification=verification_functions.reg_no_verify_function(regNo)
        if verification[0]==False:
            response=jsonify(verification[1])
        else:
            with psycopg2.connect(**rds_kwargs) as conn:
                with conn.cursor() as cur:
                    dbquery="""
                                DELETE FROM l5_form_data
                                WHERE registration_number=%s
                            """
                    cur.execute(dbquery, (regNo))
                    conn.commit()
            response = jsonify(message="Simple server is running")
        
        return response
    else:
        print("this is a get request")
        return render_template('index.html')

@app.route('/verifyregno', methods=['GET','POST'])
def verify_reg_no():

    if request.method=="POST":
        params = dict()
        data=request.get_json()
        regNo = data['vehicle_registration_number']
        verification=verification_functions.reg_no_verify_function(regNo)
        if verification[0]==False:
            response=jsonify(verification[1])
        else:
            with psycopg2.connect(**rds_kwargs) as conn:
                with conn.cursor() as cur:
                    dbquery="""
                                DELETE FROM l5_form_data
                                WHERE registration_number=%s
                            """
                    cur.execute(dbquery, (regNo))
                    conn.commit()
            response = jsonify(message="Simple server is running")
        
        return response
    else:
        print("this is a get request")
        return render_template('index.html')


@app.route('/hubs_map', methods=['POST'])
def hubs_map():
    params = dict()
    print(request.form)
    params["vehicle_id"] = request.form['vehicle_id'] # Drop Down
    params["hub_id"] = request.form['hub_id']  # Drop Down
    params["password"] = request.form['password']
    print(params)
    resp = requests.post(url="https://dy39755fpk.execute-api.ap-south-1.amazonaws.com/dev/hubs-vehicle-map",
                         params=params)
    if resp.ok:
        return 'Vehicle Hubs Mapping Updated'
    else:
        return 'Something Went Wrong. Please Contact admin.'

if __name__ == "__main__":
  app.run()
