import {useState, Fragment} from 'react';
import FriendsList from './FriendsList';
import AddFriend from './modals/AddFriend';
import PendingRequests from './PendingRequests';

export default () => {
    const [director, setDirector] = useState('friends')
    const [show, setShow] = useState(false);
    const handleOpen = () => setShow(true);

    const checkDirector = (route: string) => {
        if (route === director) {
            return 'director-switch active'
        } else {
            return 'director-switch'
        }
    }

    const swapDirector = (route: string) => {
        setDirector(route)
    }
    return (
        <div className="friends-container">
            <div className="friends">
                <div className="head">
                    <ul>
                        <li onClick={() => swapDirector('friends')} tabIndex={0} className={checkDirector('friends')}>
                            Friends
                        </li>
                        <li onClick={() => swapDirector('pending')} tabIndex={0} className={checkDirector('pending')}>
                            Pending
                        </li>
                        <button  onClick={handleOpen}>
                            Add Friend
                        </button>
                    </ul>
                </div>
                {/* Director */}
                {
                    director === 'friends' ?
                        <FriendsList /> :
                        <PendingRequests />
                }
                {/* Add friend modal */}
                <AddFriend 
                    show={show}
                    setShow={setShow}
                />
            </div>
        </div>
    )
}