// REQUIRES - LIBRARY

const Discord = require('discord.js');
var ical = require('node-ical');
var PImage = require('pureimage');
var fs = require('fs');
const ytdl = require('ytdl-core');

// Constants 
const client = new Discord.Client();
const {
	prefix,
	token,
} = require('./config.json');
const queue = new Map();



// Variables
var memberCount;
var serverCount;
var ssl = require('https').globalAgent.options.ca = require('ssl-root-cas/latest').create();

// Bot Connection
client.once('ready', () => {
    memberCount = client.users.size;
    serverCount = client.guilds.size;
    console.log(`Logged in as ${client.user.tag}! - Number of User : ` + memberCount + ' - Number Guilds : ' + serverCount);
    client.user.setStatus('online')
    client.user.setPresence({
        game: {
            name: 'Tapez !help',
            type: "Playing",
            url: "https://discordapp.com/"
        }
    });
    
});
client.once('reconnecting', () => {
	console.log('Reconnecting!');
});

client.once('disconnect', () => {
	console.log('Disconnect!');
});


// When a message arrive 
client.on('message', msg => {
    
    const args = msg.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase(); 

    switch (command) {
        case 'edt': // EMPLOI DU TEMPS
        {
            // !edt <group>
            if((args[0] === "A") || (args[0] === "a")){
                var ICAL = "http://intranet.iut-troyes.univ-reims.fr/api/ical/etudiant/484084f476bc959451fd07521135311cc0787cc103bcea4519da98b53d4a81d6e394a77094c45b8a";
                ICALParser(client, ICAL, msg, "GROUPE A");
                return;
            } else if ((args[0] === "B") || (args[0] === "b")){
                var ICAL = "http://intranet.iut-troyes.univ-reims.fr/api/ical/etudiant/0a19c8e8d098402d724ed37cec1b0cde593e9b502ba45ace8fd790cf49ae7a3056efa1a560363804"; 
                ICALParser(client, ICAL, msg, "GROUPE B");
                return;
            } else if ((args[0] === "C") || (args[0] === "c")){
                msg.reply("GROUPE C INDISPONIBLE - PAS DE LIEN ICAL");
                return;
            } else if ((args[0] === "D") || (args[0] === "d")){
                var ICAL = "http://intranet.iut-troyes.univ-reims.fr/api/ical/etudiant/7c244926195f9389f0c5fad081a3e892bf4389a97ce7392b06d7c261e8f938a70af6905d72780aba";
                ICALParser(client, ICAL, msg, "GROUPE D");
                return;
            } else if ((args[0] === "E") || (args[0] === "e")){
                var ICAL = "http://intranet.iut-troyes.univ-reims.fr/api/ical/etudiant/5b30791734aae71580811b7ca550054bfbff32dd3ff351a039232fd6f501f5a02ebb87f49a59d3df"
                ICALParser(client, ICAL, msg), "GROUPE E";
                return;
            } else if ((args[0] === "F") || (args[0] === "f")){
                var ICAL = "http://intranet.iut-troyes.univ-reims.fr/api/ical/etudiant/ca83a1a1604062a5a9b2504aedbeb5beaa7a5607aadb8c7dab779c2df1c4253ffb34c1d51a0c74e2";           
                ICALParser(client, ICAL, msg, "GROUPE F");
                return;
            } else if ((args[0] === "G") || (args[0] === "g")){
                var ICAL = "http://intranet.iut-troyes.univ-reims.fr/api/ical/etudiant/00253378b4c245a308dfdaf084463ae42f9bfba60ddb6914f097312daacfcd7fa068557caf654bf8";
                ICALParser(client, ICAL, msg, "GROUPE G");
                return;
            } else if ((args[0] === "H") || (args[0] === "h")){
                var ICAL = "http://intranet.iut-troyes.univ-reims.fr/api/ical/etudiant/be506ede7ccdb892229bc0b2371e4d3039456cb875a07a7725ec27a14526ebbe816dd757999a04ad";
                ICALParser(client, ICAL, msg, "GROUPE H");
                return;
            }
           
            if(args[0] == 'help'){
                console.log('AIDE DE L\'UTILISATION DE EDT');
            }
        }
        case 'music': {
            if (!args.length) {
            
            }else if((args[0] === 'play') || (args[0] === 'p')){
                // !music play <link>

                return;
            }else if((args[0] === 'skip') || (args[0] === 'sk')){
            
            }
            
        }

    }
});

