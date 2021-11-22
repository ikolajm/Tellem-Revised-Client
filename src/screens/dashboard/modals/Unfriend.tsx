import { Fragment, useState, useContext } from "react"
import { Modal, Button } from "react-bootstrap"
import getPreferredColor from '../../../helpers/dashboard/getColor';
import data from '../../../helpers/data/data';
import unfriendUser from "../../../helpers/dashboard/friends/unfriendUser";
import currentUser from "../../../context/userContext"

interface IncomingProps {
    CurrentUser: any,
    show: boolean,
    setShow: any,
    user: any,
    setSelectedUser: any,
    unfriend: any
}

const unFriendModal: React.FC<IncomingProps> = ({CurrentUser, show, setShow, user, setSelectedUser, unfriend}) => {
    const handleClose = () => {
        setShow(false)
        setTimeout(() => {
            setSelectedUser(null)
        }, 300);
    }

    const handleUnfriendUser = async () => {
        let request = await unfriendUser(CurrentUser, user)
        // Adjust friend list in dashboard
        if (request === "SUCCESS") {
            unfriend();
        }
        setTimeout(() => {
            setShow(false)
        })
    }

    return (
        <Fragment>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className="unfriend-modal"
            >
                <Modal.Header>
                    <Modal.Title>
                        <h1 className="">Unfriend User</h1>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="unfriend-user">
                        {
                            user === null ? '' :
                            <Fragment>
                                <div className="unfriend-preview">
                                    <div className="identifier">
                                        <div style={getPreferredColor(user.backgroundColor)} className="avatar">
                                            <i className="fas fa-user"></i>
                                        </div>
                                        <div className="two-tier">
                                            <span className="idCode">#{user.idCode}</span>
                                            <span className="name">{user.username}</span>
                                        </div>
                                    </div>
                                </div>
                                <p>Are you sure you want to unfriend this user?</p>
                            </Fragment>
                        }
                        </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="cancel" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button className="unfriend" onClick={() => handleUnfriendUser()}>Unfriend</Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}

export default unFriendModal;