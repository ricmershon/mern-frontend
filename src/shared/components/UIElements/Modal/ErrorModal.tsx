import Modal from './Modal';
import Button from '@/shared/components/FormElements/Button';

const ErrorModal = (props) => (
    <Modal
        onCancel={props.onClear}
        header="An Error Occurred!"
        show={!!props.error}
        footer={<Button onClick={props.onClear}>Okay</Button>}
    >
        <p>{props.error}</p>
    </Modal>
);

export default ErrorModal;