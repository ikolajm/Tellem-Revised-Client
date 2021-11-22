import { Fragment, useState, useContext } from "react";
import CurrentUserContext from "../../../context/userContext";
import { Modal, Button } from "react-bootstrap"
import messageFriend from "../../../helpers/dashboard/friends/messageFriend";
import getPreferredColor from '../../../helpers/dashboard/getColor';
import { useHistory } from "react-router-dom";

interface IncomingProps {
    show: boolean,
    setShow: any,
    user: any,
    setSelectedUser: any
}

const SendMessageModal: React.FC<IncomingProps> = ({show, setShow, user, setSelectedUser}) => {
    const [messageContent, setMessageContent] = useState('');
    let CurrentUser = useContext(CurrentUserContext);
    const history = useHistory();

    const handleClose = () => {
        setShow(false)
        setTimeout(() => {
            setSelectedUser(null)
            setMessageContent('');
        }, 300);
    }

    const handleSendMessage = async () => {
        // Get request
        let request = await messageFriend(CurrentUser, [user.id], messageContent);
        let id = request.conversationId;
        handleClose()
        // On success direct user to the messages screen
        history.push(`/dashboard/messages/${id.toString()}`);
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
                                        <div style={getPreferredColor(user.backgroundColor)} className="avatar">
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
                    <Button  onClick={() => handleSendMessage()} className="send-message">Send Message</Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}

export default SendMessageModal;