const Artwork = require('../models/artwork.model');

module.exports = {
    createArtwork : (req, res) => {
         // Validate request
        if (!req.body) res.status(400).send({ message: "Content can not be empty!" });
        
         // Create a Artwork
        const artwork = new Artwork({ 
            artworkName:req.body.artworkName,
            yearMade :req.body.yearMade, 
            artworkMedium:req.body.artworkMedium, 
            size :req.body.size,     
            artworkDescription:req.body.artworkDescription, 
            imagePath:req.body.imagePath,
            artistId:req.body.artistId,
            artistActive:req.body.artistActive  
        });
     
        // Save Artwork in the database
        Artwork.create(artwork, (err, results) => {
            if (err){
                res.status(500).send({ message: err.message || "Some error occurred while creating the Artwork."});
            }else{
                res.send(results);
            }  
        });
    },
    findById : (req, res) => {

        const id = req.params.id; 
        Artwork.findById(id, (err, results) => {
            if (err){
                if (err.kind === "not_found"){
                    res.status(404).send({message: "Not found Artwork with id: "+ id });
                }else{
                    res.status(500).send({message: "Database error retrieving Artwork : "+ id})
                }
            }else{
                res.send(results);
            }  
        });
    },
    findAll : (req, res) => {

        Artwork.findAll((err, results) =>{
            if (err){
                res.status(500).send({ message: err.message || "An error in the database has ocurred"}); 
            } else{
                res.send(results);
            } 
        });
    },
    updateById : (req, res) => {
    
        if (!req.body) res.status(500).send({message:"Content cannot be empty"});

        const id = req.params.id;                
        Artwork.updateById(id, new Artwork(req.body), (err, results) =>{
            if (err){
                if (err.kind === "not_found"){
                    res.status(404).send({message: "Not found Artwork with id: "+ id });
                }else{
                    res.status(500).send({message: "Database error retrieving Artwork : "+ id})
                }
            }else res.send(results);
        });
    }
}//End of Module

