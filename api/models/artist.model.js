const pool = require("../../config/database");

//Constructor
const Artist = function(artist){
    this.firstName  =  artist.firstName;
    this.lastName   =  artist.lastName; 
    this.birthYear  =  artist.birthYear; 
    this.artistDescription   =  artist.artistDescription;     
    this.background =  artist.background;   
    this.isActive   =  artist.isActive;  
}

Artist.create = (newArtist, result) => {
    pool.query("INSERT INTO artists SET ?", newArtist, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created artist: ", { id: res.insertId, ...newArtist });
      result(null, { id: res.insertId, ...newArtist });
    });
};

Artist.findById = (artistId, result) => {
    pool.query(`SELECT * FROM artists WHERE artistId = ${artistId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("Found artist: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Artist with the id
      result({ kind: "not_found" }, null);
    });
};

Artist.findAll = result => {
    pool.query(`SELECT * from artists`, (err, res) =>{
        if (err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
 
        result(null, res); 
    })
};

Artist.updateById = (id, artist, result) => { 
    //MOPDIFY QUERY
    pool.query(`UPDATE artists SET firstName = ?, lastName = ?, birthYear = ?, artistDescription = ?, background = ? WHERE artistId = ?`, 
        [artist.firstName, artist.lastName, artist.birthYear, artist.artistDescription, artist.background, id], (err, res) => {

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

        console.log("Updated artist", {id: id, ...artist});
        result(null, {id: id, ...artist});
    });
};

module.exports = Artist;

