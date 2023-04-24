const express = require("express");
const https = require("https");
const bodyParser=require("body-parser");
const dotenv=require("dotenv");

const app = express();
dotenv.config();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res) {
res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){


  const query=req.body.cityName;
  const apikey=process.env.KEY;
  const unit="metric";

  const url="https://api.openweathermap.org/data/2.5/forecast?q="+query+"&appid="+apikey+"&units="+unit;
  https.get(url, function(response) {
    console.log(response.statusCode);
    response.on("data",function(data){

     const weatherData=JSON.parse(data)

     var date = new Date();
     weatherData.list.forEach((element)=>{
       const date2=element.dt_txt;
       const temp2=element.main.temp;
       if(date2[9]!==date[9]){
         res.write("<p>The temperature is "+temp2 +" degree celsius on "+date2+"</p>");
       }
       date=date2;

     });
     res.send();

   })

  })


})




app.listen(3000, function() {
  console.log("server is running on port 3000");
})
