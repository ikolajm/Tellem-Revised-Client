import { Spinner } from 'react-bootstrap';

interface IncomingProps {
    text: string
}
export default ({text}: IncomingProps) => {
    return (
        <div className="loading-container">
            <Spinner animation="border" />
            <h1>{ text }</h1>
        </div>
    )
}