const express = require ('express');
const db = require ('./database')
const router = express.Router();

router.post('/api/addcolor',(req,res) =>{
    const add = 'INSERT INTO Color(name, embanew, embamixed, simcanew, simcamixed ) Values(?,?,?,?,?)';
    console.log(req.body.name);
    const sql = req.body.name;
    db.run(add, sql,0,0,0,0,(error)=>{
        if(error){
            res.status(409).send('Farbe Name muss einzartig sein');
        }
        else{
            res.status(200).json({'name': sql});
    }   
    
});
});

router.get('/api/colornames', (req,res) =>{
    let x = [];
    db.all('SELECT * FROM Color', (error, rows)=>{
        console.log(rows);
        x = rows.map(row => {
            return row.name;

        });
        console.log(x);
        res.status(200).send(x);
    });
    });


router.delete('/api/delete/:color', (req,res) =>{
    db.run('DELETE FROM Color WHERE name = ?',[req.params.color], (error)=>{
        if(error){throw (error);}
        });
});

router.get('/api/searchcolor/:color',(req,res)=>{
    db.get('SELECT * FROM Color where name =?',[req.params.color],(error, row)=>{
        if(error){
            throw (error);
        }
        else{
            if(!(row === undefined)){
                console.log(row);
                res.status(200).json(row);
            }
            else{
                console.log(row);
                res.status(404).send('Farbe nicht gefundet');
            }
        }
    });
});

router.put('/api/changename/:oldname/:newname', (req,res)=>{
    db.run('UPDATE Color SET name = ? WHERE name = ?', [req.params.newname, req.params.oldname], (error)=>{
        if(error){
            throw (error);
        }
        else{
            console.log(req.params.newname)
            res.status(200).json({'name':req.params.newname});
        }
    })
})

router.put('/api/update',(req, res)=>{
    db.run('UPDATE Color SET embanew = ?, embamixed = ?, simcanew = ? , simcamixed = ?, totalnew = ?, totalmixed = ? WHERE name = ? '
        ,[req.body.embanew, req.body.embamixed, req.body.simcanew,
         req.body.simcamixed, parseFloat(req.body.embanew) + parseFloat(req.body.simcanew), parseFloat(req.body.embamixed) + parseFloat(req.body.simcamixed), req.body.name],
          (error)=>{
              if(error){
                  throw (error)
              }
              else{
                  res.status(200).json(req.body);              }
          })
})
router.get('/api/colors', (req, res)=>{
    db.all('SELECT * FROM Color ORDER BY totalnew, totalmixed',(error,row)=>{
           
    res.render('table.ejs',{'row': row})
    })
})

router.get('/', (req, res)=> {
    res.render('index.html')
  });

module.exports = router;