import './LoadingSpinner.css';

interface LoadingSpinnerProps {
    asOverlay: boolean;
}

const LoadingSpinner = (props: LoadingSpinnerProps) => (
    <div className={`${props.asOverlay && 'center-content loading-spinner__overlay'}`}>
        <div className="lds-dual-ring"></div>
    </div>
);

export default LoadingSpinner;