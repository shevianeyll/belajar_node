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
// end-point akses data data_barang
app.get("/data_barang", (req, res) => {
    // create sql query
    let sql = "select * from data_barang"

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
                data_barang: result // isi data
            }            
        }
        res.json(response) // send response
    })
})
// end-point akses data data_barang berdasarkan id_barang tertentu
app.get("/data_barang/:id", (req, res) => {
    let data = {
        id_barang: req.params.id
    }
    // create sql query
    let sql = "select * from data_barang where ?"

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
                data_barang: result // isi data
            }            
        }
        res.json(response) // send response
    })
})
// end-point menyimpan data data_barang
app.post("/data_barang", (req,res) => {

    // prepare data
    let data = {
        nama_barang: req.body.nama_barang,
        kondisi_barang: req.body.kondisi_barang,
        stok: req.body.stok
    }

    // create sql query insert
    let sql = "insert into data_barang set ?"

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
// end-point mengubah data data_barang
app.put("/data_barang", (req,res) => {

    // prepare data
    let data = [
        // data
        {
            nama_barang: req.body.nama_barang,
            kondisi_barang: req.body.kondisi_barang,
            stok: req.body.stok
        },

        // parameter (primary key)
        {
            id_barang: req.body.id_barang
        }
    ]

    // create sql query update
    let sql = "update data_barang set ? where ?"

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
// end-point menghapus data data_barang berdasarkan id_barang
app.delete("/data_barang/:id", (req,res) => {
    // prepare data
    let data = {
        id_barang: req.params.id
    }

    // create query sql delete
    let sql = "delete from data_barang where ?"

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
