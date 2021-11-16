import { Fragment, useState } from "react"
import { Modal, Button } from "react-bootstrap"
import getPreferredColor from '../../../helpers/dashboard/getColor';
import data from '../../../helpers/data/data';

interface IncomingProps {
    show: boolean,
    setShow: any,
    user: any,
    setSelectedUser: any
}

const unFriendModal: React.FC<IncomingProps> = ({show, setShow, user, setSelectedUser}) => {

    const handleClose = () => {
        setShow(false)
        setTimeout(() => {
            setSelectedUser(null)
        }, 300);
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
                                        <div style={getPreferredColor(user.preferredColor)} className="avatar">
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
                    <Button className="unfriend">Unfriend</Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}

export default unFriendModal;