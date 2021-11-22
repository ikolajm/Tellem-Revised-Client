import {useState, Fragment, useContext, useEffect} from 'react'
import { Link } from 'react-router-dom';
import Loading from "./Loading";
import data from '../../helpers/data/data'
import getPreferredColor from '../../helpers/dashboard/getColor';
import UserContext from '../../context/userContext';
import getMessages from '../../helpers/dashboard/messages/getMessages';
import archiveChat from '../../helpers/dashboard/messages/archiveChat';

export default () => {
    const [loader, setLoader] = useState(true);
    const CurrentUser = useContext(UserContext);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const convos = async () => {
            let request = await getMessages(CurrentUser);
            setConversations(request);
            setLoader(false);
        }

        convos()
    }, [])

    const handleArchive = async (chatId:number) => {
        let query = await archiveChat(CurrentUser, chatId);
        if (query === "SUCCESS") {
            let arr =  [...conversations];
            arr = arr.filter((convo: any) =>  {
                return convo.id !== chatId
            })
            setConversations(arr);
        }
    }

    return (
        <div className="message-list">
            {
                loader === true ?
                    <Loading text="Gathering conversations" /> :
                    <div className="conversations">
                        {
                            conversations.length === 0 ?
                                <div className="empty-messages">
                                    <i className="fas fa-exclamation-circle"></i>
                                    <h1>No messages found!</h1>
                                    <p>It appears your inbox is empty. You can either check your archive for previous messages or create a new conversation with a friend!</p>
                                </div> :
                                <Fragment>
                                        <ul className="labels">
                                            <li className="username">Username:</li>
                                            <li className="preview">Preview:</li>
                                            <li className="action">Action:</li>
                                        </ul>
                                        {
                                            conversations.map((convo:any, index: number) => {
                                                // console.log(convo)
                                                return (
                                                    <div key={index} className="conversation">
                                                        {/* Avatar and name */}
                                                        <div className="identifier">
                                                            <div style={getPreferredColor(convo.backgroundColor)} className="avatar">
                                                                {
                                                                    convo.users.length > 2 ?
                                                                        <i className="fas fa-users"></i> :
                                                                        <i className="fas fa-user"></i>
                                                                }
                                                            </div>
                                                            {
                                                                convo.name !== '' ?
                                                                    <span className="name">{convo.name}</span> :
                                                                    <span className="name">
                                                                        {convo.messages[0].user.uuid === CurrentUser?.uuid ?
                                                                            convo.users.filter((user: any) => {
                                                                                return user.uuid !== CurrentUser?.uuid
                                                                            })[0].username : convo.messages[0].user.username
                                                                        }
                                                                    </span>
                                                            }
                                                        </div>
                                                        {/* Message preview */}
                                                        <div className="message-preview">
                                                            {
                                                                convo.messages[0].user.uuid === CurrentUser?.uuid ?
                                                                    <span>You: </span> : ''
                                                            }
                                                            <span>
                                                                {convo.messages[0].content}
                                                            </span>
                                                        </div>
                                                        {/* Action buttons */}
                                                        <div className="action-buttons">
                                                            <Link to={"/dashboard/messages/" + convo.id.toString()} className="reply">
                                                                <button>
                                                                    <i className="fas fa-reply"></i>
                                                                </button>
                                                            </Link>
                                                            <button onClick={() => handleArchive(convo.id)} className="archive">
                                                                <i className="fas fa-archive"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                </Fragment>
                        }
                    </div>
            }
        </div>
    )
}