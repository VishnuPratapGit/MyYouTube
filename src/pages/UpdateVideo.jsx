import { useNavigate, useParams } from "react-router-dom"
import databaseServices from "../appwrite/database"
import { PostForm } from "../components"
import { useEffect, useState } from "react"


const UpdateVideo = () => {
    const [post, setPost] = useState(null);
    const { videoId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const post = await databaseServices.getPost(videoId);
                if (post) setPost(post);
            } catch (error) {
                console.error("Error fetching postData: ", error);
                navigate("/studio")
            }
        }
        if (videoId) fetchPost()
        else navigate("/studio")
    }, [videoId, navigate]);

    return (
        <PostForm edit={true} post={post} />
    )
}

export default UpdateVideo