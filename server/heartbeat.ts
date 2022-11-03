/*

First Up:
getPods


reoccuring
getPods
poll the list. 
check the data


get pods to create a  list of pods to look at.
    How often are we updating this list? Every 300s? sure. 


Pull data every X(15) seconds, calls the correct controllers.
    We have a pod name.
    get memory used
    get memory limits
    get HD used
    get HD limits


    
check the data
    if problem detected, create baby alert and check it against already created alerts in the db. 
        dbController.exists?
    create Alert object if problem detected.
            issue text
            status: new
            container:
            node:
            pod:
            used
        limit
         get historical data   1 hour. 
            get old yaml
            new yaml: empty    





write to DB



*/