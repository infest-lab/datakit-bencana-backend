var fs = require('fs');
var mongoose = require('mongoose');
import config from './app/config/config';
import Point from './app/models/Point';
Promise = require('bluebird'); // eslint-disable-line no-global-assign

// plugin bluebird promise in mongoose
mongoose.Promise = Promise;

//console.log(config.db)
// connect to mongo db
mongoose.connect(config.db.mongoUri, { useNewUrlParser: true });
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.db.mongoUri}`);
});

var obj;
fs.readFile(__dirname +'/data/points.geojson', 'utf8', function (err, data) {
  if (err) throw err;
  obj = JSON.parse(data);
  obj.features.forEach(function(item){
  	var _item = item.properties;
  	/*{ "type": "Feature", "properties": { 
  "Name": "Jalan Purnawirawan", 
  "description": "Kategori: Lokasi pengungsi<br>Latitude: -0.915673<br>Longitude: 119.877267<br>Alamat: Jalan Purnawirawan, Tatura Sel. Palu Sel. Kota Palu, Sulawesi Tengah 94111<br>Jumlah pengungsi: 20 orang<br>Kontak: <br>Nomor HP: <br>Keterangan: ", 
  "tessellate": -1, 
  "extrude": 0, 
  "Kategori":"Lokasi pengungsi", 
  "Latitude": "-0.915673", 
  "Longitude": "119.877267", 
  "Alamat": "Jalan Purnawirawan, Tatura Sel. Palu Sel. Kota Palu, Sulawesi Tengah 94111", 
  "Jumlah_pengungsi": "20 orang", 
  "Kontak": "", 
  "Nomor_HP": "", 
  "Keterangan": "" 
}, "geometry": { "type": "Point", "coordinates": [ 119.877267, -0.915673 ] } },*/
	var Jumlah = _item.Jumlah_pengungsi.replace(/[^0-9]/g, '');
	var jumlah_pengungsi = Jumlah.replace('.','');
	//console.log(_item.Jumlah_pengungsi, ' - ', Jumlah)
  	var newPoint = Point({
			name: _item.Name,
			description: _item.description,
			category: _item.Kategori,
			address: _item.Alamat,
			latitude: _item.Latitude,
			longitude: _item.Longitude,
			survivors: jumlah_pengungsi,
			contact: _item.Kontak,
			phone: _item.Nomor_HP,
			notes: _item.Keterangan,
			createdAt: Date.now(),
			modifiedAt: Date.now()
  	});
  	newPoint.save();
  	console.log('feature :', item.properties.Name, ' saved');
  });	
});