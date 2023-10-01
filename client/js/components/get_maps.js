var map, infobox;

function GetMap() {
    map = new Microsoft.Maps.Map('#page', {});

    // Zoom out the map.
    map.setView({ zoom: 8 });

    // Create an infobox at the center of the map but don't show it.
    infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
        visible: false
    });

    // Get your place coordinates (example coordinates).
    var myPlaceCoordinates = { latitude: -34.82575129538611, longitude: 138.7051998037119 };

    // Iterate over depots and calculate the distance.
    var depots = state.depots;

    var nearestDepot = null;
    var nearestDistance = Number.MAX_VALUE;

    for (var i = 0; i < depots.length; i++) {
        var depot = depots[i];
        var depotCoordinates = depot.coordinates.split(',');

        var depotLat = parseFloat(depotCoordinates[1]);
        var depotLng = parseFloat(depotCoordinates[0]);

        var distance = calculateDistance(myPlaceCoordinates.latitude, myPlaceCoordinates.longitude, depotLat, depotLng);

        if (distance < nearestDistance) {
            nearestDepot = depot;
            nearestDistance = distance;
        }

        var pin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(depotLat, depotLng));

        // Store depot metadata with the pushpin.
        pin.metadata = {
            title: depot.depot_name,
            description: depot.address,
            coordinates: depot.coordinates,
            depot_id: depot.depot_id,
            postcode: depot.postcode
        };

        // Add a click event handler to the pushpin.
        Microsoft.Maps.Events.addHandler(pin, 'click', pushpinClicked);

        // Add pushpin to the map.
        map.entities.push(pin);
    }

    console.log("Nearest Depot:", nearestDepot);
    console.log("Distance:", nearestDistance);
}

function pushpinClicked(e) {
    // Make sure the infobox has metadata to display.
    if (e.target.metadata) {
        // Set the infobox options with the metadata of the pushpin.
        infobox.setOptions({
            location: e.target.getLocation(),
            title: e.target.metadata.title,
            description: e.target.metadata.description,
            visible: true
        });
        // console.log(e.target.metadata)

        // Set the infobox as the infobox for the map instance.
        infobox.setMap(map);

        // Add a click event handler to the infobox.
        Microsoft.Maps.Events.addHandler(infobox, 'click', function () {
            const depot = state.depots.filter(depot => depot.depot_id == e.target.metadata.depot_id)
            const filteredDepot = depot[0]
            console.log(filteredDepot)
            renderDepotAndMapInfo(filteredDepot.depot_id);
            clearMap();
        })
    }
}


function calculateDistance(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the Earth in kilometers
    var dLat = deg2rad(lat2 - lat1);
    var dLon = deg2rad(lon2 - lon1);

    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var distance = R * c; // Distance in kilometers

    return distance;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}
