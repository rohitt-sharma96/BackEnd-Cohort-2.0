import React, { useState, useRef } from 'react'
import "../style/createpost.scss"
import { usePost } from '../hook/usePost'
import { useNavigate } from 'react-router'

const CreatePost = () => {
    const navigate = useNavigate()

    const {handleCreatePost,loading} = usePost()//custom hooks

    const [caption, setCaption] = useState("")
    const postImageInputFieldRef = useRef(null)


    async function handleSubmit(e) {
        e.preventDefault()

        const file = postImageInputFieldRef.current.files[0]

        await handleCreatePost(file,caption)
        navigate("/")

    }
    if(loading){
        return(
            <main><h1>Creating Post...</h1></main>
        )
    }


    return (
        <main>
            <div className="form-container-page">
                <h1>Create Post</h1>
                <form onSubmit={handleSubmit}>
                    <label className='create-image-label' htmlFor="postImage">select image</label>
                    <input ref={postImageInputFieldRef} hidden type="file" name='postImage' id='postImage' placeholder='Upload a image' />

                    <input
                        value={caption}
                        onInput={(e) => { setCaption(e.target.value) }}
                        type="text"
                        name='caption'
                        id='caption'
                        placeholder='Write a caption...' />
                    <button className='button primary-button'>create post</button>

                </form>
            </div>
        </main>
    )
}

export default CreatePost