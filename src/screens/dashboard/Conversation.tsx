import {useState, Fragment, useContext, useEffect} from 'react'
import UserContext from "../../context/userContext"
import getPreferredColor from "../../helpers/dashboard/getColor";
import {toast} from 'react-toastify';
import { Button, Modal } from 'react-bootstrap';
import data from '../../helpers/data/data';
import ChatDetails from './modals/ChatDetails';
import AddUsersToChatModal from './modals/AddUsersToChat';
import Loading from './Loading';
import { useParams } from "react-router-dom"
import getSingleChat from '../../helpers/dashboard/conversation/getSingleChat';
import moment from "moment"
import sendMessageToChat from '../../helpers/dashboard/conversation/sendMessageToChat';
import appendMessageToFeed from '../../helpers/dashboard/conversation/appendMessageToFeed';
import socketPlugin from "../../helpers/dashboard/conversation/socketPlugin";

export default () => {
    const [loader, setLoader] = useState(true);
    const [conversationDetails, setConversationDetails] = useState({
        name: '',
        username: '',
        backgroundColor: '',
        id: 0,
        uuid: ''
    })
    const [conversationUsers, setConversationUsers]: any = useState([])
    const [conversationMessages, setConversationMessages] = useState([])
    const [input, setInput] = useState('')
    const CurrentUser = useContext(UserContext)
    const [showAddUsersToChat, setShowAddUsersToChat] = useState(false);
    const [showChatDetails, setShowChatDetails] = useState(false);
    let { id }: any = useParams();

    useEffect(() => {
        const convo = async () => {
            let request = await getSingleChat(CurrentUser, id);
            setConversationDetails(request.conversation);
            setConversationUsers(request.users);
            // Flip around order of messages and sets for display purposes
            let messages = request.messages;
            // messages.reverse()
            messages.forEach((set: any) => {
                // set.messages.reverse()
            })
            setConversationMessages(messages);
            setLoader(false);
        }

        convo()
        scrollToBottom()
    }, [])

    const checkMessageAuthor = (message: any) => {
        if (message && message.user.uuid === CurrentUser?.uuid) {
            return 'message-container message-sent'
        } else {
            return 'message-container message-received'
        }
    }

    const scrollToBottom = () => {
        const feed: any = document.querySelector('#feed');
        // console.log(feed)
        if (feed !== null && feed.scrollTop !== null && feed.scrollHeight !== null) {
            feed.classList.remove('sticky-bottom')
            feed.scrollTop = feed.scrollHeight;
        }
    }

    const handleMessageSend = async () => {
        const request = await sendMessageToChat(CurrentUser, input, conversationDetails.id);
        if (request.status === "SUCCESS") {
            let newFeed: any = await appendMessageToFeed(request.message, conversationMessages);
            setConversationMessages(newFeed);
            setInput('')
            sendMessage(newFeed);
            scrollToBottom();
        }
    }

    const receieveMessage = async (newFeed: any) => {
        setConversationMessages(newFeed);
        scrollToBottom()
    }
    // Receive message
    const { sendMessage } = socketPlugin(conversationDetails.id, receieveMessage);

    // .message feed is reversed in order to set scrollTop to the bottom, need to reverse the array server side to reset feed to chronological message order
    return (
        <div className="conversation-container">
            {
                loader ?
                    <Loading text="Retrieving chat details..." /> :
                    <div className="conversation">
                        {/* Fixed head */}
                        <div className="head">
                            <div className="chat-details">
                                <div style={getPreferredColor(conversationDetails.backgroundColor)} className="avatar">
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
                                        conversationDetails.name !== '' ?
                                            <span className="name">{conversationDetails.name}</span> :
                                            <span className="name">
                                                {
                                                    conversationUsers.length > 2 ?
                                                        'Group Message' :
                                                        <Fragment>
                                                            {
                                                                conversationUsers.filter((user: any) => {
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
                            {conversationMessages.map((set:any, index: number) => {
                                return (
                                    <Fragment>
                                        <div className="set-headers">
                                            <div className="line"></div>
                                            <div className="date"><span>{set.date}</span></div>
                                        </div>
                                        {
                                            set.messages.map((message:any, index: number) => {
                                                return (
                                                    <div  key={index} className={checkMessageAuthor(message)}>
                                                        <div className="message">
                                                            {/* Avatar */}
                                                            <div style={getPreferredColor(message.user.backgroundColor)} className="avatar">
                                                                <i className="fas fa-user"></i>
                                                            </div>
                                                            <div className="content-container">
                                                                <div className="message-header">
                                                                    {/* Name */}
                                                                    <div className="two-tier">
                                                                        <span className="idCode">#{message.user.idCode}</span>
                                                                        <span className="name">{message.user.username}</span>
                                                                    </div>
                                                                    {/* Date sent */}
                                                                    <div className="sent-time">
                                                                        <span>{moment(message.createdAt).format("LT")}</span>
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

                                    </Fragment>
                                )
                            })}
                        </div>
                        {/* Fixed Footer with textarea */}
                        <div className="input-section">
                            <textarea placeholder="Got something to say?" value={input} onChange={(e) => setInput(e.target.value)} rows={2}></textarea>
                            <div className="button-container">
                                <button onClick={handleMessageSend}>
                                    <i className="fas fa-paper-plane"></i>
                                </button>
                            </div>
                        </div>
                    </div>

            }
            {/* Add users modal */}
            <AddUsersToChatModal
                show={showAddUsersToChat}
                setShowAddUsers={() => setShowAddUsersToChat(false)}
                conversationDetails={conversationDetails}
                conversationUsers={conversationUsers}
                setConversationUsers={setConversationUsers}
            />
            {/* Chat detail modal */}
            {
                showChatDetails ?
                    <ChatDetails 
                        show={showChatDetails}
                        setShowChatDetails={() => setShowChatDetails(false)}
                        conversationDetails={conversationDetails}
                        conversationUsers={conversationUsers}
                        setConversationDetails={setConversationDetails}
                    />: ''
            }
        </div>
    )
}