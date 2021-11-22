import {Fragment, useState, useContext, useEffect} from 'react';
import Loading from "./Loading";
import data from "../../helpers/data/data";
import getPreferredColor from '../../helpers/dashboard/getColor';
import UserContext from '../../context/userContext';
import getRequests from "../../helpers/dashboard/friends/getPending";
import acceptRequest from '../../helpers/dashboard/friends/acceptRequest';
import declineRequest from '../../helpers/dashboard/friends/declineRequest';
import cancelRequest from '../../helpers/dashboard/friends/cancelRequest';

export default () => {
    const [loader, setLoader] = useState(true);
    const [requests, setRequests] = useState(data.friendRequests);
    const CurrentUser = useContext(UserContext);

    useEffect(() => {
        const requests = async () => {
            let request = await getRequests(CurrentUser);
            console.log(request)
            setRequests(request)
            setLoader(false)
        }

        requests()
    }, [])

    const handleAcceptRequest = async (request: any) => {
        let accept: any = await acceptRequest(CurrentUser, request);
        if (accept === "SUCCESS") {
            let arr = [...requests];
            arr = arr.filter(req => {
                return req.uuid !== request.uuid
            })
            setRequests(arr);
        }
    }

    const handleDeclineRequest = async (request: any) => {
        let decline: any = await declineRequest(CurrentUser, request);
        if (decline === "SUCCESS") {
            let arr = [...requests];
            arr = arr.filter(req => {
                return req.uuid !== request.uuid
            })
            setRequests(arr);
        }
    }

    const handleCancelRequest = async (request: any) =>{
        let cancel: any = await cancelRequest(CurrentUser, request);
        if (cancel === "SUCCESS") {
            let arr = [...requests];
            arr = arr.filter(req => {
                return req.uuid !== request.uuid
            })
            setRequests(arr);
        }
    }
    
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
                                            <div id={request.uuid} key={index} className="request">
                                                {
                                                    request.type === "incoming" ?
                                                        // Incoming request
                                                        <Fragment>
                                                            <div className="type-identifier">
                                                                <span>Incoming</span>
                                                            </div>

                                                            <div className="identifier">
                                                                <div style={getPreferredColor(request.user.backgroundColor)} className="avatar">
                                                                    <i className="fas fa-user"></i>
                                                                </div>
                                                                <div className="two-tier">
                                                                    <span className="idCode">#{request.user.idCode}</span>
                                                                    <span className="name">{request.user.username}</span>
                                                                </div>
                                                            </div>
                                                            {/* Actions */}
                                                            <div className="action-buttons">
                                                                {/* Accept request */}
                                                                <button onClick={() => handleAcceptRequest(request)} className="accept">
                                                                    <i className="fas fa-check"></i>
                                                                </button>
                                                                {/* Decline request */}
                                                                <button onClick={() => handleDeclineRequest(request)} className="decline">
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
                                                                <div style={getPreferredColor(request.user.backgroundColor)} className="avatar">
                                                                    <i className="fas fa-user"></i>
                                                                </div>
                                                                <div className="two-tier">
                                                                    <span className="idCode">#{request.user.idCode}</span>
                                                                    <span className="name">{request.user.username}</span>
                                                                </div>
                                                            </div>
                                                            {/* Actions */}
                                                            <div className="action-buttons">
                                                                {/* Cancel request */}
                                                                <button onClick={()=> handleCancelRequest(request)} className="cancel-request">
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