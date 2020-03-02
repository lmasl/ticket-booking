function initialize() {

    var line;

    var MinskTokyo = [
        new google.maps.LatLng(53.89, 27.5),
        new google.maps.LatLng(35.652832, 139.839478)
    ];

    var mapOptions = {
        center: MinskTokyo[0],
        zoom: 2,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map( document.getElementById('map-canvas'), mapOptions);

    var lineSymbol = {
        path: 'M 0,-1 0,1',
        strokeOpacity: 1,
        scale: 2
    };

    var scalePlane = 0.0444;

    var planeSymbol = {
        path: 'm30.45799,352.05008l-8.96638,44.82672l54.53683,50.71945l-2.8812,22.87534l-62.42268,-20.64774l-1.75073,11.43457l-1.79976,-11.83707l-62.36403,20.06064l-5.04143,-20.98459l56.0811,-51.85858l-7.79837,-44.93613l0.7507,-100.11948l-19.20056,-9.9201l-165.67706,77.65976l-1.03244,-28.22736l186.66342,-157.55936l0.76558,-94.00015l6.97589,-28.00247l6.68628,-10.54655l6.45442,-3.46302l8.08272,3.19353l5.57077,13.05849l6.44742,26.56583l0,93.07186l185.13046,159.31099l-1.30887,28.2142l-164.90799,-79.27838l-18.91273,8.82553l-0.08223,101.21661',
        scale: scalePlane,
        strokeOpacity: 1,
        strokeColor: 'blue',
        fillColor: '#ff6e2b',
        fillOpacity: 1,
        strokeWeight: 1
    };

    line = new google.maps.Polyline({
        path: MinskTokyo,
        strokeOpacity: 0,
        geodesic: true,
        icons: [{
            icon: lineSymbol,
            offset: '0',
            repeat: '10px'
        }, {
            icon: planeSymbol,
            offset: '0'
        }],
        map: map
    });

    function animateCircle(anime) {
        var count = 0;
        var comingBack = false;

        window.setInterval(function () {

            if (comingBack) {
                count = (count - 1) % 200;
                planeSymbol.rotation = 180;
                planeSymbol.scale = scalePlane;
                if (count == 20) {

                    var countD = setInterval(function () {

                        scalePlane = scalePlane.toFixed(4) - 0.0005;

                        if (scalePlane <= 0.0001) {
                            scalePlane = 0.0444;
                            clearInterval(countD);
                        }

                    }, 5);
                } else if (count == 1) {
                    comingBack = false;
                }
            } else {
                count = (count + 1) % 200;
                planeSymbol.scale = scalePlane;
                planeSymbol.rotation = 0;
                if (count == 0) {
                    comingBack = true;
                    line.icons[0].offset = '100';
                    count = 200;
                } else if (count == 180) {
                    var countD = setInterval(function () {

                        scalePlane = scalePlane.toFixed(4) - 0.0005;

                        if (scalePlane <= 0.0001) {
                            scalePlane = 0.0444;
                            clearInterval(countD);
                        }

                    }, 5);
                }
            }

            var icons = line.get('icons');
            icons[1].offset = (count / 2) + '%';
            line.set('icons', icons);

        }, 20);
    }

    animateCircle(line);

}
google.maps.event.addDomListener(window, 'load', initialize);