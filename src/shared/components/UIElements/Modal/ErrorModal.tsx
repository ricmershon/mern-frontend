import { ErrorMessage } from '@/types';
import Modal from './Modal';
import Button from '@/shared/components/FormElements/Button';

interface ErrorModalProps {
    error: ErrorMessage,
    onClear: () => void;
}
const ErrorModal = (props: ErrorModalProps) => (
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