// export const getSender = (loggedUser, users) => {
//     return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
// }

// export const getSenderFull = (loggedUser, users) => {
//     return users[0]._id === loggedUser._id ? users[1] : users[0];
// }



export const getSender = (loggedUser, users) => {
    if (!users || users.length === 0 || !loggedUser) return "Unknown Sender"; // Add a fallback in case data is missing
    return users[0]?._id === loggedUser._id ? users[1]?.name : users[0]?.name;
}

export const getSenderFull = (loggedUser, users) => {
    if (!users || users.length === 0 || !loggedUser) return {}; // Return an empty object or handle missing users
    return users[0]?._id === loggedUser._id ? users[1] : users[0];
}
