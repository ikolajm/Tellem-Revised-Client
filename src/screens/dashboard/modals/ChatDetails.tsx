import getPreferredColor from '../../../helpers/dashboard/getColor';
import { Modal, Button } from 'react-bootstrap';
import { Fragment, useState, useContext } from 'react';
import UserContext from "../../../context/userContext";
import AuthInput from "../../../reusable_components/form/Auth_Input";

interface IncomingProps {
    show: boolean,
    setShowChatDetails: any,
    conversation: any
}

const ChatDetails: React.FC<IncomingProps> = ({show, setShowChatDetails, conversation}) => {
    const [preferredColor, setPreferredColor] = useState(conversation.preferredColor);
    const [name, setName] = useState(conversation.name);
    const CurrentUser = useContext(UserContext);

    const checkColorSelection = (color:string) => {
        if(color === preferredColor) {
            return `color-option ${color} selected`;
        } else {
            return `color-option ${color}`;
        }
    }

    const handleClose = () => {
        setShowChatDetails(false)
        setTimeout(() => {
            setName(conversation.name)
            setPreferredColor(conversation.preferredColor)
        }, 300)
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
                            <div style={getPreferredColor(preferredColor)} className="avatar">
                                {
                                    conversation.type === 'group' ?
                                        <i className="fas fa-users"></i> :
                                        <i className="fas fa-user"></i>
                                }
                            </div>
                            <div className="two-tier">
                                {/* Members */}
                                <span className="user-count">{conversation.users.length} members</span>
                                {/* Name */}
                                {
                                    name !== '' ?
                                        <span className="name">{name}</span> :
                                        <span className="name">
                                            {
                                                conversation.type === 'group' ?
                                                    'Group Message' :
                                                    <Fragment>
                                                        {
                                                            conversation.users.filter((user: any) => {
                                                                return user.uuid !== CurrentUser?.uuid
                                                            })[0].username
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
                                <div onClick={() => setPreferredColor('red')} className={checkColorSelection('red')}>
                                    <i className="fas fa-check"></i>
                                </div>
                                <div onClick={() => setPreferredColor('blue')} className={checkColorSelection('blue')}>
                                    <i className="fas fa-check"></i>
                                </div>
                                <div onClick={() => setPreferredColor('green')} className={checkColorSelection('green')}>
                                    <i className="fas fa-check"></i>
                                </div>
                                <div onClick={() => setPreferredColor('orange')} className={checkColorSelection('orange')}>
                                    <i className="fas fa-check"></i>
                                </div>
                            </div>
                            <div className="color-row">
                                <div onClick={() => setPreferredColor('darkslategrey')} className={checkColorSelection('darkslategrey')}>
                                    <i className="fas fa-check"></i>
                                </div>
                                <div onClick={() => setPreferredColor('purple')} className={checkColorSelection('purple')}>
                                    <i className="fas fa-check"></i>
                                </div>
                                <div onClick={() => setPreferredColor('pink')} className={checkColorSelection('pink')}>
                                    <i className="fas fa-check"></i>
                                </div>
                                <div onClick={() => setPreferredColor('brown')} className={checkColorSelection('brown')}>
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
                    <Button className="save">Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}

export default ChatDetails;