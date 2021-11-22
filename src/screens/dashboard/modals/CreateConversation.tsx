import getPreferredColor from '../../../helpers/dashboard/getColor';
import { Modal, Button } from 'react-bootstrap';
import { Fragment, useState } from 'react';

interface IncomingProps {
    show: boolean,
    handleClose: any,
    selected: string[],
    setFilteredFriends: any,
    filter: string,
    sortedFriends: any[],
    checkCheckedStatus: any,
    toggleSelected: any,
    friends: any[],
    handleCreateConversation: any
}

const CreateConversationModal: React.FC<IncomingProps> = ({show, handleClose, selected, setFilteredFriends, filter, sortedFriends, checkCheckedStatus, toggleSelected, friends, handleCreateConversation}) => {
    const [messageContent, setMessageContent] = useState('');
    
    return (
        <Fragment>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className="create-conversation"
            >
                <Modal.Header>
                    <Modal.Title>
                        <div className="two-tier">
                            <h1 className="">Add friends</h1>
                            <span>You can add {5 - selected.length} more friends</span>
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="filter">
                        <input placeholder="Filter by username" type="text" onChange={(e) => setFilteredFriends(e.target.value)} value={filter} />
                    </div>
                    <div className="friends-list">
                        {
                            // If user is using the filter
                            filter.length > 0 ?
                                // Null sorted
                                <Fragment>
                                    {
                                        sortedFriends.length === 0 ?
                                            <div className="not-found">
                                                <i className="fas fa-search"></i>
                                                <span>No friends found.</span>
                                            </div> :
                                            // Sorted w/value
                                            sortedFriends.map((friend: any, index: number) => {
                                                return (
                                                    <div key={index} className="selectable">
                                                        {/* Avatar and name */}
                                                        <div className="identifier">
                                                            <div style={getPreferredColor(friend.backgroundColor)} className="avatar">
                                                                <i className="fas fa-user"></i>
                                                            </div>
                                                            <div className="two-tier">
                                                                <span className="idCode">#{friend.idCode}</span>
                                                                <span className="name">{friend.username}</span>
                                                            </div>
                                                        </div>
                                                        {/* Select */}
                                                        <div className="select">
                                                            <input type="checkbox" checked={checkCheckedStatus(friend.id)} />
                                                            <span onClick={() => toggleSelected(friend.id)} className="checkmark">
                                                                <i className="fas fa-check"></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                    }
                                </Fragment> :
                                // User isn't using filter
                                <Fragment>
                                    {
                                        friends.length === 0 ?
                                            <div className="not-found">
                                                <i className="fas fa-search"></i>
                                                <span>No friends found.</span>
                                            </div> :
                                            <Fragment>
                                                {
                                                    friends.map((friend: any, index: number) => {
                                                        return (
                                                            <div key={index} className="selectable">
                                                                {/* Avatar and name */}
                                                                <div className="identifier">
                                                                    <div style={getPreferredColor(friend.backgroundColor)} className="avatar">
                                                                        <i className="fas fa-user"></i>
                                                                    </div>
                                                                    <div className="two-tier">
                                                                        <span className="idCode">#{friend.idCode}</span>
                                                                        <span className="name">{friend.username}</span>
                                                                    </div>
                                                                </div>
                                                                {/* Select */}
                                                                <div className="select">
                                                                    <input type="checkbox" checked={checkCheckedStatus(friend.id)} />
                                                                    <span onClick={() => toggleSelected(friend.id)} className="checkmark">
                                                                        <i className="fas fa-check"></i>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </Fragment>
                                    }
                                </Fragment>
                            }
                        </div>
                        <div className="message">
                            <label htmlFor="textarea">Open with a message:</label>
                            <textarea placeholder="Type your message here" id="textarea" onChange={(e) => setMessageContent(e.target.value)} value={messageContent} rows={2}></textarea>
                        </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="cancel" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={() => handleCreateConversation(messageContent)} variant="primary">Say Hi!</Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}

export default CreateConversationModal;