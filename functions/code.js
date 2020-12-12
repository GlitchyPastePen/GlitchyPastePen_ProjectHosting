const mongoose = require("mongoose");
const Project = require("../models/project.js");

mongoose.connect('mongodb+srv://khalby786:autobots786@gppprojectinfo.vzyse.mongodb.net/projects?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

exports.handler = async function(event, context) {
    let project = await Project.findOne({ "key": `endb:${event.queryStringParameters.project}` }).exec()
    // .then(project => console.log(project))
    // .catch(err => console.error(err))
    console.log("PROJECT!!!")
    console.log(project)

    console.log("hi")
    

    return {
        statusCode: 200,
        body: JSON.stringify(project)
    };
}

// exports.handler = async function(event, context) {
//     return {
//         statusCode: 200,
//         body: JSON.stringify({message: "Hello World"})
//     };
// }