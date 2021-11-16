import { Link } from "react-router-dom"

export default () => {
    return (
        <div className="error-container">
            <div className="error">
                <div className="head">
                    <i className="fas fa-exclamation-circle"></i>
                    <h1>Oh no!</h1>
                </div>
                <div className="content">
                    <p>It appears we can't find what you're looking for!</p>
                    <p>
                        Please click {''}
                        <Link to="/dashboard/messages">
                            here
                        </Link>
                        {''} or use the main navigation to return to the messages screen.
                    </p>
                </div>
            </div>
        </div>
    )
}