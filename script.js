
var xmod; 
var models = [];
var modelIndex = 0;

var tunes=[];

function loadTunes()
{
tunes[0] = 'Assets/BackInBlack.mp3';
tunes[1] = 'Assets/EveryRose.mp3';
tunes[2] = 'Assets/LoveInAnElevator.mp3';
tunes[3] = 'Assets/MrJones.mp3';
tunes[4] = 'Assets/PourSomeSugarOnMe.mp3';
}

 

window.onload = () => {
    const button = document.querySelector('button[data-action="change"]');
    button.innerText = '﹖';

    loadLocations(); 
    playMusic(); 

};


class model 
{  // Create the class
    constructor(xmod) 
    {  // Class constructor
      this.music = xmod.music;
      this.scale = xmod.scale;
      this.info = xmod.info;
      this.rotation = xmod.rotation;
      this.lat = xmod.lat;
      this.lng = xmod.lng;
      this.radius = xmod.radius; 
      this.color = xmod.color;
      this.alink = xmod.alink; 
    }
  }



var setModel = function (model, entity) {
    if (model.scale) {
        entity.setAttribute('scale', model.scale);
    }

    if (model.rotation) {
        entity.setAttribute('rotation', model.rotation);
    }
 
    if (model.position) { 
        entity.setAttribute('position', model.position);
    }

    if (model.color) { 
        entity.setAttribute('color', model.color);
    }

    const div = document.querySelector('.instructions');
    div.innerText = model.info;
};


function playMusic()
{
    loadTunes(); 
    let scene = document.querySelector('a-scene');
    let tune = document.createElement('a-sound');
    tune.setAttribute('src',tunes[getRandomNumber(tunes.length)])
    tune.setAttribute('autoplay','true');

    scene.appendChild(tune);
}

function getRandomNumber (max) {
    
     var rand = Math.floor(Math.random() * max);
     return rand; 
}


function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.lat;
        let longitude = place.lng;
        let color = place.color;
        let radius = place.radius;
        let scale = place.scale;

        let model = document.createElement('a-sphere');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        model.setAttribute('color', `${color}`);
        model.setAttribute('radius', radius);
        model.setAttribute('scale', scale);
        model.setAttribute('id','NewSphere')

        setModel(models[modelIndex], model);
        document.querySelector('button[data-action="change"]').addEventListener('click', function () {
            var entity = document.querySelector('[gps-entity-place]');
            modelIndex++;
            var newIndex = modelIndex % models.length;
            setModel(models[newIndex], entity);
        });
        scene.appendChild(model);

        console.log( $('NewSphere'));
    });
}

function loadLocations() {

    var locationRequest = new XMLHttpRequest();
var server = 'https://gamemaster.dannyalantaylor.info' 

    locationRequest.open('GET', server + '/api/VR');

    locationRequest.onload = function () {

        var mydata = locationRequest.responseText;
        console.log(JSON.parse(mydata)[0]);

        objarray = JSON.parse(mydata);

        for (var key in objarray) 
        {
        var mdl = new model(objarray[key]);    
        models.push(mdl);
        }
        renderPlaces(models);
    };
    locationRequest.send();
}