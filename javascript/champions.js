console.log("connected champions.js")
var championData = [];

const API = {
    "key": "ede1611243a89b545af7e3cb141474ca",
    "base": "http://ddragon.leagueoflegends.com/cdn/8.17.1",
    "data": "/data/en_US",
    "images": "/img/champion"
};
var champions = {};

function makeImages() {
    for (i in champions) {
        console.log(`${API.base}${API.images}/${champions[i].image.full}`);
        championData.push(`${API.base}${API.images}/${champions[i].image.full}`);
        $(".champions").append("<img src='" + `${API.base}${API.images}/${champions[i].image.full}` + "' >")
    }
}

function getChampionID(ddID) {
    for (i in champions) {
        if (champions[i].id == ddID)
            return champions[i].key
    }
}

function getChampionStats(championID) {

    // var proxyUrl = "https://cors-ut-bootcamp.herokuapp.com/";
    // var targetUrl = `http://api.champion.gg/v2/champions/${championID}?&limit=200&champData=kda,damage,averageGames,totalHeal,killingSpree,minions,gold,positions,normalized,groupedWins,trinkets,runes,firstitems,summoners,skills,finalitems,masteries,maxMins,matchups&api_key=${API.key}`;

    // $.get(proxyUrl + targetUrl, function (data) {
    //     console.log(data);
    // });



    var xhr = new XMLHttpRequest();
    xhr.open("GET", `http://api.champion.gg/v2/champions/${championID}?&limit=200&champData=kda,damage,averageGames,totalHeal,killingSpree,minions,gold,positions,normalized,groupedWins,trinkets,runes,firstitems,summoners,skills,finalitems,masteries,maxMins,matchups&api_key=${API.key}`);
    xhr.onload = function () {
        console.log(JSON.parse(xhr.response));
    }
    xhr.send();
}

var xhr = new XMLHttpRequest();
xhr.open("GET", `${API.base}${API.data}/champion.json`);
xhr.onload = function () {
    champions = JSON.parse(xhr.response).data;
    makeImages();
}
xhr.send();


