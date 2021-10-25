import { useState } from 'react';



function Localfinder() {


    const [geoPosition, setGeoPosition] = useState(null);
    const handleGeoSearch = () => {
        console.log('Acionada localização', geoPosition);

    }

    window.onload = function () {
        var startPos;
        var geoSuccess = function (position) {
            startPos = position;
            const latitude = startPos.coords.latitude;
            const longitude = startPos.coords.longitude;

            const geoPositionSetter = latitude + ',' + longitude;
            setGeoPosition(geoPositionSetter);
        };
        navigator.geolocation.getCurrentPosition(geoSuccess);
    };

    return (
        <div>

            <div className="app-finder-wrapper">
                <div className="app-finder-title">Ou</div>
                <div className="app-finder-map">
                    <ion-icon id="map-search-icon" onClick={handleGeoSearch} value={geoPosition} name="map-outline"></ion-icon>
                </div>
                <div className="app-finder-title">Utilize minha localização atual</div>
                <span className="sub-title">
                    <div className="app-trends">
                        <ion-icon name="flag-outline"></ion-icon>Trends
                    </div>
                    <div className="app-trends-list">
                        <ul>
                            <li><ion-icon name="search-outline"></ion-icon> Rio de Janeiro</li>
                            <li><ion-icon name="search-outline"></ion-icon> Paris</li>
                            <li><ion-icon name="search-outline"></ion-icon>Istambul</li>
                        </ul>
                    </div>
                </span>
            </div>

        </div>
    )

}

export default Localfinder
