import {Fragment, useState} from 'react';
import Loading from "./Loading";
import data from "../../helpers/data/data";
import getPreferredColor from '../../helpers/dashboard/getColor';
import Unfriend from './modals/Unfriend';
import SendMessage from './modals/SendMessage';

export default () => {
    const [loader, setLoader] = useState(true);
    const [friends, setFriends] = useState(data.friendsOfJake);
    // const [friends, setFriends] = useState([])
    const [showUnfriend, setShowUnfriend] = useState(false);
    const [showSendMessage, setShowSendMessage] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null)

    setTimeout(() => {
        setLoader(false)
    }, 1000)

    const toggleSendMessage = (user: any) => {
        setSelectedUser(user);
        setTimeout(() => {
            setShowSendMessage(true);
        }, 300)
    }

    const toggleUnfriend = (user: any) => {
        setSelectedUser(user);
        setTimeout(() => {
            setShowUnfriend(true);
        }, 300)
    }

    return (
        <div className="friends-list">
            {
                loader === true ?
                    <Loading text="Gathering friends" /> :
                    <div className="friends">
                        {
                            friends.length === 0 ?
                                <div className="empty-friend-list">
                                    <i className="fas fa-exclamation-circle"></i>
                                    <h1>No friends found!</h1>
                                    <p>It appears your friend list is empty. Go send a friend request and get chatting!</p>
                                </div> :
                                <Fragment>
                                    <ul className="labels">
                                        <li className="username">Username:</li>
                                        <li className="action">Action:</li>
                                    </ul>
                                    {friends.map((friend:any, index:number) => {
                                        return (
                                            <div key={index} className="friend">
                                                {/* Identifier */}
                                                <div className="identifier">
                                                    <div style={getPreferredColor(friend.preferredColor)} className="avatar">
                                                        <i className="fas fa-user"></i>
                                                    </div>
                                                    <div className="two-tier">
                                                        <span className="idCode">#{friend.idCode}</span>
                                                        <span className="name">{friend.username}</span>
                                                    </div>
                                                </div>
                                                {/* Actions */}
                                                <div className="action-buttons">
                                                    {/* Send Message */}
                                                    <button onClick={() => toggleSendMessage(friend)} className="send-message">
                                                        <i className="fas fa-paper-plane"></i>
                                                    </button>
                                                    {/* Unfriend User */}
                                                    <button onClick={() => toggleUnfriend(friend)} className="unfriend">
                                                        <i className="fas fa-user-slash"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </Fragment>
                        }
                        {/* Unfriend modal */}
                        <Unfriend
                            show={showUnfriend}
                            setShow={setShowUnfriend}
                            user={selectedUser}
                            setSelectedUser={setSelectedUser}
                        />
                        {/* Send message modal */}
                        <SendMessage
                            show={showSendMessage}
                            setShow={setShowSendMessage}
                            user={selectedUser}
                            setSelectedUser={setSelectedUser}
                        />
                    </div>
            }
        </div>
    )
}