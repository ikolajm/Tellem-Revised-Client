import moment from "moment";
export default (message: any,  messageList: any) => {
    console.log(message, messageList)
    // Get the last set of messages
    let incomingMessageDate = moment(message.createdAt).format("L")
    let lastSetCopy = {...messageList[messageList.length - 1]}
    let lastSetDate = lastSetCopy.date
    // If the message fits in the already present array, push obj and return 
    if (incomingMessageDate === lastSetDate) {
        lastSetCopy.messages.push(message);
        let returnObj = [...messageList]
        returnObj[messageList.length - 1] = lastSetCopy;
        return returnObj;
    } else {
        let returnObj = [...messageList];
        let messageArr = [message]
        let newSet = {
            date: incomingMessageDate,
            messages: messageArr
        }
        returnObj.push(newSet)
        return returnObj;
    }
}