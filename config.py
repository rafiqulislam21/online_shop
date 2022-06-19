import mysql.connector

# create empty mysql database
mysql_config = {'user': 'user', 'password': 'password',
                'host': 'sql', 'port': '3306', 'database': 'online_shop_db'}
mydb = mysql.connector.connect(**mysql_config)
cursor = mydb.cursor()
cursor.execute("DROP database IF EXISTS online_shop_db")
cursor.execute("CREATE DATABASE online_shop_db")

mysql_connection_string = "mysql://user:password@sql:3306/online_shop_db"
# mongo_connection_string = "mongodb://localhost:27017/"
mongo_connection_string = "mongodb://user:password@mongo:27017/"
