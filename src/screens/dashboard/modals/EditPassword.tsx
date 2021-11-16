import getPreferredColor from '../../../helpers/dashboard/getColor';
import { Modal, Button } from 'react-bootstrap';
import { Fragment } from 'react';
import AuthInput from '../../../reusable_components/form/Auth_Input';

interface IncomingProps {
    show: boolean,
    handleClose: any,
    password: string,
    newPassword: string,
    confirmNewPassword: string
    setPassword: any,
    setNewPassword: any,
    setConfirmNewPassword: any
}

const CreateConversationModal: React.FC<IncomingProps> = ({show, handleClose, password, newPassword, confirmNewPassword, setPassword, setNewPassword, setConfirmNewPassword}) => {
    return (
        <Fragment>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className="edit-password"
            >
                <Modal.Header>
                    <Modal.Title>
                        Edit Your Password
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AuthInput 
                        forId="password"
                        incomingFor="password"
                        handleChange={setPassword}
                        label="Password"
                        type="password"
                        value={password}
                    />
                    <AuthInput 
                        forId="newPassword"
                        incomingFor="newPassword"
                        handleChange={setNewPassword}
                        label="New Password"
                        type="password"
                        value={newPassword}
                    />
                    <AuthInput 
                        forId="confirmNewPassword"
                        incomingFor="confirmNewPassword"
                        handleChange={setConfirmNewPassword}
                        label="Confirm New Password"
                        type="password"
                        value={confirmNewPassword}
                    />
                </Modal.Body>
                <Modal.Footer>
                <Button className="cancel" onClick={handleClose}>
                    Cancel
                </Button>
                <Button className="save-password">Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}

export default CreateConversationModal;