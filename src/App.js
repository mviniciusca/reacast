import { useState } from 'react';
import './app.css';

function App() {
    // configurações da api
    const API_URL = 'https://api.weatherapi.com/v1/current.json?';
    const API_KEY = '119b8e810764437390851003212110';
    const API_LANG = 'pt';
    const API_AQI = 'yes';

    // começo da aplicação em JS
    const [BuscaCidade, setBuscaCidade] = useState(""); // função para manipluar o form de busca;

    // recebe os dados da api 

    const [forecast, setForecast] = useState(null) // como é um objeto, pode ser null;

    //recebe os erros da api

    // const [error, setError] = useState(null); // estado de erro

    // feedback positivo

    const [feedbackPositivo, setFeedbackPositivo] = useState(false);
    const handleFeedback = () => {
        console.log('+1');
        setFeedbackPositivo(true);
    }

    //feedback negativo

    const [feedbackNegativo, setFeedbackNegativo] = useState(false);
    const handleFeedbackNegativo = () => {
        console.log('-1');
        setFeedbackNegativo(true);
    }


    // Searching State

    const [isSearching, setSearching] = useState(false);

    // Logo change

    const [isComplete, setComplete] = useState(null);

    // Inicial State

    // função que vai manipular o form no modo onchange;
    const handleBuscaCidadeChange = (element) => {
        setBuscaCidade(element.target.value); // obtém o valor digitado 
    }
    const buscaPrevisaoTempo = () => {

        setSearching(true);
        setComplete(false);
        setFeedbackPositivo(false);
        setFeedbackNegativo(false);

        fetch(`${API_URL}key=${API_KEY}&q=${BuscaCidade}&aqi=${API_AQI}&lang=${API_LANG}`).then((response) => {
            if (response.status === 200) {
                return response.json();
            }
        }).then((data) => {

            setForecast(data);
            setComplete(true);
            setBuscaCidade("");
            setSearching(false);
        });

    }

    // não mexer -> retorna meu app pronto com html
    return (
        <>
            <div className="app-bloco">
                <div className="app-logo">
                    <div className="icon-logo">{isComplete ? <ion-icon name="cloud-done-outline"></ion-icon> : <ion-icon name="cloud-outline"></ion-icon>}</div>
                    <div className="app-name">Rea<strong>c</strong>ast</div>
                </div>
                <div className="app-main">
                    <div className="app-main-title">Busque uma Cidade <span className="sub-title"> <ion-icon name="flag-outline"></ion-icon> Trends: Rio de Janeiro, Tokyo, Paris, Brisbane, Istambul</span></div>
                    <div className="app-react-form">
                        <input type="text" name="buscaCidade" className="app-input" value={BuscaCidade} onChange={handleBuscaCidadeChange} placeholder="Busque por uma cidade"></input>
                        <button onClick={buscaPrevisaoTempo} className="busca-btn">{isSearching ? <ion-icon name="refresh-outline"></ion-icon> : <ion-icon name="search-outline"></ion-icon>}</button>
                    </div>
                </div>
                <div className="app-result">{
                    forecast ? (
                        <div className="app-return-wrapper">
                            <div className="app-return-img"><img alt="imagem" width="60" height="60" src={forecast.current.condition.icon}></img></div>
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
                }</div>
            </div>
        </>
    );
}

export default App;
