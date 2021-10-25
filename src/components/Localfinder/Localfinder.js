import React, { Component } from 'react'



export class Localfinder extends Component {


    render() {

        window.onload = function () {
            var startPos;
            var geoSuccess = function (position) {
                startPos = position;
                const latitude = startPos.coords.latitude;
                const longitude = startPos.coords.longitude;

                console.log(latitude);
                console.log(longitude);
            };
            navigator.geolocation.getCurrentPosition(geoSuccess);
        };
        return (
            <div>

                <div class="app-finder-wrapper">
                    <div class="app-finder-title">Ou</div>

                    <div class="app-finder-map"><ion-icon name="map-outline"></ion-icon></div>
                    <div class="app-finder-title">Utilize minha localização atual</div>

                    <span className="sub-title">

                        <div class="app-trends">  <ion-icon name="flag-outline"></ion-icon>Trends</div>
                        <div class="app-trends-list">
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
}

export default Localfinder
