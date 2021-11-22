import {useState, Fragment, useContext, useEffect} from 'react'
import { Link } from 'react-router-dom';
import Loading from "./Loading";
import data from '../../helpers/data/data'
import getPreferredColor from '../../helpers/dashboard/getColor';
import UserContext from '../../context/userContext';
import getArchive from '../../helpers/dashboard/messages/getArchive';
import unarchiveChat from '../../helpers/dashboard/messages/unarchiveChat';

export default () => {
    const [loader, setLoader] = useState(true);
    const CurrentUser = useContext(UserContext);
    const [conversations, setConversations] = useState([]);
    // const conversations: any = [];

    useEffect(() => {
        const archive = async () => {
            let request = await getArchive(CurrentUser);
            setConversations(request);
            setLoader(false);
        }

        archive()
    }, [])

    const handleUnarchive = async (chatId:number) => {
        let query = await unarchiveChat(CurrentUser, chatId);
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
                    <Loading text="Retrieving archives" /> :
                    <div className="conversations">
                        {
                            conversations.length === 0 ?
                                <div className="empty-messages">
                                    <i className="fas fa-exclamation-circle"></i>
                                    <h1>No archives found!</h1>
                                    <p>It appears your archive is empty. Check your inbox to see if what you're looking for is there.</p>
                                </div> :
                                <Fragment>
                                        <ul className="labels">
                                            <li className="username">Username:</li>
                                            <li className="preview">Preview:</li>
                                            <li className="action">Action:</li>
                                        </ul>
                                        {
                                            conversations.map((convo:any, index: number) => {
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
                                                            <button onClick={() => handleUnarchive(convo.id)} className="unarchive">
                                                                <i className="fas fa-box-open"></i>
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