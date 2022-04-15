import json
import psycopg2
from psycopg2 import sql

database_config = {
    "user": 'postgres',
    "password": '9812376024',
    "host": '172.19.0.2',
    "port": 5432,
    "dbname": 'postgres'
}

def reg_no_verify_function(regNo):
    with psycopg2.connect(**database_config) as conn: 
        with conn.cursor() as cur:

            dbquery=""" 
                        SELECT registration_number FROM l5_form_data WHERE registration_number=%s
                    """
            cur.execute(dbquery,(regNo,))
            vehicle_available=cur.fetchall()
            print(vehicle_available)
            if vehicle_available==[]:
                return [False,"Vehicle with this reg no is not present"]
            else:
                return [True]
