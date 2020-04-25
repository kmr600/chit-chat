// This function stores the previous user so that we can decide if we want to display the username above the messages or not.
// It returns the function we use to check if the user stored inside of the object(prev) is the same as the current one.

function isSameUserMemo() {
    const users = {}
    return function(user) {
        if(!user) return false
        if(users.prev === user) {
            return true
        } else {
            users.prev = user
            return false
        }  
    }
}

export default isSameUserMemo