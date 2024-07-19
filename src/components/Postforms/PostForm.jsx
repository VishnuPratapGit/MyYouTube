import { useEffect, useMemo, useState } from "react";
import { Container, TextArea, Input, RadioInput } from "../index";
import { CloudUpload, X, ArrowUpFromLine, CircleCheck, ImagePlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import databaseServices from "../../appwrite/database";
import VideoUpload from "./VideoUpload";


const PostForm = ({ toggleCreate }) => {
    const userData = useSelector((state) => state.auth.userData);
    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();

    const [addDetails, setAddDetails] = useState(true);
    const [videoData, setVideoData] = useState(null);
    const [thumbnailData, setThumbnailData] = useState(null);

    const textAreaLength = watch("description", "").length;
    const thumbnailList = watch("thumbnail", "");

    // THUMBNAIL UPLOAD
    useEffect(() => {
        const thumbnailUpload = async () => {
            const thumbnailUploadData = await databaseServices.uploadFile(thumbnailList[0]);
            if (thumbnailUploadData) setThumbnailData(thumbnailUploadData);
            else alert("Thumbnail not uploaded properly!");
        }
        if (thumbnailList && thumbnailList.length > 0) thumbnailUpload();
    }, [thumbnailList]);

    // VIDEO UPLOAD FUNCTION
    const handleVideoUpload = async (event) => {
        setAddDetails(false);
        const video = event.target.files[0];
        const videoData = video ? await databaseServices.uploadFile(video) : null;
        if (videoData) {
            setVideoData(videoData);
            console.log("Video Uploaded Successfully");
        } else {
            alert("video not uploaded correctly");
            setAddDetails(true);
        }
    };

    // VIDEO DETAILS FORM SUBMITION 
    const submitForm = async (data) => {
        if (videoData && thumbnailData) {
            const newPostData = {
                ...data,
                videoId: videoData.$id,
                thumbnailId: thumbnailData.$id,
                audience: data.audience === "true",
                userId: userData.$id,
                channelName: userData.name,
            };

            try {
                const postsuccess = await databaseServices.createVideoPost(newPostData);
                if (postsuccess) {
                    alert("video upload succesfully! You can now close this window or upload new video");
                    console.log("PostForm.jsx :: Post Successfull :", postsuccess);
                }
            } catch (error) {
                alert(error.message);
            } finally {
                reset();
                setVideoData(null);
                setThumbnailData(null);
                setAddDetails(true);
            }
        } else {
            console.log("'Video' and 'Thumbnail' both are mendatory for your video!")
        }
    };

    // MEMOIZED VIDEO COMPONENT
    const VideoComponent = useMemo(() => (
        <video
            className='w-full h-44 object-cover rounded-t-lg'
            src={databaseServices.getFilePreview(videoData ? videoData.$id : null)}
            controls
        ></video>
    ), [videoData]);


    return (
        <Container className={`absolute top-0 w-full h-svh`}>
            <div className="flex h-full w-full justify-center items-center border-dashed bgtransparent">
                <div className="flex flex-col w-[62%] h-[86%] shadow-2xl bg-white dark:bg-neutral-800 rounded-3xl">

                    {/* TOPBAR */}
                    <div className="flex justify-between p-5 pl-8 border-b rounded-t-3xl border-slate-200 dark:border-neutral-700">
                        <h1 className="text-xl font-roboto font-semibold">Video-Details</h1>
                        <X onClick={toggleCreate} className="cursor-pointer" />
                    </div>


                    {/* FORM */}
                    <div className="flex items-center flex-1 overflow-y-scroll">
                        {addDetails ? (
                            // <div className="flex flex-col mx-auto border-dashed border-2 rounded-lg border-neutral-300 dark:border-neutral-600 justify-center items-center gap-8 h-4/5 w-4/5">
                            //     <CloudUpload
                            //         size={"35%"}
                            //         strokeWidth={1}
                            //         className="box-content text-neutral-400 rounded-full"
                            //     />

                            //     <div className="flex flex-col items-center ">
                            //         <h1 className="text-sm font-roboto font-semibold">
                            //             Drag and drop video files to upload
                            //         </h1>
                            //         <h1 className="mt-2 text-xs font-roboto text-neutral-400">
                            //             Your videos will be private until you publish them.
                            //         </h1>
                            //     </div>

                            //     <div>
                            //         <label
                            //             htmlFor="video"
                            //             className="bg-neutral-900 border-transparent border-2 hover:dark:border-blue-600 cursor-pointer font-semibold font-roboto active:bg-neutral-600 text-white p-3 rounded-lg"
                            //         >
                            //             Select Video
                            //         </label>
                            //         <input
                            //             onChange={handleVideoUpload}
                            //             type="file"
                            //             name="video"
                            //             id="video"
                            //             className="hidden"
                            //             accept="video/*"
                            //             required
                            //         />
                            //     </div>
                            // </div>

                            <VideoUpload handleVideoUpload={handleVideoUpload} />
                        ) : (
                            <div className="flex w-full p-5 px-12 h-full gap-10 font-roboto">
                                <form onSubmit={handleSubmit(submitForm)} className="scroll-hidden overflow-y-scroll w-3/5">
                                    {/* Custom Input for Title */}
                                    <Input
                                        className={
                                            "border-[0.5px] focus:border-2 border-neutral-300 dark:border-neutral-600 mb-4 h-12 pl-4"
                                        }
                                        placeholder="Title*"
                                        type="text"
                                        error={errors.title}
                                        {...register("title", { required: "Title is required" })}
                                    />

                                    {/* Custom Input for Description */}
                                    <TextArea
                                        textAreaLength={textAreaLength}
                                        {...register("description")}
                                    />

                                    {/* Custom Input for thumbnail */}
                                    <div className="font-roboto form-group">
                                        <h1 >Thumbnail</h1>
                                        <h1 className="text-xs mb-5 text-stone-400">
                                            Set a thumbnail that stands out and draws viewers'
                                            attention.
                                        </h1>

                                        {thumbnailData ? (
                                            <div>
                                                <img src={databaseServices.getThumbnailPreview(thumbnailData.$id)} alt="Uploaded Thumbnail" className="mt-3 w-40 h-20 border border-dashed dark:border-neutral-500 border-neutral-300 p-0.5"
                                                />
                                            </div>
                                        ) : (
                                            <label
                                                htmlFor="thumbnail"
                                                className={`flex flex-col justify-center items-center border border-dashed w-40 h-20 ${errors.thumbnail ? "border-red-500" : "dark:border-neutral-500 border-neutral-300"}
                                        )}`}
                                            >
                                                <ImagePlus />
                                                <span className="text-xs text-stone-400 mt-2">
                                                    Upload File
                                                </span>
                                            </label>
                                        )}

                                        <input
                                            className="m-5 hidden"
                                            type="file"
                                            id="thumbnail"
                                            {...register("thumbnail", {
                                                required: "Thumbnail is required",
                                            })}
                                            accept="image/*"
                                        />
                                        {errors.thumbnail && (
                                            <p className="text-red-500 text-xs">{errors.thumbnail.message}</p>
                                        )}
                                    </div>

                                    {/* Custom Input for Audience */}
                                    <div className="custom-radio form-group font-roboto">
                                        <h1>Audience</h1>
                                        <h1 className="text-xs mb-2 mt-1 bg-neutral-100 dark:bg-neutral-700 p-2 rounded-md dark:text-stone-300 text-stone-500">
                                            Regardless of your location, you're legally required to comply with the Children's Online Privacy Protection Act (COPPA) and/or other laws. You're required to tell us whether your videos are made for kids.
                                        </h1>

                                        <RadioInput
                                            label="Yes, it's made for kids"
                                            value="true"
                                            {...register("audience", {
                                                required: "Select audience type.",
                                            })}
                                        />
                                        <RadioInput
                                            label="No, it's not made for kids"
                                            value="false"
                                            {...register("audience", {
                                                required: "Select audience type.",
                                            })}
                                        />
                                    </div>

                                    {/* Visibility Select Dropdown */}
                                    <div className="form-group font-roboto flex items-center">
                                        <label htmlFor="visibility">Visibility:</label>
                                        <select
                                            className="ml-5 rounded bg-neutral-100 text-sm p-1 outline-1 outline-blue-500 dark:bg-neutral-500"
                                            id="visibility"
                                            {...register("visibility", {
                                                required: "Visibility is required.",
                                            })}
                                        >
                                            <option value="public">Public</option>
                                            <option value="private">Private</option>
                                            <option value="unlisted">Unlisted</option>
                                        </select>
                                        {errors.visibility && <p>{errors.visibility.message}</p>}
                                    </div>

                                    <button type="submit" className="p-2 bg-green-800 text-white font-roboto font-semibold rounded-md">
                                        Upload Video
                                    </button>
                                </form>

                                <div id="video-info" className="flex-1">
                                    <div className="bg-neutral-900 rounded-lg w-full max-w-80 h-3/4">
                                        {VideoComponent}
                                        <div className="p-5 pb-2">
                                            <span className="text-xs block font-semibold text-neutral-500">Video Link</span>
                                            <a href={databaseServices.getFilePreview(videoData ? videoData.$id : null)} className="text-sm truncate block text-blue-400">{videoData ? `https://cloud.appwrite.io/v1/${videoData.$id}` : "video-url"}
                                            </a>
                                        </div>
                                        <div className="p-5 pt-2">
                                            <span className="text-xs font-semibold text-neutral-500">File Name</span>
                                            <h1>{videoData ? videoData.name : "File Name"}</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    {!addDetails && (
                        <div className="flex gap-5 p-5 pl-8 border-t border-slate-200 dark:border-neutral-700">
                            <ArrowUpFromLine />
                            <CircleCheck />
                        </div>
                    )}
                </div>
            </div>
        </Container>
    );
};

export default PostForm;
