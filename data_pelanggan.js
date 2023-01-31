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
// end-point akses data data_pelanggan
app.get("/data_pelanggan", (req, res) => {
    // create sql query
    let sql = "select * from data_pelanggan"

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
                data_pelanggan: result // isi data
            }            
        }
        res.json(response) // send response
    })
})
// end-point akses data data_pelanggan berdasarkan id_pelanggan tertentu
app.get("/data_pelanggan/:id", (req, res) => {
    let data = {
        id_pelanggan: req.params.id
    }
    // create sql query
    let sql = "select * from data_pelanggan where ?"

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
                data_pelanggan: result // isi data
            }            
        }
        res.json(response) // send response
    })
})
// end-point menyimpan data data_pelanggan
app.post("/data_pelanggan", (req,res) => {

    // prepare data
    let data = {
        nama_pelanggan: req.body.nama_pelanggan,
        alamat: req.body.alamat
    }

    // create sql query insert
    let sql = "insert into data_pelanggan set ?"

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
// end-point mengubah data data_pelanggan
app.put("/data_pelanggan", (req,res) => {

    // prepare data
    let data = [
        // data
        {
            nama_pelanggan: req.body.nama_pelanggan,
            alamat: req.body.alamat
        },

        // parameter (primary key)
        {
            id_pelanggan: req.body.id_pelanggan
        }
    ]

    // create sql query update
    let sql = "update data_pelanggan set ? where ?"

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
// end-point menghapus data data_pelanggan berdasarkan id_pelanggan
app.delete("/data_pelanggan/:id", (req,res) => {
    // prepare data
    let data = {
        id_pelanggan: req.params.id
    }

    // create query sql delete
    let sql = "delete from data_pelanggan where ?"

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
