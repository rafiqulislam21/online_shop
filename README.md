# Documentaion current state:

## How to run program
- install `xammp` or any mySql server and start the server
- create a virtual environment using this command `python -m venv venv`
- activate virtual environment command (windows): `.\venv\Scripts\activate`
- activate virtual environment command (linux/mac): `source venv/bin/activate`
- install required packages: `pip install -r requirements.txt`
- run backend command: `python server.py`
- To initialize database with sample data visit this url: `localhost:5000/api/data-init`
- To clear database visit this url: `localhost:5000/api/data-clear`
- Go to frontend folder and rund command: `npm install`
- install required packages form requirements.txt file
- run frontend command: `npm start`

### Recent changes
- api structure changed sample `localhost:5000/api/.....`
- sql part done

## Todo: 
- *Docker*
- Switch database from frontend