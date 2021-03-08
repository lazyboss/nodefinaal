const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')

const app = express()
const port = process.env.PORT || 4000

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

// MySQL
const connection = mysql.createConnection({
    port             : 3306,
    host            : 'localhost',
    user            : 'root',
    password        :  ''
  
})
connection.connect((err, con) => {
console.log(err)
console.log('connected')
connection.query('SHOW DATABASES', (err,rows)=>{
    console.log(err, rows);
}); 
})
// Get all 
app.get('', (req, res) => {

    connection.query('SELECT * from last', (err, rows) => {
        

        if(!err) {
            res.send(rows)
        } else {
            console.log(err)
        }

    })
})


// Get  by ID
app.get('/:id', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query('SELECT * from last WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release() // return the connection to pool

            if(!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

        })
    })
})

// Delete 
app.delete('/:id', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query('DELETE from last WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release() // return the connection to pool

            if(!err) {
                res.send(`last with the Record ID: ${[req.params.id]} has been removed.`)
            } else {
                console.log(err)
            }

        })
    })
})


// Add a record 
app.post('', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const params = req.body

        connection.query('INSERT INTO last SET ?', params , (err, rows) => {
            connection.release()

            if(!err) {
                res.send(`last with the name: ${params.name} has been added.`)
            } else {
                console.log(err)
            }

        })

        console.log(req.body)
    })
})


// Update a record 
app.put('', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const { id, name, age } = req.body

        connection.query('UPDATE last SET name = ?, age = ?, WHERE id = ?', [name, age, id] , (err, rows) => {
            connection.release() 

            if(!err) {
                res.send(`last with the name: ${name} has been added.`)
            } else {
                console.log(err)
            }

        })

        console.log(req.body)
    })
})



// Listen on enviroment port or 5000
app.listen(port, () => console.log(`Listen on port ${port}`))
