import {useState, Fragment, useContext} from 'react'
import UserContext from "../../context/userContext"
import getPreferredColor from "../../helpers/dashboard/getColor";
import {toast} from 'react-toastify';
import { Button, Modal } from 'react-bootstrap';
import data from '../../helpers/data/data';
import ChatDetails from './modals/ChatDetails';
import AddUsersToChatModal from './modals/AddUsersToChat';

export default () => {
    const [conversation, setConversation] = useState(data.conversationList[0]);
    const [input, setInput] = useState('')
    const CurrentUser = useContext(UserContext)
    const [showAddUsersToChat, setShowAddUsersToChat] = useState(false);
    const [showChatDetails, setShowChatDetails] = useState(false);
    const conversationShell = {
        name: conversation.name,
        preferredColor: conversation.preferredColor,
        users: conversation.users,
        type: conversation.type
    }

    const checkMessageAuthor = (message: any) => {
        if (message && message.author.uuid === CurrentUser?.uuid) {
            return 'message-container message-sent'
        } else {
            return 'message-container message-received'
        }
    }

    const scrollToBottom = () => {
        const feed: any = document.querySelector('#feed');
        console.log(feed)
        if (feed !== null && feed.scrollTop !== null && feed.scrollHeight !== null) {
            feed.scrollTop = feed.scrollHeight;
        }
    }

    // .message feed is reversed in order to set scrollTop to the bottom, need to reverse the array server side to reset feed to chronological message order
    return (
        <div className="conversation-container">
            <div className="conversation">
                {/* Fixed head */}
                <div className="head">
                    <div className="chat-details">
                        <div style={getPreferredColor(conversation.preferredColor)} className="avatar">
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
                                conversation.name !== '' ?
                                    <span className="name">{conversation.name}</span> :
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
                    <div className="options">
                        {/* Add users */}
                        <button onClick={() => setShowAddUsersToChat(true)}>
                            <i className="fas fa-user-plus"></i>
                        </button>
                        {/* Chat details */}
                        <button onClick={() => setShowChatDetails(true)}>
                            <i className="fas fa-cog"></i>
                        </button>
                    </div>
                </div>
                {/* Message Feed */}
                <div id="feed" className="message-feed">
                    {
                        conversation.messages.map((message:any, index: number) => {
                            return (
                                <div onLoad={scrollToBottom} key={index} className={checkMessageAuthor(message)}>
                                    <div className="message">
                                        {/* Avatar */}
                                        <div style={getPreferredColor(message.author.preferredColor)} className="avatar">
                                            <i className="fas fa-user"></i>
                                        </div>
                                        <div className="content-container">
                                            <div className="message-header">
                                                {/* Name */}
                                                <div className="two-tier">
                                                    <span className="idCode">#{message.author.idCode}</span>
                                                    <span className="name">{message.author.username}</span>
                                                </div>
                                                {/* Date sent */}
                                                <div className="sent-time">
                                                    <span>{message.createdAt}</span>
                                                </div>
                                            </div>
                                            <div className="content">
                                                <p>{message.content}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                {/* Fixed Footer with textarea */}
                <div className="input-section">
                    <textarea placeholder="Got something to say?" value={input} onChange={(e) => setInput(e.target.value)} rows={2}></textarea>
                    <div className="button-container">
                        <button onClick={scrollToBottom}>
                            <i className="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
            {/* Add users modal */}
            <AddUsersToChatModal
                show={showAddUsersToChat}
                setShowAddUsers={() => setShowAddUsersToChat(false)}
                conversation={conversationShell}
            />
            {/* Chat detail modal */}
            <ChatDetails 
                show={showChatDetails}
                setShowChatDetails={() => setShowChatDetails(false)}
                conversation={conversationShell}
            />
        </div>
    )
}