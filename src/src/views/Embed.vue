<template>
    <span class="embed">
        <div id="loader" v-if="loaded == false">
            <center>
                <div class="donutSpinner"></div><br><br>
                <b>Loading...</b>
                <br><br>
                <p style="font-family:'Fira Code', 'IBM Plex Mono', monospace;">{{project_name}}</p>
                <Footer />
            </center>
        </div>
        <editor ref='gpp' v-model="content" @init="editorInit" :lang="lang" theme="vibrant_ink" width="100%" height="calc(100vh - 26px)" v-if="loaded === true"></editor>
        <div id="footer" v-if="loaded === true">
            <button class="file" @click="setHtml()">index.html</button>
            <button class="file" @click="setCss()">style.css</button>
            <button class="file" @click="setJs()">script.js</button>
        </div>
    </span>
</template>

<script>

    const axios = require('axios');

    import { EditSession } from 'brace';
    import Footer from '@/components/Footer.vue';

    export default {
        name: 'Project',
        data: function() {
            return {
                editor: null,
                content: null,
                lang: 'html',
                htmlSession: new EditSession("<html></html>"),
                cssSession: new EditSession("body { color: red; }"),
                jsSession: new EditSession("console.log('//hi')"),
                htmlCode: null,
                cssCode: null,
                jsCode: null,
                loaded: false,
                project: null,
                project_name: null,
            }
        },
        components: {
            editor: require('vue2-ace-editor'),
            Footer
        },
        methods: {
            editorInit: function (editor) {
                require('brace/ext/language_tools') 
                require('brace/mode/html')                
                require('brace/mode/javascript')
                require('brace/mode/css')   
                require('brace/theme/vibrant_ink')
                require('brace/snippets/javascript')
                let project_name = this.$route.params.project;
                // var html = "<html></html>";
                // var css = "body { color: red; }";
                // var js = "console.log('//hi')";
                // (async() => {
                //     let req = await fetch(`https://gppapi.now.sh/api/code?project=${project_name}`);
                //     let res = await req.json();
                //     html = res.html;
                //     css = res.css;
                //     js = res.js;
                // })()
                editor.setOptions({
                    fontSize: "16px",
                    fontFamily: "Fira Mono",
                    enableSnippets: true,
                    enableLiveAutocompletion: true, 
                    autoScrollEditorIntoView: true
                });
                editor.setSession(this.htmlSession);
                console.log("i'm done")
                this.loaded = true;
            },
            setHtml() {
                require('brace/mode/html');
                this.lang = "html";
                this.$refs.gpp.editor.setSession(this.htmlSession);
            },
            setCss() {
                require('brace/mode/css');
                this.lang = "css"
                this.$refs.gpp.editor.setSession(this.cssSession);
            },
            setJs() {
                require('brace/mode/javascript');
                this.lang = "javascript"
                this.$refs.gpp.editor.setSession(this.jsSession);
            },
        },
        created: function() {
            let project_name = this.$route.params.project;
            this.project_name = project_name;
            console.log(project_name);
            axios.get(`https://gppapi.now.sh/api/code?project=${project_name}`)
                .then(response => {
                    console.log(response)
                    this.htmlCode = response.data.html;
                    this.cssCode = response.data.css;
                    this.jsCode = response.data.js;
                    console.log(response.data.html);
                    this.htmlSession.setValue(response.data.html);
                    this.cssSession.setValue(response.data.css);
                    this.jsSession.setValue(response.data.js);
                    console.log(this.htmlSession);
                    // this.loaded = true;
                    var that = this;
                    setTimeout(function() {
                        that.loaded = true;
                    }, 7000)
                })
            axios.get(`https://gppapi.now.sh/api/project?project=${project_name}`)
                .then(response => {
                    this.project = response.data;
                })
        },
    }

</script>

<style scoped>

    @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Fira+Mono&display=swap');

    .embed {
        border-radius: 9px;
        border: 1px solid black;
    }

    .ace_editor {
        position: absolute;
        top: 0px;
        left: 0px;
        /* border-top: 1px solid white; */
        bottom: 26px;
        right: 0px;
        height: 100%;
        width: 100%;
        border-bottom: 1px solid white;
    }

    #footer {
        height: 25px;
        position: fixed;
        width: 100%;
        left: 0px;
        right: 0px;
        bottom: 0px;
        padding-left: 10px;
        padding-right: 10px;
        background-color: #0F0F0F;
    }

    .file {
        float: left;
        margin-left: 10px;
        padding-top: 3px;
        padding-bottom: 3px;
        padding-left: 5px;
        padding-right: 5px;
        cursor: pointer;
        font-family: "Fira Mono", "IBM Plex Mono", monospace;
        box-shadow: 0px;
        border: 0px solid white;
        background-color: #0F0F0F;
        color: white;
    }

    .file:hover {
        --hover: #8547ff;
        background-color: var(--hover);
    }

    #loader {
        height: 100%;
        width: 100%;
        position: absolute;
        left: 0px;
        right: 0px;
        bottom: 0px;
        top: 0px;
        background-color: #0F0F0F;
        color: white;
        /* background-color: yellow; */
        z-index: 5;
        font-family: "Inter", "Arial", sans-serif;
        padding-top: 30vh;
    }

    .donutSpinner {
        display: inline-block;
        border: 4px solid hsl(222, 100%, 95%);;
        border-left-color: hsl(243, 80%, 62%);
        border-radius: 50%;
        width: 30px;
        height: 30px;
        animation: donut-spin 1.2s linear infinite;
    }

    @keyframes donut-spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
    
    footer {
        position: absolute !important;
    }



</style>