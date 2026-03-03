import { useContext, useEffect } from "react";
import { PostContext } from "../post.context";
import { getFeed, createPost, likePost, unLikePost } from "../services/post.api";


export const usePost = () => {

    const context = useContext(PostContext)

    const { loading, setLoading, feed, setFeed, post, setPost } = context



    const handleGetFeed = async () => {

        setLoading(true)
        const data = await getFeed()
        setFeed(data.posts)

        setLoading(false)
    }

    const handleCreatePost = async (imageFile, caption) => {
        setLoading(true)

        const data = await createPost(imageFile, caption)

        setFeed([data.post, ...feed])

        setLoading(false)

    }

    const handleLike = async (post) => {
        const data = await likePost(post)
        setPost(data)
        await handleGetFeed()
    }

    const handleUnLike = async (post) => {
        const data = await unLikePost(post)
        setPost(data)
        await handleGetFeed()
    }


    useEffect(() => {
        handleGetFeed()
    }, [])

    return { loading, feed, post, handleGetFeed, handleCreatePost, handleLike, handleUnLike }
}