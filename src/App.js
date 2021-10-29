
import { useState } from 'react';
import './App.css';
//import Footer from './components/Footer/Footer.js';

function App() {

    //geolocalização Google API
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

    // tratamento de erros
    const [error400, setError400] = useState("");
    const [error401, setError401] = useState("");
    const [errorUnexpected, setErrorUnxpected] = useState("");

    //exibe o app
    const [hiddenApp, setHiddenApp] = useState(false);

    // começo da aplicação em JS
    const [buscaCidade, setBuscaCidade] = useState("");

    // recebe os dados da api 
    const [forecast, setForecast] = useState(null);



    // feedback positivo
    const [feedbackPositivo, setFeedbackPositivo] = useState(false);
    const handleFeedback = () => {
        setFeedbackPositivo(true);
    }

    //feedback negativo
    const [feedbackNegativo, setFeedbackNegativo] = useState(false);
    const handleFeedbackNegativo = () => {
        setFeedbackNegativo(true);
    }

    // Searching State
    const [isSearching, setSearching] = useState(false);

    // Logo change
    const [isComplete, setComplete] = useState(null);

    // função que vai manipular o form no modo onchange;
    const handleBuscaCidadeChange = (element) => {
        setBuscaCidade(element.target.value); // obtém o valor digitado 
    }

    //trend cities 
    const [firstCity, setFirstCity] = useState(true);
    const [secondCity, setSecondCity] = useState(true);
    const [thirdCity, setThirdCity] = useState(true);

    const handleFirstTrendCities = () => {
        setFirstCity("Rio de Janeiro");
        setBuscaCidade("Rio de Janeiro");
    }

    const handleSecondTrendCities = () => {
        setSecondCity("Paris");
        setBuscaCidade("Paris");
    }

    const handleThirdTrendCities = () => {
        setThirdCity("Nova York");
        setBuscaCidade("New York");
    }

    //geoposition
    const [geoPosition, setGeoPosition] = useState(null);
    const handleGeoSearch = () => {
        setBuscaCidade(geoPosition);
    }

    //recebe dados da api da previsão do tempo
    const API_URL = process.env.REACT_APP_API_URL
    const API_KEY = process.env.REACT_APP_API_KEY
    const API_LANG = process.env.REACT_APP_API_LANG
    const API_AQI = process.env.REACT_APP_API_AQI
    const API_MOUNT_URL = `${API_URL}key=${API_KEY}&q=${buscaCidade}&aqi=${API_AQI}&lang=${API_LANG}`;

    //searching
    const buscaPrevisaoTempo = () => {
        setComplete(false);
        setFeedbackPositivo(false);
        setFeedbackNegativo(false);
        setSearching(true)
        fetch(API_MOUNT_URL).then((response) => {
            if (response.status === 200) {
                setComplete(true);
                setHiddenApp(true);
                setError401(false);
                setError400(false);
                setErrorUnxpected(false);
                return response.json()
            }
            else if (response.status === 400) {
                setError400(true);
            }
            else if (response.status === 401) {
                setError401(true);
            }
            else {
                setErrorUnxpected(true);
                setComplete(false);
            }
        }).then((data) => {
            setForecast(data);
            setBuscaCidade("");
            setSearching(false);
        });
    }
    //initial State x Back to Initial State
    const [homepage, setHomepage] = useState(false);
    const handleHomepage = () => {
        setHomepage(true);
        setComplete(false);
        setBuscaCidade("");
        setForecast(null);
        setHiddenApp(false);
        setSearching(null);
        setFeedbackPositivo(false);
        setFeedbackNegativo(false);
    }
    // app
    return (
        <>

            <div className={
                error400 || error401 || errorUnexpected ? "animate__animated animate__wobble  app-bloco class-error" :
                    isComplete ? "animate__animated app-bloco " : "app-bloco"
            }>
                <div className="hiddenApp">
                    <div className="app-logo">
                        <div className="icon-logo">
                            {
                                isComplete ? <ion-icon name="cloud-outline"></ion-icon> :
                                    error400 || error401 || errorUnexpected ? <ion-icon name="thunderstorm-outline"></ion-icon> :
                                        <ion-icon name="flash-outline"></ion-icon>

                            }
                        </div>
                        <div className="app-name">Reacast</div>
                    </div>
                    <div className="app-main">
                        <div className="app-main-title">Previsão do Tempo</div>

                        <div className="app-react-form">
                            <input type="text" name="buscaCidade" className="app-input" value={buscaCidade} onChange={handleBuscaCidadeChange} placeholder="Busque por uma cidade"></input>
                            <button onClick={buscaPrevisaoTempo} className="busca-btn">{isSearching ? <ion-icon name="refresh-outline"></ion-icon> : <ion-icon name="search-outline"></ion-icon>}</button>
                        </div>
                    </div>
                    <div className="app-finder-wrapper">
                        <div className="app-finder-title">Ou</div>
                        <div className="app-finder-map">
                            <div className="animate__animated animate__shakeX animate__repeat-3">
                                <ion-icon id="map-search-icon" onClick={handleGeoSearch} value={geoPosition} name="locate-outline"></ion-icon>
                            </div>
                        </div>
                        <div className="app-finder-title">Utilize minha localização atual</div>
                        <span className="sub-title" id={hiddenApp ? "hidden" : "show"} >
                            <div className="app-trends">
                                <ion-icon name="flag-outline"></ion-icon>Trends
                            </div>
                            <div className="app-trends-list">
                                <ul>
                                    <li onClick={handleFirstTrendCities} value={firstCity}><ion-icon name="search-outline"></ion-icon> Rio de Janeiro</li>
                                    <li onClick={handleSecondTrendCities} value={secondCity}><ion-icon name="search-outline"></ion-icon> Paris</li>
                                    <li onClick={handleThirdTrendCities} value={thirdCity}><ion-icon name="search-outline"></ion-icon>Nova York</li>
                                </ul>
                            </div>
                        </span>
                    </div>
                    <div className="app-error-handler">
                        {error400 ? 'Busque por uma localização válida. Erro 400' : null}
                        {error401 ? 'Ocorreu um erro com a API. Erro 401' : null}
                        {errorUnexpected ? 'Erro Inesperado!' : null}
                    </div>
                </div>

                <div className="app-result">

                    {
                        forecast ? (
                            <div className="app-return-wrapper">
                                <div className="app-new-search">
                                    <ion-icon id="clear-app" name="close-outline" value={homepage} onClick={handleHomepage}></ion-icon>
                                </div>
                                <div className="app-return-img"><img alt="imagem" src={forecast.current.condition.icon}></img></div>
                                <div className="app-return-weather strong">{forecast.current.temp_c}°<span id="temp">C</span></div>
                                <div className="app-return-text">{forecast.current.condition.text}</div>
                                <div className="app-return-city">{forecast.location.name}, {forecast.location.country}</div>
                                <div className="app-feedback">localização correta?</div>
                                <div className="app-airport-wrapper"></div>
                                <div className="app-return-thumbs">
                                    {feedbackNegativo ? '' :
                                        <span className={feedbackPositivo ? "animate__animated animate__shakeY" : null}>
                                            <ion-icon id="thumbs-up" value={feedbackPositivo} onClick={handleFeedback} name="thumbs-up-outline"></ion-icon>
                                        </span>
                                    }
                                    <div className="app-feedback">
                                        {
                                            feedbackPositivo ? 'Obrigado por usar o app!' :
                                                feedbackNegativo ? 'Obrigado pelo feedback!' : null
                                        }
                                    </div>
                                    {feedbackPositivo ? '' :
                                        <span className={feedbackNegativo ? "animate__animated animate__shakeY" : null}>
                                            <ion-icon id="thumbs-down" vlaue={feedbackNegativo} onClick={handleFeedbackNegativo} name="thumbs-down-outline"></ion-icon>
                                        </span>
                                    }
                                </div>
                            </div>
                        ) : null
                    }
                </div>

            </div>

        </>
    );
}

export default App;
