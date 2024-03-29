# Documentaion for Docker:
## How to run program
- Make sure docker is installed and running
- Run command `docker-compose up --build` then wait until the docker containers are build.
- visit this url `https://localhost:3000/` and You may see a warning your connection isn’t private during the first visit to the website. This is because we used a self-signed certificate to configure SSL. To solve this issue click the `Advance` button then click `continue to localhost (unsafe)` link. Note that we have added SSL in both of our frontend and backend apps. So it may require visiting the backend URL as well and following the same steps mentions earlier. The backend root URL is  `http://localhost:5000/`.
- After that visit again`https://localhost:3000/` in your browser, you will see the homepage of the project.
- To initialize database with sample data click `init-data` from navbar.
- To Clear database click `clear-data` from navbar.
- To switch database/ migrate database select `sql/non-sql` dropdown from navbar.
- To switch user select `user` dropdown from navbar.


-------------------------------------------------------------------------------
---------------------------
---------------------------
## Documentaion for non docker:
## How to run program
### Backend:
- install `xammp` or any mySql server and start the server
- create a virtual environment using this command `python -m venv venv`
- activate virtual environment command (windows): `.\venv\Scripts\activate`
- activate virtual environment command (linux/mac): `source venv/bin/activate`
- install required packages: `pip install -r requirements.txt`
- run command (to start server): `python app.py`
- To initialize database with sample data visit this url (or there is button in frontend): 
    - sql: `localhost:5000/api/data-init`
- To clear database visit this url (or there is button in frontend):                 
    - sql: `localhost:5000/api/data-clear/sql`
    - Mongodb: `localhost:5000/api/data-clear/nosql`

### Frontend:
- Go to frontend folder(`\online_shop\frontend>`) and run command: `npm install`
- to fix warnings: ` npm audit fix --force`
- install required packages form requirements.txt file
- run command(to start forntend server): `npm start`

### Recent changes
- api structure changed sample `localhost:5000/api/.....`
- main case sql/nonsql part done with forntend
