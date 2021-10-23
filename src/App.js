import { useState } from 'react';
import './App.css';
import Footer from './components/Footer/Footer.js';

function App() {


    //recebe dados da api da previsão do tempo

    const API_URL = process.env.REACT_APP_API_URL
    const API_KEY = process.env.REACT_APP_API_KEY
    const API_LANG = process.env.REACT_APP_API_LANG
    const API_AQI = process.env.REACT_APP_API_AQI

    //exibe o app
    const [hiddenApp, setHiddenApp] = useState(false);

    // Initial State 

    const [homepage, setHomepage] = useState(false);
    const handleHomepage = () => {
        setHomepage(true);
    }

    // começo da aplicação em JS
    const [buscaCidade, setBuscaCidade] = useState("");

    // recebe os dados da api 
    const [forecast, setForecast] = useState(null)

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
    const buscaPrevisaoTempo = () => {

        setComplete(false);
        setFeedbackPositivo(false);
        setFeedbackNegativo(false);
        setSearching(true)

        fetch(`${API_URL}key=${API_KEY}&q=${buscaCidade}&aqi=${API_AQI}&lang=${API_LANG}`).then((response) => {

            if (response.status === 200) {
                setComplete(true);
                setHiddenApp(true);
                return response.json()
            }
            else if (response.status === 400) {

                //handle erros 400 aqui

            }
            else if (response.status === 500) {

                //handle erros 500 aqui

            }
            else {

                //handle erros gerais aqui

                setComplete(false);
            }
        }).then((data) => {
            setForecast(data);
            setBuscaCidade("");
            setSearching(false);
        })
    }

    // não mexer -> retorna meu app pronto com html
    return (
        <>

            <div className="app-bloco">
                <div className="hiddenApp" id={hiddenApp ? "hidden" : "main-app"}>
                    <div className="app-logo">
                        <div className="icon-logo">{isComplete ? <ion-icon name="cloud-done-outline"></ion-icon> : <ion-icon name="cloud-outline"></ion-icon>}</div>
                        <div className="app-name">Rea<strong>c</strong>ast</div>
                    </div>
                    <div className="app-main">
                        <div className="app-main-title">Busque uma Cidade <span className="sub-title"> <ion-icon name="flag-outline"></ion-icon> Trends: Rio de Janeiro, Tokyo, Paris, Brisbane, Istambul</span></div>
                        <div className="app-react-form">
                            <input type="text" name="buscaCidade" className="app-input" value={buscaCidade} onChange={handleBuscaCidadeChange} placeholder="Busque por uma cidade"></input>
                            <button onClick={buscaPrevisaoTempo} className="busca-btn">{isSearching ? <ion-icon name="refresh-outline"></ion-icon> : <ion-icon name="search-outline"></ion-icon>}</button>
                        </div>
                    </div>
                    <div className="app-error-handler"></div>
                </div>

                <div className="app-result" id={hiddenApp ? "show" : "hidden"} >{
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
                            <div className="app-return-thumbs">
                                {feedbackNegativo ? '' :
                                    <ion-icon id="thumbs-up" value={feedbackPositivo} onClick={handleFeedback} name="thumbs-up-outline"></ion-icon>
                                }

                                <div className="app-feedback">
                                    {feedbackPositivo ? 'Obrigado por usar o app' : ''}
                                    {feedbackNegativo ? 'Desculpe-nos! Obrigado pelo feedback!' : ''}
                                </div>
                                {feedbackPositivo ? '' :
                                    <ion-icon id="thumbs-down" vlaue={feedbackNegativo} onClick={handleFeedbackNegativo} name="thumbs-down-outline"></ion-icon>
                                }
                            </div>
                        </div>
                    ) : null
                }
                </div>

            </div>
            <Footer></Footer>

        </>
    );
}

export default App;
