import getPreferredColor from '../../../helpers/dashboard/getColor';
import { Modal, Button } from 'react-bootstrap';
import { Fragment, useState, useContext, useEffect } from 'react';
import UserContext from "../../../context/userContext";
import AuthInput from "../../../reusable_components/form/Auth_Input";
import saveChatChanges from  "../../../helpers/dashboard/conversation/saveChatChanges";

interface IncomingProps {
    show: boolean,
    setShowChatDetails: any,
    conversationDetails: any,
    conversationUsers: any,
    setConversationDetails: any
}

const ChatDetails: React.FC<IncomingProps> = ({show, setShowChatDetails, conversationDetails, conversationUsers, setConversationDetails}) => {
    const [backgroundColor, setBackgroundColor] = useState(conversationDetails.backgroundColor);
    const [name, setName] = useState(conversationDetails.name);
    const CurrentUser = useContext(UserContext);

    const checkColorSelection = (color:string) => {
        if(color === backgroundColor) {
            return `color-option ${color} selected`;
        } else {
            return `color-option ${color}`;
        }
    }

    const handleClose = () => {
        setShowChatDetails(false)
        setTimeout(() => {
            setName(conversationDetails.name)
            setBackgroundColor(conversationDetails.backgroundColor)
        }, 300)
    }

    const handleSaveChanges = async ()=>  {
        let request = await saveChatChanges(CurrentUser, conversationDetails.id, name, backgroundColor, conversationDetails);
        setConversationDetails(request)
        handleClose();
    }
    
    return (
        <Fragment>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className="chat-details"
            >
                <Modal.Header>
                    <Modal.Title>
                        <h1 className="">Chat Details</h1>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="head">
                        <div className="details">
                            <div style={getPreferredColor(backgroundColor)} className="avatar">
                                {
                                    conversationUsers.length > 2 ?
                                        <i className="fas fa-users"></i> :
                                        <i className="fas fa-user"></i>
                                }
                            </div>
                            <div className="two-tier">
                                {/* Members */}
                                <span className="user-count">{conversationUsers.length} members</span>
                                {/* Name */}
                                {
                                    name !== '' ?
                                        <span className="name">{name}</span> :
                                        <span className="name">
                                            {
                                                conversationUsers.length > 2 ?
                                                    'Group Message' :
                                                    <Fragment>
                                                        {
                                                            conversationUsers.filter((user: any) => {
                                                                return user.uuid !== CurrentUser?.uuid
                                                            })[0]
                                                        }
                                                    </Fragment>
                                            }
                                        </span>
                                }
                            </div>
                        </div>
                    </div>
                    <form className="edit-forms">
                        <h1>Edit Details</h1>
                        <AuthInput 
                            forId="name"
                            incomingFor="name"
                            handleChange={setName}
                            label="Chat Name"
                            type="text"
                            value={name}
                        />
                        <div className="preferredBackground">
                            <label htmlFor="">Preferred Color:</label>
                            <div className="color-row">
                                <div onClick={() => setBackgroundColor('red')} className={checkColorSelection('red')}>
                                    <i className="fas fa-check"></i>
                                </div>
                                <div onClick={() => setBackgroundColor('blue')} className={checkColorSelection('blue')}>
                                    <i className="fas fa-check"></i>
                                </div>
                                <div onClick={() => setBackgroundColor('green')} className={checkColorSelection('green')}>
                                    <i className="fas fa-check"></i>
                                </div>
                                <div onClick={() => setBackgroundColor('orange')} className={checkColorSelection('orange')}>
                                    <i className="fas fa-check"></i>
                                </div>
                            </div>
                            <div className="color-row">
                                <div onClick={() => setBackgroundColor('darkslategrey')} className={checkColorSelection('darkslategrey')}>
                                    <i className="fas fa-check"></i>
                                </div>
                                <div onClick={() => setBackgroundColor('purple')} className={checkColorSelection('purple')}>
                                    <i className="fas fa-check"></i>
                                </div>
                                <div onClick={() => setBackgroundColor('pink')} className={checkColorSelection('pink')}>
                                    <i className="fas fa-check"></i>
                                </div>
                                <div onClick={() => setBackgroundColor('brown')} className={checkColorSelection('brown')}>
                                    <i className="fas fa-check"></i>
                                </div>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="cancel" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={() => handleSaveChanges()} className="save">Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}

export default ChatDetails;