function ICALParser(client, link, msg, groupe)
{
    ical.fromURL(link, {}, function(err, data) {
        var tab = [];
        message = "";

        if (err) console.log(err);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const date = [];
        var i = 0;
        var n;
        for (let k in data) {
            if (data.hasOwnProperty(k)) {
                var ev = data[k];
                
                if (data[k].type == 'VEVENT') {
                    date[i] = ev.start.getDate();

                    i++;                        
                }
            }
        }
        var date_trie = []
        var a = 0;
        for(n = 0; n < i; n++){
            if((date[n] != date[n + 1])){
                date_trie[a] = date[n];
                console.log(date_trie[a]);
                a++;
            }
        }

        // Semaine 1
        var Lundi = date_trie[0];
        var Mardi = Lundi + 1;
        var Mercredi = Mardi + 1;
        var Jeudi = Mercredi + 1;
        var Vendredi = Jeudi + 1;
        // Semaine 2
        var Lundi_2 = Vendredi + 3;
        var Mardi_2= Lundi_2 + 1;
        var Mercredi_2 = Mardi_2 + 1;
        var Jeudi_2 = Mercredi_2 + 1;
        var Vendredi_2 = Jeudi_2 + 1;
        var fnt = PImage.registerFont('fonts/SourceSansPro-Regular.ttf','Source Sans Pro');
        fnt.load(() => {
            var img = PImage.make(4000,2000);
            var ctx = img.getContext('2d');
            //ctx.fillStyle = 'rgba(255,0,0, 0.5)';
            //ctx.fillRect(190,150,400,100);
            //ctx.fillStyle = 'rgba(255,0,0, 0.5)';
            //ctx.fillRect(190,300,400,100);
            ctx.fillStyle = '#ffffff';
            ctx.font = "72pt 'Source Sans Pro'";
            ctx.fillText(groupe, 1800, 100);
            ctx.font = "48pt 'Source Sans Pro'";
            ctx.fillText("Lundi " + Lundi, 200, 300);
            ctx.fillText("Mardi " + Mardi, 1000, 300);
            ctx.fillText("Mercredi " + Mercredi, 1800, 300);
            ctx.fillText("Jeudi " + Jeudi , 2600, 300);
            ctx.fillText("Vendredi " + Vendredi, 3400, 300);
            
            ctx.fillText("Lundi " + Lundi_2, 200, 1000);
            ctx.fillText("Mardi " + Mardi_2, 1000, 1000);
            ctx.fillText("Mercredi " + Mercredi_2, 1800, 1000);
            ctx.fillText("Jeudi " + Jeudi_2, 2600, 1000);
            ctx.fillText("Vendredi " + Vendredi_2, 3400, 1000);
            // Semaine 1
            var y_l = 300;
            var y_ma = 300;
            var y_me = 300;
            var y_j = 300;
            var y_v = 300;
            
            // Semaine 2
            var y_l_2= 1000;
            var y_ma_2 = 1000;
            var y_me_2 = 1000;
            var y_j_2= 1000;
            var y_v_2= 1000;
            var reset = 0;
            for (let k in data) {
                
                if (data.hasOwnProperty(k)) {
                    var ev = data[k];
                    if (data[k].type == 'VEVENT') {
                        // Semaine 1
                        if(ev.start.getDate() == Lundi){
                            ctx.fillText(ev.start.toLocaleTimeString('fr-FR') + "-" +  ev.summary + " - " + ev.location, 0, (y_l = y_l + 100));
                        }
                        
                        if(ev.start.getDate() == Mardi){
                            ctx.fillText(ev.start.toLocaleTimeString('fr-FR') + "-" +  ev.summary + " - " + ev.location, 800, (y_ma = y_ma + 100));
                        }
                        
                        if(ev.start.getDate() == Mercredi){
                            ctx.fillText(ev.start.toLocaleTimeString('fr-FR') + "-" +  ev.summary + " - " + ev.location, 1600, (y_me= y_me + 100));
                        }
                        if(ev.start.getDate() == Mercredi){
                            ctx.fillText(ev.start.toLocaleTimeString('fr-FR') + "-" +  ev.summary + " - " + ev.location, 2400, (y_j= y_j + 100));
                        }
                        if(ev.start.getDate() == Vendredi){
                            ctx.fillText(ev.start.toLocaleTimeString('fr-FR') + "-" +  ev.summary + " - " + ev.location, 3200, (y_v= y_v + 100));
                        }
                        // Semaine 2
                        if(ev.start.getDate() == Lundi_2){
                            ctx.fillText(ev.start.toLocaleTimeString('fr-FR') + "-" +  ev.summary + " - " + ev.location, 0, (y_l_2 = y_l_2 + 100));
                        }
                        if(ev.start.getDate() == Mardi_2){
                            ctx.fillText(ev.start.toLocaleTimeString('fr-FR') + "-" +  ev.summary + " - " + ev.location, 800, (y_ma_2 = y_ma_2 + 100));
                        }
                        
                        if(ev.start.getDate() == Mercredi_2){
                            ctx.fillText(ev.start.toLocaleTimeString('fr-FR') + "-" +  ev.summary + " - " + ev.location, 1600, (y_me_2 = y_me_2 + 100));
                        }
                        if(ev.start.getDate() == Mercredi_2){
                            ctx.fillText(ev.start.toLocaleTimeString('fr-FR') + "-" +  ev.summary + " - " + ev.location, 2400, (y_j_2= y_j_2 + 100));
                        }
                        if(ev.start.getDate() == Vendredi_2){
                            ctx.fillText(ev.start.toLocaleTimeString('fr-FR') + "-" +  ev.summary + " - " + ev.location, 3200, (y_v_2= y_v_2 + 100));
                        }
                    }
                }
            }
            
            PImage.encodePNGToStream(img, fs.createWriteStream('out.png')).then(() => {
                msg.channel.send("", {files: ["out.png"]});
            }).catch((e)=>{
                console.log("there was an error writing");
            });
        });
    })
};

  
client.login(token);