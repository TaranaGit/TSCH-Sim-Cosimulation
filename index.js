// load the express module , load the 'require' function
const express = require('express');
const { exec } = require('child_process')
// call the function, and store as as object app
const app = express();
const fs = require('fs');
const path = require('path');
const { response } = require('express');
const { json } = require('body-parser');
app.use(express.json());
 // Create a post route handler
 app.post('/api/schedule', (req, res) => {
    const value = req.body;
/**Read the Configuration file from Client  */
/*Change the path according to your device path */
    fs.writeFileSync('../tsch-sim-simulator/examples/7_nodes_topology/config.json', JSON.stringify(value),function(err){
        if(err){
            return console.log("error",err);
        }
        console.log("Configuratio_file is saved");
    })
    // res.send("hello world");
    console.log(req.body);
/* Run the Simulator Code */
    let commandOne = "cd ..";
    let commandTwo = "cd tsch-sim-simulator";
    // To run TSCH-Sim Simulator in window
    let commandThree = ".\\tsch-sim-windows.bat .\\examples\\7_nodes_topology\\config.json"
    exec(`${commandOne} && ${commandTwo} && ${commandThree}`, {maxBuffer: undefined}, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`Output: ${stdout}`);

        fs.readFile('../TSCH-2022/result2/test1/stats.json', function(err, data){
            if(err){
               return console.log("File read failed",err);      
            }
            // console.log("Sucessfully read File data",output );
            res.send((data));
        });
    });

    // res.send("hello world|||||||||||||||||||||||||||||||||||||||||||||");
 });

const port = process.env.PORT || 3000
app.listen(3000, () => console.log(`Listening on Port ${port}`)); 