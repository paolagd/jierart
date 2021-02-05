const Exhibition = require('../models/exhibition.model');

module.exports = {
    createExhibition : (req, res) => {
         // Validate request
        if (!req.body) res.status(400).send({ message: "Content can not be empty!" });
        
         // Create a Exhibition
        const exhibition = new Exhibition({ 
            exhYear:req.body.exhYear,
            exhMonth :req.body.exhMonth, 
            exhDescription:req.body.exhDescription, 
            exhType :req.body.exhType,      
            artistId:req.body.artistId,
            artistActive:req.body.artistActive  
        }); 
        
        // Save Exhibition in the database
        Exhibition.create(exhibition, (err, results) => {
            if (err){
                res.status(500).send({ message: err.message || "Some error occurred while creating the Exhibition."});
            }else{
                res.send(results);
            }  
        });
    },
    findById : (req, res) => {

        const id = req.params.id; 
        Exhibition.findById(id, (err, results) => {
            if (err){
                if (err.kind === "not_found"){
                    res.status(404).send({message: "Not found Exhibition with id: "+ id });
                }else{
                    res.status(500).send({message: "Database error retrieving Exhibition : "+ id})
                }
            }else{
                res.send(results);
            }  
        });
    },
    findAll : (req, res) => {

        Exhibition.findAll((err, results) =>{
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
        Exhibition.updateById(id, new Exhibition(req.body), (err, results) =>{
            if (err){
                if (err.kind === "not_found"){
                    res.status(404).send({message: "Not found Exhibition with id: "+ id });
                }else{
                    res.status(500).send({message: "Database error retrieving Exhibition : "+ id})
                }
            }else res.send(results);
        });
    }
}//End of Module

