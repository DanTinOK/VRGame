
window.onload = () => {
    const button = document.querySelector('button[data-action="change"]');
    button.innerText = '﹖';

    let places = staticLoadPlaces();
    renderPlaces(places);
};

function staticLoadPlaces() {
    return [
        {
            name: 'Welcome to the game',
            location: {
                // decomment the following and add coordinates:
                lat: 35.461546,
                lng: -98.361598
            },
        },
    ];
}

var models = [
    
        {
        music: './assets/',
        scale: '12.5 12.5 12.5',
        info: 'Number 1',
        rotation: '0 180 0',
        lat: 35.461286,
        lng: -98.3615780,
        radius: 1.25, 
        color:'#ff0000',
        alink: 'Number1'

    },
    {
        music: './assets/ChristmasTree/model.gltf',
        scale: '40.5 40.5 40.5',
        info: 'Number 2',
        rotation: '0 180 0',
        lat: 35.461286,
        lng: -98.3615780,
        radius: 1.25, 
        color:'#00ff00',
        alink: 'Number2'              
    },
    {
        url: './assets/PeppermintPenguin/model.gltf',
        scale: '10.2 10.2 10.2',
        rotation: '0 180 0',
        info: 'Number 3',
        lat: 35.461286,
        lng: -98.3615780,
        radius: 1.25, 
        color:'#0000ff',
        alink: 'Number3'        
    },
    {
        url: './assets/SurprisedSanta/model.gltf',
        scale: '22.0 22.0 22.0',
        rotation: '0 180 0',
        info: 'Number 4',
        lat: 35.461286,
        lng: -98.3615780,
        radius: 1.25, 
        color:'#eeee00',
        alink: 'Number4'        
    },
    {
        url: './assets/ChristmasTree2/model.gltf', 
        scale: '10.08 10.08 10.08',
        rotation: '0 180 0',
        info: 'Number 5',
        lat: 35.461286,
        lng: -98.3615780,
        radius: 1.25, 
        color:'#00eeee', 
        alink: 'Number5'            
    },
];

var modelIndex = 0;
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

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;
        let color = place.location.color;
        let radius = place.location.radius;

        let model = document.createElement('a-sphere');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude}; color: ${color}; radius: ${radius};`);
        model.setAttribute('color', `${color}`);

        setModel(models[modelIndex], model);


        document.querySelector('button[data-action="change"]').addEventListener('click', function () {
            var entity = document.querySelector('[gps-entity-place]');
            modelIndex++;
            var newIndex = modelIndex % models.length;
            setModel(models[newIndex], entity);
        });

        scene.appendChild(model);
    });
}

function loadLocations() {

    var locationRequest = new XMLHttpRequest();
    locationRequest.open('GET', 'https://gamemaster.dannyalantaylor.info/api/VR');

    locationRequest.onload = function () {

        var mydata = locationRequest.responseText;
        console.log(JSON.parse(mydata)[0]);

        var locations = JSON.parse(mydata);

        for (var key in locations) 
        {
        new model({
            music: locations[key].music,
            scale: locations[key].scale,
            info:  locations[key].info,
            rotation:  locations[key].rotation,
            lat:  locations[key].lat,
            lng:  locations[key].lng,
            radius:  locations[key].radius, 
            color:  locations[key].color,
            alink:  locations[key].alink 
            });        
        }
    };
    locationRequest.send();
}