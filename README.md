# Khartes
Monitoring Kubernetes clusters and automating cluster management workflows


This app needs Prometheus installed and working correctly. 
It also needs kubectl installed and set up to use the context of what you want to monitor. 
Add in some links here to setting up their kubectl. 






Routes
/alerts
    get: gets the alert objects in the db.
    patch: send ID and then new status in parameters, will update the DB. 
    delete: send the ID and it will delete the alert from the DB.
