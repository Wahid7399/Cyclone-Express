var mysql = require('mysql');
const Fs = require('fs/promises');
const fs = require('fs');
const { query } = require('express');

async function f1() {
    const json = await Fs.readFile('./mydata.json')
    const package = JSON.parse(json)

    var con = mysql.createConnection({
        host: 'db4free.net',
        user: 'wahid123',
        password: '12345678',
        database: 'database3021',
    });
    con.connect()
    var arr = []

    var query = `insert into product(title,description,category,sprice,bprice,quantity,avatar,images) values`;
    package.map((data, i) => {
        if (i == package.length - 1)
            query += `('${data.title}','${data.description}','${data.category ? data.category : "others"}',${data.sprice?data.sprice:100},${data.bprice?data.bprice:120},${data.quantity ? data.quantity : 100},'${data.avatar}','${JSON.stringify(data.images)}')\n`;
        else
            query += `('${data.title}','${data.description}','${data.category ? data.category : "others"}',${data.sprice?data.sprice:100},${data.bprice?data.bprice:120},${data.quantity ? data.quantity : 100},'${data.avatar}','${JSON.stringify(data.images)}'),\n`;
    })
    await fs.writeFileSync('./query.json',query);


    con.query(`insert into product(title,	description	,category,sprice,bprice,quantity,avatar,images) values` + query
        , (err, rows, fields) => {
            if (err) throw err;
        })
    con.end()
}
f1()

