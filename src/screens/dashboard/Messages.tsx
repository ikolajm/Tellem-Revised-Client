import {useState, Fragment} from 'react';
import MessageList from './MessageList';
import ArchiveList from './ArchiveList';
import { Modal, Button } from 'react-bootstrap';
import data from '../../helpers/data/data';
import getPreferredColor from '../../helpers/dashboard/getColor';
import CreateConversation from './modals/CreateConversation';
import { toast } from 'react-toastify';

export default () => {
    const [director, setDirector] = useState('messages')
    // Create Conversation
    const [filter, setFilter] = useState('')
    const [friends, setFriends] = useState(data.friendsOfJake)
    const [sortedFriends, setSortedFriends] = useState(data.friendsOfJake);
    const [selected, setSelected] = useState([]);
    // Modal
    const [show, setShow] = useState(false);
    const handleOpen = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        setTimeout(() => {
            setSelected([])
            setSortedFriends(friends)
            setFilter('')
        }, 300)
    }

    const setFilteredFriends = (value: string) => {
        setFilter(value);
        const filtered = friends.filter(friend => friend.username.toLowerCase().includes(value.toLowerCase()));
        setSortedFriends(filtered)
    }

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

    const checkCheckedStatus = (friendUuid: string) => {
        const arr: string[] = [...selected];
        // console.log(arr, friendUuid)
        return arr.includes(friendUuid) ? "checked" : ""
    }

    const toggleSelected = (friendUuid: string) => {
        const index = selected.findIndex(id => id === friendUuid);
        // console.log(friendUuid, selected, index)
        if (index === -1) {
            if (selected.length < 5) {
                let arr: any = [...selected];
                arr.push(friendUuid);
                setSelected(arr);
            } else {
                toast.error('You may only have a max of 5 other users in a message at a time!')
            }
        } else {
            let arr = [...selected];
            arr.splice(index, 1);
            setSelected(arr);
        }
    }

    return (
        <div className="messages-container">
            <div className="messages">
                <div className="head">
                    <ul>
                        <li onClick={() => swapDirector('messages')} tabIndex={0} className={checkDirector('messages')}>
                            Messages
                        </li>
                        <li onClick={() => swapDirector('archive')} tabIndex={0} className={checkDirector('archive')}>
                            Archive
                        </li>
                        <button  onClick={handleOpen}>
                            Create chat
                        </button>
                    </ul>
                </div>
                {
                    director === 'messages' ?
                        <MessageList /> :
                        <ArchiveList />
                }
            </div>
            {/* Create Conversation */}
            <CreateConversation
                show={show}
                handleClose={handleClose}
                selected={selected}
                setFilteredFriends={setFilteredFriends}
                filter={filter}
                sortedFriends={sortedFriends}
                checkCheckedStatus={checkCheckedStatus}
                toggleSelected={toggleSelected}
                friends={friends}
            />
        </div>
    )
}