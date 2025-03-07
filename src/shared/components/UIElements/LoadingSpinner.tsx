import './LoadingSpinner.css';

const LoadingSpinner = (props) => (
    <div className={`${props.asOverlay && 'center-content loading-spinner__overlay'}`}>
        <div className="lds-dual-ring"></div>
    </div>
);

export default LoadingSpinner;