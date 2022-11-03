# Khartes
Monitoring Kubernetes clusters and automating cluster management workflows





Routes
/alerts
    get: gets the alert objects in the db.
    post: send new alert object in body, will be added to the DB.
    patch: send ID and then new status in parameters, will update the DB. 
    delete:
