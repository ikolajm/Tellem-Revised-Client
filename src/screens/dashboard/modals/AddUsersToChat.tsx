import getPreferredColor from '../../../helpers/dashboard/getColor';
import { Modal, Button } from 'react-bootstrap';
import { Fragment, useState, useContext, useEffect } from 'react';
import UserContext from "../../../context/userContext";
import AuthInput from "../../../reusable_components/form/Auth_Input";
import data from "../../../helpers/data/data";
import { toast } from 'react-toastify';
import  getFriends from "../../../helpers/dashboard/friends/getFriends";
import addUserToChat from "../../../helpers/dashboard/conversation/addUserToChat";

interface IncomingProps {
    show: boolean,
    setShowAddUsers: any,
    conversationDetails: any,
    conversationUsers: any,
    setConversationUsers: any
}

const AddUsersToChatModal: React.FC<IncomingProps> = ({show, setShowAddUsers, conversationDetails, conversationUsers, setConversationUsers}) => {
    const CurrentUser = useContext(UserContext);
    const [users,  setUsers] = useState(conversationUsers);
    const [friends, setFriends] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [filter, setFilter] = useState('');
    const [sortedFriends, setSortedFriends]: any = useState([]);

    // Get the friends of the user
    useEffect(() => {
        const friends = async () => {
            let request = await getFriends(CurrentUser);
            let convoUserIds = users.map((user: any) => user.id);
            // Get the request and filter out users already present in chat
            request = request.filter((friend: any) => {
                return !convoUserIds.includes(friend.id);
            })
            setFriends(request);
            setSortedFriends(request);
        }

        friends()
    }, [])
    
    const handleClose = () => {
        setShowAddUsers(false);
        setTimeout(() => {
            setFilter('');
            setSortedFriends([]);
            setSelectedUsers([]);
        }, 300)
    }

    const setFilteredFriends = (value: string) => {
        setFilter(value);
        const filtered = friends.filter((friend: any) => friend.username.toLowerCase().includes(value.toLowerCase()));
        setSortedFriends(filtered)
    }

    const checkCheckedStatus: any = (friendId: number) => {
        let arr: number[] = [...selectedUsers];
        arr = arr.map((user:any) => {
            return user.id
        });
        return arr.includes(friendId) ? "checked" : ""
    }

    const toggleSelected = (friend: any) => {
        const friendId = friend.id;
        const index = selectedUsers.findIndex((user:any) => user.id === friendId);
        // Add user id and push the user model to In chat feedback
        if (index === -1) {
            if (selectedUsers.length < (5 - conversationUsers.length)) {
                let userArr: any = [...selectedUsers];
                userArr.push(friend);
                setSelectedUsers(userArr);
            } else {
                toast.error('You may only have a max of 5 users in a message at a time!')
            }
        // Remove the user and the user model
        } else {
            let userArr = [...selectedUsers];
            userArr.splice(index, 1);
            setSelectedUsers(userArr);
        }
    }

    const handleUserAddition = async () => {
        const conversationId = conversationDetails.id;
        let users = selectedUsers;
        let userIds = users.map((user: any) => user.id);
        console.log(userIds)
        if (userIds.length >= 1) {
            let request = await addUserToChat(CurrentUser, conversationId, userIds);
            if (request.status === "SUCCESS") {
                let temp = [...conversationUsers];
                temp = temp.concat(request.users);
                setConversationUsers(temp);
                handleClose();
            }
        } else {
            toast.error('You must have a user selected to submit a request');
        }
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
                        <div className="two-tier">
                            <h1>Add Users to Chat</h1>
                            <span>{5 - (conversationUsers.length + selectedUsers.length)} slots remain</span>
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Member list */}
                    <div className="selected-user-list">
                        <h1>In chat:</h1>
                        <div className="selected-users">
                            {/* Previously added, not editable */}
                            {
                                conversationUsers.map((user: any, index: number) => {
                                    return (
                                        <div key={index} className="added-user">
                                            <div className="identifier">
                                                <div className="two-tier">
                                                    <span className="idCode">#{user.idCode}</span>
                                                    <span className="name">{user.username}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )

                                })
                            }
                            {
                                selectedUsers.map((user:any, index: number) => {
                                    console.log(user)
                                    return (
                                        <div key={index} className="selected-user">
                                            <div className="identifier">
                                                <div className="two-tier">
                                                    <span className="idCode">#{user.idCode}</span>
                                                    <span className="name">{user.username}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <h1>Add a friend:</h1>
                    {/* Filter */}
                    <div className="filter">
                        <input placeholder="Filter by username" type="text" onChange={(e) => setFilteredFriends(e.target.value)} value={filter} />
                    </div>
                    {/* Friends to add w/Selectors */}
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
                                                            <span onClick={() => toggleSelected(friend)} className="checkmark">
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
                                                                    <span onClick={() => toggleSelected(friend)} className="checkmark">
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
                </Modal.Body>
                <Modal.Footer>
                    <Button className="cancel" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleUserAddition} className="save">Add Users</Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}

export default AddUsersToChatModal