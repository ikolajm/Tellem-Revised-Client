import {useState, Fragment, useContext} from 'react'
import { Link } from 'react-router-dom';
import Loading from "./Loading";
import data from '../../helpers/data/data'
import getPreferredColor from '../../helpers/dashboard/getColor';
import UserContext from '../../context/userContext';

export default () => {
    const [loader, setLoader] = useState(true);
    const CurrentUser = useContext(UserContext);
    const conversations = data.conversationList;
    // const conversations: any = [];

    setTimeout(() => {
        setLoader(false);
    }, 1000)

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
                                                            <div style={getPreferredColor(convo.preferredColor)} className="avatar">
                                                                {
                                                                    convo.type === 'group' ?
                                                                        <i className="fas fa-users"></i> :
                                                                        <i className="fas fa-user"></i>
                                                                }
                                                            </div>
                                                            {
                                                                convo.name !== '' ?
                                                                    <span className="name">{convo.name}</span> :
                                                                    <span className="name">
                                                                        {convo.messages[convo.messages.length - 1].author.username}
                                                                    </span>
                                                            }
                                                        </div>
                                                        {/* Message preview */}
                                                        <div className="message-preview">
                                                            {
                                                                convo.messages[convo.messages.length - 1].author.uuid === CurrentUser?.uuid ?
                                                                    <span>You: </span> : ''
                                                            }
                                                            <span>
                                                                {convo.messages[convo.messages.length - 1].content}
                                                            </span>
                                                        </div>
                                                        {/* Action buttons */}
                                                        <div className="action-buttons">
                                                            {/* <Link to={"/dashboard/messages/" + convo.uuid.toString()} className="reply">
                                                                <button>
                                                                    <i className="fas fa-reply"></i>
                                                                </button>
                                                            </Link> */}
                                                            <button className="unarchive">
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