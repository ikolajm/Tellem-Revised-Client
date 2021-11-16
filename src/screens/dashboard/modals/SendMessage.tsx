import { Fragment, useState } from "react"
import { Modal, Button } from "react-bootstrap"
import getPreferredColor from '../../../helpers/dashboard/getColor';

interface IncomingProps {
    show: boolean,
    setShow: any,
    user: any,
    setSelectedUser: any
}

const SendMessageModal: React.FC<IncomingProps> = ({show, setShow, user, setSelectedUser}) => {
    const [messageContent, setMessageContent] = useState('');

    const handleClose = () => {
        setShow(false)
        setTimeout(() => {
            setSelectedUser(null)
        }, 300);
    }

    return (
        <Fragment>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className="send-message-modal"
            >
                <Modal.Header>
                    <Modal.Title>
                        <h1 className="">Message User</h1>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="send-message">
                        {
                            user === null ? '' :
                            <Fragment>
                                {/* User preview */}
                                <div className="user">
                                    <div className="identifier">
                                        <div style={getPreferredColor(user.preferredColor)} className="avatar">
                                            <i className="fas fa-user"></i>
                                        </div>
                                        <div className="two-tier">
                                            <span className="idCode">#{user.idCode}</span>
                                            <span className="name">{user.username}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="message">
                                    <label htmlFor="textarea">Say something to {user.username}:</label>
                                    <textarea placeholder="Type your message here" id="textarea" onChange={(e) => setMessageContent(e.target.value)} value={messageContent} rows={2}></textarea>
                                </div>
                            </Fragment>
                        }
                        </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="cancel" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button className="send-message">Send Message</Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}

export default SendMessageModal;