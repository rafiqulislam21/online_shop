import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password=""
)

mycursor = mydb.cursor()
mycursor.execute("DROP database IF EXISTS online_shop_db")
mycursor.execute("CREATE DATABASE online_shop_db")

mysql_connection_string = "mysql://root:@localhost/online_shop_db"
mongo_connection_string = "WRITE YOUR CONNECTION STRING HERE"