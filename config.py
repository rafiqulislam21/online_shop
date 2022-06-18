import mysql.connector

mydb = mysql.connector.connect(
  host="127.0.0.1",
  user="root",
  password=""
)

mycursor = mydb.cursor()
mycursor.execute("DROP database IF EXISTS online_shop_db")
mycursor.execute("CREATE DATABASE online_shop_db")

mysql_connection_string = "mysql://root:@127.0.0.1/online_shop_db"
mongo_connection_string = "mongodb://localhost:27017/"