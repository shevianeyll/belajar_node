// inisiasi library
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mysql = require("mysql")

// implementation
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// create MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tugas_jualbeli"
})

db.connect(error => {
    if (error) {
        console.log(error.message)
    } else {
        console.log("MySQL Connected")
    }
})
// end-point akses data data_admin
app.get("/data_admin", (req, res) => {
    // create sql query
    let sql = "select * from data_admin"

    // run query
    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }            
        } else {
            response = {
                count: result.length, // jumlah data
                data_admin: result // isi data
            }            
        }
        res.json(response) // send response
    })
})
// end-point akses data data_admin berdasarkan id_admin tertentu
app.get("/data_admin/:id", (req, res) => {
    let data = {
        id_admin: req.params.id
    }
    // create sql query
    let sql = "select * from data_admin where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }            
        } else {
            response = {
                count: result.length, // jumlah data
                data_admin: result // isi data
            }            
        }
        res.json(response) // send response
    })
})
// end-point menyimpan data data_admin
app.post("/data_admin", (req,res) => {

    // prepare data
    let data = {
        nama_admin: req.body.nama_admin,
        status_admin: req.body.status_admin
    }

    // create sql query insert
    let sql = "insert into data_admin set ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data inserted"
            }
        }
        res.json(response) // send response
    })
})
// end-point mengubah data data_admin
app.put("/data_admin", (req,res) => {

    // prepare data
    let data = [
        // data
        {
            nama_admin: req.body.nama_admin,
            status_admin: req.body.status_admin
        },

        // parameter (primary key)
        {
            id_admin: req.body.id_admin
        }
    ]

    // create sql query update
    let sql = "update data_admin set ? where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data updated"
            }
        }
        res.json(response) // send response
    })
})
// end-point menghapus data data_admin berdasarkan id_admin
app.delete("/data_admin/:id", (req,res) => {
    // prepare data
    let data = {
        id_admin: req.params.id
    }

    // create query sql delete
    let sql = "delete from data_admin where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data deleted"
            }
        }
        res.json(response) // send response
    })
})
app.listen(8000, () => {
    console.log("Run on port 8000")
})
