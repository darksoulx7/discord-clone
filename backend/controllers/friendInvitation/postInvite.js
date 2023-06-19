const User = require("../../models/user");
const FriendInvitation = require("../../models/friendInvitation");

const postInvite = async (req, res, next) => {
    const { targetMailAddress } = req.body

    const { userId, mail } = req.user;

    console.log(`Invite ${targetMailAddress} to ${mail}`)
    // check if friend that we would like to invite is not user
    if (mail.toLowerCase() === targetMailAddress.toLowerCase()) {
        return res
            .status(409)
            .send('Sorry, you cannot become friend with yourself');
    }

    const targetUser = await User.findOne({
        mail: targetMailAddress.toLowerCase()
    });

    if (!targetUser) {
        return res
            .status(404)
            .send(`Friend of ${targetMailAddress} is not been found. Please check mail address!!`)
    }

    // check if invitiation has been alredy sent
    const invitationAlreadyRecieved = await FriendInvitation.findOne({
        senderId: userId,
        receiverId: targetUser._id
    })

    if (invitationAlreadyRecieved) {
        return res.status(409).send('Invitation has already been sent')
    }

    // check if user we would like to invite is alreay our friend 
    const userAlreadyFriends = targetUser.friends.find(friendId =>
        friendId.toString() === userId.toString()
    );

    if (userAlreadyFriends) {
        return res.status(409).send('Friends already added. Please check friends list')
    }

    // create a new invitiation in database
    const newInvitation = await FriendInvitation.create({
        senderId: userId,
        receiverId: targetUser._id
    })

    //  if invitation has beeen successfully created we would like to update friends invitations if other is online
    return res.status(201).send('Invitaion has been sent!')
}

module.exports = postInvite