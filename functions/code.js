const mongoose = require("mongoose");
const Project = require("../models/project.js");

mongoose.connect(process.env.MONGO_URI, {
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