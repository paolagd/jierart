const pool = require("../../config/database");

//Constructor
const Exhibition    = function(exhibit){
    this.exhYear    =  exhibit.exhYear;
    this.exhMonth   =  exhibit.exhMonth; 
    this.exhDescription  =  exhibit.exhDescription; 
    this.exhType   =  exhibit.exhType;     
    this.artistId  =  exhibit.artistId;   
    this.artistActive   =  exhibit.artistActive;  
}
 

Exhibition.create = (newExhibition, result) => {
    pool.query("INSERT INTO exhibitions SET ?", newExhibition, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created exhibition: ", { id: res.insertId, ...newExhibition });
      result(null, { id: res.insertId, ...newExhibition });
    });
};

Exhibition.findById = (exhibitionId, result) => {
    pool.query(`SELECT * FROM exhibitions WHERE exhibitionId = ${exhibitionId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("Found exhibition: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Exhibition with the id
      result({ kind: "not_found" }, null);
    });
};

Exhibition.findAll = result => {
    pool.query(`SELECT * from exhibitions`, (err, res) =>{
        if (err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
 
        result(null, res); 
    })
}; 

Exhibition.updateById = (id, exhibition, result) => { 
    //MOPDIFY QUERY
    pool.query(`UPDATE exhibitions SET exhYear = ?, exhMonth = ?, exhDescription = ?, exhType = ? WHERE exhibitionId = ?`, 
        [exhibition.exhYear, exhibition.exhMonth, exhibition.exhDescription, exhibition.exhType, id], (err, res) => {

        if(err){
            console.log(err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0){
            //id not found
            result({kind : "not_found"}, null);
            return;
        }

        console.log("Updated exhibition", {id: id, ...exhibition});
        result(null, {id: id, ...exhibition});
    });
};

module.exports = Exhibition;

