
function Feedback() {
    return (
        <div className="app-return-thumbs">
            <ion-icon id="thumbs-up" value={feedbackPositivo} onClick={handleFeedback} name="thumbs-up-outline"></ion-icon>
            <div className="app-feedback"></div>
            <ion-icon id="thumbs-down" vlaue={feedbackNegativo} onClick={handleFeedbackNegativo} name="thumbs-down-outline"></ion-icon>
        </div>
    );
}


export default Feedback;