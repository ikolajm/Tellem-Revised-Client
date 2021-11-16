import { AnyAaaaRecord } from "dns";
import { Fragment, useState } from "react"
import { Modal, Button } from "react-bootstrap"
import getPreferredColor from '../../../helpers/dashboard/getColor';
import data from '../../../helpers/data/data';

interface IncomingProps {
    show: boolean,
    setShow: any
}

const AddFriendModal: React.FC<IncomingProps> = ({show, setShow}) => {
    const [search, setSearch] = useState('');
    // const [searchResults, setSearchResults] = useState([]);
    const [searchResults, setSearchResults]: any = useState(data.friendsOfJake)
    const [searchSubmitted, setSearchSubmitted] = useState(true);

    const handleClose = () => {
        setShow(false)
        setTimeout(() => {
            setSearch('');
            setSearchSubmitted(false);
            setSearchResults([]);
        }, 300);
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
                        <Button>
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
                                                            <div style={getPreferredColor(user.preferredColor)} className="avatar">
                                                                <i className="fas fa-user"></i>
                                                            </div>
                                                            <div className="two-tier">
                                                                <span className="idCode">#{user.idCode}</span>
                                                                <span className="name">{user.username}</span>
                                                            </div>
                                                        </div>
                                                        {/* Action */}
                                                        <div className="action-buttons">
                                                            <button className="add-friend">
                                                                <i className="fas fa-user-plus"></i>
                                                                {/* <i className="fas fa-user-check"></i> */}
                                                            </button>
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