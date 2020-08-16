const { ReadPreference } = require('mongodb');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://172.30.80.138:40000,172.30.80.30:40000,172.30.80.232:40000/?replicaSet=r1&readPreference=secondary"
var insert = setInterval(insertData, 5000);

function insertData(){
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true },
        function(err, db) {
            if (err) throw err;
            var dbo = db.db("assignment1");
            var myobj = { name: "Suphasit.C", address: "Rimmor 414", timestamp: Date.now() };
            dbo.collection("information").insertOne(myobj, function(err, res) {
                if (err) throw err;
                console.log("1 document inserted, timestamp = ", myobj.timestamp);
            });
            dbo.collection("information").find({}).toArray((err, docs) => {
                if (err) throw err;
                console.log(docs)
            })
        }
    );
}