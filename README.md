# Documentaion current state:

## How to run program
- install `xammp` or any mySql server
- create a new database called `online_shop_db` in phpMyAdmin
- add your connection strings to config.py file
- create a virtual environment using this command `python -m venv venv`
- activate virtual environment command (windows): `.\venv\Scripts\activate`
- activate virtual environment command (linux/mac): `source venv/bin/activate`
- install required packages: `pip install -r requirements.txt`
- run project command: `python server.py`
- To initialize database with sample data visit this url: `localhost:5000/api/data-init`
- To clear database visit this url: `localhost:5000/api/data-clear`

### Recent changes
- api structure changed sample `localhost:5000/api/.....`
- some api added to frontend

## Todo: 
- *I will automate these things later with docker* 
- we will read pre-defiend dummy data form xcel sheets later
- will implement login service later(password field need to be added)
- will structure the project folder and files later
- add "parent" property to category entity (implement recursive relation) !!!!!