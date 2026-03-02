const followModel = require('../models/follow.model')
const userModel = require('../models/user.model')



async function followUserController(req, res) {
    //middleware(req.user)
    const followerUsername = req.user.username
    const followeeUsername = req.params.username


    if (followerUsername === followeeUsername) {
        return res.status(400).json({
            message: "You cannot follow yourself"
        })
    }

    const isFolloweeExists = await userModel.findOne({ username: followeeUsername })

    if (!isFolloweeExists) {
        return res.status(404).json({
            message: "User you are trying to follow does not exist"
        })
    }


    const isAlreadyFollowing = await followModel.findOne({
        follower: followeeUsername,
        followee: followerUsername
    })

    if (isAlreadyFollowing) {
        return res.status(200).json({
            message: `You are already following ${followeeUsername}`,
            follow: isAlreadyFollowing
        })
    }

    const followRecord = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername,
    })

    res.status(201).json({
        message: `You are following ${followeeUsername}`,
        follow: followRecord
    })
}


async function unfollowUserController(req, res) {
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    const isUserFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })

    if (!isUserFollowing) {
        return res.status(404).json({
            message: `You are not following ${followeeUsername}`
        })
    }

    await followModel.findByIdAndDelete(isUserFollowing._id)

    res.status(200).json({
        message: `You have unfollowed ${followeeUsername}`
    })
}

async function acceptFollowController(req, res) {

    const username = req.params.username

    const request = await followModel.findOne({ followee: username })

    if (!request) {
        return res.status(404).json({
            message: "Request not found."
        })
    }
    if (request.followee !== req.user.username) {
        return res.status(403).json({
            message: "Not authorized"
        })
    }

    if (request.status !== "pending") {
        return res.status(400).json({ message: "Already handled" })
    }

    request.status = "accepted";
    await request.save();

    res.status(200).json({
        message: "Follow request accepted",
        request

    })

}

async function rejectFollowController(req, res) {
    const username = req.params.username

    const request = await followModel.findOne({ followee: username })

    if (!request) {
        return res.status(400).json({
            message: "Request not found"
        })
    }

    if (request.followee !== req.user.username) {
        return res.status(404).json({
            message: "Not authorized"
        })
    }
    if (request.status !== "pending") {
        return res.status(400).json({
            message: "Already handled"
        })
    }
    request.status = "rejected"
    await request.save()

    res.status(200).json({
        message: "Follow request rejected",
        request
    })
}

module.exports = {
    followUserController, unfollowUserController,
    acceptFollowController, rejectFollowController
}