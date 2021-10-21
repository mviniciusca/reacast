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

    // Searching State

    const [isSearching, setSearching] = useState(false);

    // função que vai manipular o form no modo onchange;
    const handleBuscaCidadeChange = (element) => {
        setBuscaCidade(element.target.value); // obtém o valor digitado 
    }
    const buscaPrevisaoTempo = () => {
        setSearching(true);
        fetch(`${API_URL}key=${API_KEY}&q=${BuscaCidade}&aqi=${API_AQI}&lang=${API_LANG}`).then((response) => {
            if (response.status === 200) {
                return response.json();
            }
        }).then((data) => {
            setSearching(false);
            setForecast(data);
        });
    }

    // não mexer -> retorna meu app pronto com html
    return (
        <>
            <div className="app-bloco animate__animated  animate__fadeInUp">
                <div className="app-logo">
                    <div className="icon-logo"><ion-icon name="cloud-outline"></ion-icon></div>
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
                            <div className="app-return-img"><img alt="imagem" width="80" height="80" src={forecast.current.condition.icon}></img></div>
                            <div className="app-return-text">{forecast.current.condition.text}</div>
                            <div className="app-return-city">{forecast.location.name}</div>
                            <div className="app-return-country">{forecast.location.country}</div>
                        </div>
                    ) : null
                }</div>
            </div>
        </>
    );
}

export default App;
