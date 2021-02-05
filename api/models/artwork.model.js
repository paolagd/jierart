const pool = require("../../config/database");

//Constructor
const Artwork = function(artwork){
    this.artworkName    =  artwork.artworkName;
    this.yearMade       =  artwork.yearMade; 
    this.artworkMedium  =  artwork.artworkMedium; 
    this.size           =  artwork.size;     
    this.artworkDescription =  artwork.artworkDescription;   
    this.imagePath      =  artwork.imagePath;  
    this.artistId       =  artwork.artistId;  
    this.artistActive   =  artwork.artistActive;  
}
 
Artwork.create = (newArtwork, result) => {
    pool.query("INSERT INTO artworks SET ?", newArtwork, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created Artwork: ", { id: res.insertId, ...newArtwork });
      result(null, { id: res.insertId, ...newArtwork });
    });
};

Artwork.findById = (artworkId, result) => {
    pool.query(`SELECT * FROM artworks WHERE artworkId = ${artworkId}`, (err, res) => {
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
 
Artwork.findAll = result => {
    pool.query(`SELECT * from artworks`, (err, res) =>{
        if (err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
 
        result(null, res); 
    })
}; 

Artwork.updateById = (id, artwork, result) => { 
    //MODIFY QUERY
    pool.query(`UPDATE artworks SET artworkName = ?, yearMade = ?, artworkMedium = ?, size = ?, artworkDescription = ?, imagePath = ? WHERE artworkId = ?`, 
        [artwork.artworkName, artwork.yearMade, artwork.artworkMedium, artwork.size, artwork.artworkDescription, artwork.imagePath, id], (err, res) => {

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

        console.log("Updated artwork", {id: id, ...artwork});
        result(null, {id: id, ...artwork});
    });
};
 
module.exports = Artwork;
 