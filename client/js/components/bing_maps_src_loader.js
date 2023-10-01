// Load the Bing Maps script dynamically
function loadBingMapsScript() {
    fetch('/bingMapsKey')
    .then(res => res.json())
    .then(key => {
        var script = document.createElement('script');
        script.src = `http://www.bing.com/api/maps/mapcontrol?callback=GetMap&key=${key}`
        // Append the script to the <head> tag
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(script);
    })
    
    }
  
// Call the function to load Bing Maps script with your API key
// loadBingMapsScript();
  
function clearMap() {
    // Dispose the map instance
    if (map) {
        map.dispose();
    }

    // Clear the contents of the element with id 'map'
    var mapElement = document.querySelector('#page');
    mapElement.innerHTML = '';
}
