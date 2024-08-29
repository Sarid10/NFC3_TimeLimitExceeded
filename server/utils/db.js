import mysql from "mysql";

const con = mysql.createConnection({
    host: "sql12.freemysqlhosting.net",
    port: "3306",
    user: "sql12728424",
    password: "nGx9z3DQ39",
    database: "sql12728424"
})

con.connect((err) => {
    if (err) {
        console.log("Connection Error", err)
    } else {
        console.log("connected")
    }
})

export default con;
