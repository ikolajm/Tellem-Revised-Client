import { AnyAaaaRecord } from "dns";
import { Fragment, useContext, useState } from "react"
import { Modal, Button } from "react-bootstrap"
import getPreferredColor from '../../../helpers/dashboard/getColor';
import data from '../../../helpers/data/data';
import userSearch from "../../../helpers/dashboard/friends/searchUser";
import userContext from "../../../context/userContext";
import createFriendRequest from "../../../helpers/dashboard/friends/createFriendRequest";

interface IncomingProps {
    show: boolean,
    setShow: any
}

const AddFriendModal: React.FC<IncomingProps> = ({show, setShow}) => {
    const [search, setSearch] = useState('');
    // const [searchResults, setSearchResults] = useState([]);
    const [searchResults, setSearchResults]: any = useState([]);
    const [searchPending, setSearchPending]: any = useState([]);
    const [searchFriends, setSearchFriends]: any = useState([]);
    const [searchSubmitted, setSearchSubmitted] = useState(true);
    const CurrentUser = useContext(userContext)

    const handleClose = () => {
        setShow(false)
        setTimeout(() => {
            setSearch('');
            setSearchSubmitted(false);
            setSearchResults([]);
            setSearchPending([]);
            setSearchFriends([]);
        }, 300);
    }

    const handleSearch = async () =>{
        let query: any = await userSearch(CurrentUser, search);
        console.log(query)
        setSearchResults(query.searchResults);
        setSearchPending(query.pending);
        setSearchFriends(query.friendIds);
    }

    const handleAddFriend = async (userUuid: string, userId: number) => {
        let query: any = await createFriendRequest(CurrentUser, userUuid, userId);
        if (query === "SUCCESS") {
            let arr = [...searchPending];
            arr.push(userId);
            setSearchPending(arr);
        }
    }

    return (
        <Fragment>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className="add-friend"
            >
                <Modal.Header>
                    <Modal.Title>
                        <div className="two-tier">
                            <h1 className="">Send Friend Request</h1>
                            <span>Search for users by username</span>
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="search">
                        <input placeholder="Search by username" type="text" onChange={(e) => setSearch(e.target.value)} value={search} />
                        <Button onClick={handleSearch}>
                            <i className="fas fa-search"></i>
                        </Button>
                    </div>
                    <div className="search-results">
                        {
                            // If user has searched by a username
                            searchSubmitted === true ?
                                <Fragment>
                                    {
                                        // If there's no results for that user
                                        searchResults.length === 0 ?
                                            <div className="not-found">
                                                <i className="fas fa-exclamation-circle"></i>
                                                <span>No users found.</span>
                                            </div> :
                                            // If users are found by that username
                                            searchResults.map((user: any, index: number) => {
                                                return (
                                                    <div key={index} className="selectable">
                                                        {/* Avatar and name */}
                                                        <div className="identifier">
                                                            <div style={getPreferredColor(user.backgroundColor)} className="avatar">
                                                                <i className="fas fa-user"></i>
                                                            </div>
                                                            <div className="two-tier">
                                                                <span className="idCode">#{user.idCode}</span>
                                                                <span className="name">{user.username}</span>
                                                            </div>
                                                        </div>
                                                        {/* Action */}
                                                        <div className="action-buttons">
                                                            {
                                                                // If the user is already friends with a result
                                                                searchFriends.includes(user.id) ?
                                                                    <button disabled={true} className="accepted">
                                                                        {/* <i className="fas fa-user-plus"></i> */}
                                                                        <i className="fas fa-user-check"></i>
                                                                    </button> :
                                                                    // If one of the users needs to take action with a request
                                                                            searchPending.includes(user.id) ?
                                                                                <button disabled={true} className="waiting">
                                                                                    <i className="fas fa-clock"></i>
                                                                                </button>:
                                                                                <button onClick={() => handleAddFriend(user.uuid, user.id)} disabled={false} className="add-friend">
                                                                                    <i className="fas fa-user-plus"></i>
                                                                                </button>
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                            })
                                    }
                                </Fragment> :
                                // User isn't using filter
                                <Fragment>
                                    <div className="not-found">
                                        <i className="fas fa-search"></i>
                                        <span>Submit a search to find who you're looking for.</span>
                                    </div>
                                </Fragment>
                            }
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="cancel" onClick={handleClose}>
                        Cancel
                    </Button>
                    {/* <Button className="send">Send Request</Button> */}
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}

export default AddFriendModal;