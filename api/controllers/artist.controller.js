//const {create} = require('../models/artist.model')
const Artist = require('../models/artist.model');

module.exports = {
    createArtist : (req, res) => {
         // Validate request
        if (!req.body) res.status(400).send({ message: "Content can not be empty!" });
        
         // Create a Artist
        const artist = new Artist({ 
            firstName:req.body.firstName,
            lastName :req.body.lastName, 
            birthYear:req.body.birthYear, 
            description :req.body.artistsDescription,     
            background:req.body.background, 
            isActive:req.body.isActive
        });
     
        // Save Artist in the database
        Artist.create(artist, (err, results) => {
            if (err){
                res.status(500).send({ message: err.message || "Some error occurred while creating the Artist."});
            }else{
                res.send(results);
            }  
        });
    },
    findById : (req, res) => {

        const id = req.params.id; 
        Artist.findById(id, (err, results) => {
            if (err){
                if (err.kind === "not_found"){
                    res.status(404).send({message: "Not found Artist with id: "+ id });
                }else{
                    res.status(500).send({message: "Database error retrieving Artist : "+ id})
                }
            }else{
                res.send(results);
            }  
        });
    },
    findAll : (req, res) => {

        Artist.findAll((err, results) =>{
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
        Artist.updateById(id, new Artist(req.body), (err, results) =>{
            if (err){
                if (err.kind === "not_found"){
                    res.status(404).send({message: "Not found Artist with id: "+ id });
                }else{
                    res.status(500).send({message: "Database error retrieving Artist : "+ id})
                }
            }else res.send(results);
        });
    }



}//End of Module

