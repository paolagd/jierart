require("dotenv").config();
const { json } = require("express");
const express = require("express");
const app = express();
const artistRouter  = require("./api/routes/artist.routes");
const artworkRouter = require("./api/routes/artwork.routes");
const exhibitionRouter    = require("./api/routes/exhibition.routes");
 
app.use(express.json());


app.use("/api/artists", artistRouter);
app.use("/api/artworks", artworkRouter); 
app.use("/api/exhibitions", exhibitionRouter);

app.listen(process.env.APP_PORT, () => {
    console.log("Funcionando vamos que tu puedes!", process.env.APP_PORT)
});