if (L.Marker.prototype.bounce === undefined) {
    console.error('Leaflet.SmoothMarkerBouncing plugin not loaded!');
}

const map = L.map('map');

const locations = [
    {"name":"Beijing","lng":116.407395,"lat":39.904211},
    {"name":"Harbin","lng":126.6424173,"lat":45.7567307},
    {"name":"Baitou Mountain Tianchi","lng":128.059203,"lat":42.018233},
    {"name":"Changchun","lng":125.32357,"lat":43.8160199},
    {"name":"Changsha","lng":112.93886,"lat":28.2277799},
    {"name":"Zhangjiajie","lng":110.47839,"lat":29.1166699},
    {"name":"Suzhou","lng":120.58319,"lat":31.29833989999999},
    {"name":"Shanghai","lng":121.473701,"lat":31.230416},
    {"name":"Hangzhou","lng":120.15515,"lat":30.2741499},
    {"name":"Kaili City","lng":107.9804,"lat":26.5675599},
    {"name":"Guangzhou","lng":113.26436,"lat":23.1290799},
    {"name":"Hong Kong","lng":114.1693611,"lat":22.3193039},
    {"name":"Bangkok","lng":100.5017651,"lat":13.7563309},
    {"name":"Angkor Wat","lng":103.8669857,"lat":13.4124693},
    {"name":"Hanoi","lng":105.8341598,"lat":21.0277644},
    {"name":"Mũi Né","lng":108.2871837,"lat":10.9332105},
    {"name":"Da Nang","lng":108.0717219,"lat":16.0544563},
    {"name":"Ho Chi Minh City","lng":106.6296638,"lat":10.8230989},
    {"name":"San Francisco","lng":-122.4194155,"lat":37.7749295},
    {"name":"Monterey","lng":-121.8946761,"lat":36.6002378},
    {"name":"Los Angeles","lng":-118.242643,"lat":34.0549076},
    {"name":"San Jose","lng":-121.8852525,"lat":37.33874},
    {"name":"Reno","lng":-119.8142691,"lat":39.529919},
    {"name":"Las Vegas","lng":-115.1391009,"lat":36.171563},
    {"name":"Lake Tahoe","lng":-120.0323507,"lat":39.0968493},
    {"name":"St. George","lng":-113.5684164,"lat":37.0965278},
    {"name":"Denver","lng":-104.990251,"lat":39.7392358},
    {"name":"Houston","lng":-95.37011079999999,"lat":29.7600771},
    {"name":"Dallas","lng":-96.79698789999999,"lat":32.7766642},
    {"name":"Lake Charles","lng":-93.2173758,"lat":30.2265949},
    {"name":"Westlake","lng":-93.25070989999999,"lat":30.2421496},
    {"name":"Moss Bluff","lng":-93.19070970000001,"lat":30.3027042},
    {"name":"Little Rock","lng":-92.2880157,"lat":34.7444618},
    {"name":"Tallahassee","lng":-84.28062349999999,"lat":30.4381828},
    {"name":"Tampa","lng":-82.45875269999999,"lat":27.9516896},
    {"name":"St. Petersburg","lng":-82.6384451,"lat":27.7671271},
    {"name":"Clearwater","lng":-82.7958948,"lat":27.9655722},
    {"name":"Largo","lng":-82.7873244,"lat":27.9094665},
    {"name":"Honolulu","lng":-157.8581401,"lat":21.3098845},
    {"name":"Kapolei","lng":-158.0823892,"lat":21.3337389},
    {"name":"Wahiawa","lng":-158.0297748,"lat":21.4959617},
    {"name":"Hanamaulu","lng":-159.3551231,"lat":21.9942631},
    {"name":"Chicago","lng":-87.6297982,"lat":41.8781136},
    {"name":"Washington","lng":-77.0368707,"lat":38.9071923},
    {"name":"Bowie","lng":-76.77913649999999,"lat":39.0067768},
    {"name":"Arlington","lng":-77.1067698,"lat":38.8799697},
    {"name":"Springfield","lng":-77.18720359999999,"lat":38.7892801},
    {"name":"New Jersey","lng":-74.4056612,"lat":40.0583238}
];

const eastmost = Math.max(...locations.map(loc => loc.lng));
const westmost = Math.min(...locations.map(loc => loc.lng));
const centerLng = (eastmost + westmost) / 2;

const northmost = Math.max(...locations.map(loc => loc.lat));
const southmost = Math.min(...locations.map(loc => loc.lat));
const centerLat = (northmost + southmost) / 2;

map.setView([centerLat, centerLng], 2);

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

locations.forEach(location => {
    const marker = L.marker([location.lat, location.lng], {
        title: location.name
    })
    .bindPopup(location.name)
    .addTo(map);

        // Add bounce on mouseover
        marker.on('mouseover', function() {
            this.bounce();
        });
    
        // Stop bounce on mouseout
        marker.on('mouseout', function() {
            this.stopBouncing();
        });
});