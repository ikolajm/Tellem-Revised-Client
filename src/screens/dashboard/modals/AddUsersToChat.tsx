import getPreferredColor from '../../../helpers/dashboard/getColor';
import { Modal, Button } from 'react-bootstrap';
import { Fragment, useState, useContext } from 'react';
import UserContext from "../../../context/userContext";
import AuthInput from "../../../reusable_components/form/Auth_Input";
import data from "../../../helpers/data/data";
import { toast } from 'react-toastify';

interface IncomingProps {
    show: boolean,
    setShowAddUsers: any,
    conversation: any
}

const AddUsersToChatModal: React.FC<IncomingProps> = ({show, setShowAddUsers, conversation}) => {
    const setFriendList: any = (friends: any) => {
        let arr = [];
        let currentUserUuids = conversation.users.map((user: any) => {
            return user.uuid;
        });
        // console.log(currentUserUuids)
        arr = friends.filter((friend: any) => {
            if (!currentUserUuids.includes(friend.uuid)) {
                return friend;
            }
        })
        return arr
    }
    const [friends, setFriends] = useState(setFriendList(data.friendsOfJake));
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [filter, setFilter] = useState('');
    const [sortedFriends, setSortedFriends]: any = useState([]);
    
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

    const checkCheckedStatus: any = (friendUuid: string) => {
        let arr: string[] = [...selectedUsers];
        arr = arr.map((user:any) => {
            return user.uuid
        });
        return arr.includes(friendUuid) ? "checked" : ""
    }

    const toggleSelected = (friend: any) => {
        const friendUuid = friend.uuid;
        const index = selectedUsers.findIndex((user:any) => user.uuid === friendUuid);
        // console.log(friendUuid, selected, index)
        // Add user id and push the user model to In chat feedback
        if (index === -1) {
            if (selectedUsers.length < (5 - conversation.users.length)) {
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
                            <span>{5 - (conversation.users.length + selectedUsers.length)} slots remain</span>
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
                                conversation.users.map((user: any, index: number) => {
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
                                                            <div style={getPreferredColor(friend.preferredColor)} className="avatar">
                                                                <i className="fas fa-user"></i>
                                                            </div>
                                                            <div className="two-tier">
                                                                <span className="idCode">#{friend.idCode}</span>
                                                                <span className="name">{friend.username}</span>
                                                            </div>
                                                        </div>
                                                        {/* Select */}
                                                        <div className="select">
                                                            <input type="checkbox" checked={checkCheckedStatus(friend.uuid)} />
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
                                                                    <div style={getPreferredColor(friend.preferredColor)} className="avatar">
                                                                        <i className="fas fa-user"></i>
                                                                    </div>
                                                                    <div className="two-tier">
                                                                        <span className="idCode">#{friend.idCode}</span>
                                                                        <span className="name">{friend.username}</span>
                                                                    </div>
                                                                </div>
                                                                {/* Select */}
                                                                <div className="select">
                                                                    <input type="checkbox" checked={checkCheckedStatus(friend.uuid)} />
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
                    <Button className="save">Add Users</Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}

export default AddUsersToChatModal