import {Fragment, useState, useContext} from 'react';
import Loading from "./Loading";
import data from "../../helpers/data/data";
import getPreferredColor from '../../helpers/dashboard/getColor';
import UserContext from '../../context/userContext';

export default () => {
    const [loader, setLoader] = useState(true);
    const [requests, setRequests] = useState(data.friendRequests);
    const CurrentUser = useContext(UserContext);

    setTimeout(() => {
        setLoader(false);
    }, 1000)
    
    return (
        <div className="request-list">
            {
                loader === true ?
                    <Loading text="Getting friend requests" /> :
                    <div className="requests">
                        {
                            requests.length === 0 ?
                                <div className="empty-request-list">
                                    <i className="fas fa-exclamation-circle"></i>
                                    <h1>No requests found!</h1>
                                    <p>Way to stay on top of your friend requests, now get chatting!</p>
                                </div> :
                                <Fragment>
                                    <ul className="labels">
                                        <li className="type">Type:</li>
                                        <li className="username">Username:</li>
                                        <li className="action">Action:</li>
                                    </ul>
                                    {requests.map((request:any, index:number) => {
                                        // If the request is incoming
                                        return (
                                            <div key={index} className="request">
                                                {
                                                    request.userFrom.uuid !== CurrentUser?.uuid ?
                                                        // Incoming request
                                                        <Fragment>
                                                            <div className="type-identifier">
                                                                <span>Incoming</span>
                                                            </div>

                                                            <div className="identifier">
                                                                <div style={getPreferredColor(request.userFrom.preferredColor)} className="avatar">
                                                                    <i className="fas fa-user"></i>
                                                                </div>
                                                                <div className="two-tier">
                                                                    <span className="idCode">#{request.userFrom.idCode}</span>
                                                                    <span className="name">{request.userFrom.username}</span>
                                                                </div>
                                                            </div>
                                                            {/* Actions */}
                                                            <div className="action-buttons">
                                                                {/* Accept request */}
                                                                <button className="accept">
                                                                    <i className="fas fa-check"></i>
                                                                </button>
                                                                {/* Decline request */}
                                                                <button className="decline">
                                                                    <i className="fas fa-times"></i>
                                                                </button>
                                                            </div>
                                                        </Fragment> :
                                                        // Outgoing request
                                                        <Fragment>
                                                            <div className="type-identifier">
                                                                <span>Outgoing</span>
                                                            </div>
                                                            <div className="identifier">
                                                                <div style={getPreferredColor(request.userTo.preferredColor)} className="avatar">
                                                                    <i className="fas fa-user"></i>
                                                                </div>
                                                                <div className="two-tier">
                                                                    <span className="idCode">#{request.userTo.idCode}</span>
                                                                    <span className="name">{request.userTo.username}</span>
                                                                </div>
                                                            </div>
                                                            {/* Actions */}
                                                            <div className="action-buttons">
                                                                {/* Cancel request */}
                                                                <button className="cancel-request">
                                                                    <i className="fas fa-ban"></i>
                                                                </button>
                                                            </div>
                                                        </Fragment> 
                                                }
                                            </div>
                                        )
                                    })}
                                </Fragment>
                        }
                    </div>
            }
        </div>
    )
}