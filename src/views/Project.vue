<template>
    <div class="root" v-html="html"></div>
</template>

<script>

    // const mongoose = require("mongoose");
    // mongoose.connect('mongodb+srv://khalby786:autobots786@gppprojectinfo.vzyse.mongodb.net/projects?retryWrites=true&w=majority', {
    //     useMongoClient: true
    // });

    // const projectSchema = mongoose.Schema({
    //     _id: mongoose.Schema.Types.ObjectId,
    //     key: String,
    //     value: String
    // }, { collection : 'endb' });

    // let Project = mongoose.model('Project', projectSchema);

    export default {
        name: 'Project',
        data: function() {
            return {
                css: null,
                html: null,
                js: null
            }
        },
        // components: {
        //     VueStyle,
        //     VueScript
        // },
        created: function() {
            console.log("let's see if this works!");

            // fetch(`https://gppapi.now.sh/api/code?project=${this.$route.params.project}`)
            //     .then(req => req.json())
            //     .then(data => {
            //         this.html = data.html;
            //         this.addStyle(data.css)
            //         this.addScript(data.js);
            //     })

            fetch("/.netlify/functions/code?project=" + this.$route.params.project)
            .then(req => req.json())
            .then(data => {
                this.html = data.html;
                this.addStyle(data.css)
                this.addScript(data.js); 
            })
        },
        methods: {
            addStyle: function (styles) { 
              
                /* Create style document */ 
                var css = document.createElement('style'); 
                css.type = 'text/css'; 
            
                if (css.styleSheet) {
                    css.styleSheet.cssText = styles; 
                } else {
                    css.appendChild(document.createTextNode(styles)); 
                }
                
                /* Append style to the tag name */ 
                document.getElementsByTagName("head")[0].appendChild(css); 
            },
            addScript: function(script) {
                var newScript = document.createElement("script");
                var inlineScript = document.createTextNode(script);
                newScript.appendChild(inlineScript); 
                document.body.appendChild(newScript);
            }
        }

    }

</script>