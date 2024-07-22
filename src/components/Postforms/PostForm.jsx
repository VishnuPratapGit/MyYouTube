import { useEffect, useMemo, useState } from "react";
import { TextArea, Input, RadioInput, PreLoader } from "../index";
import { X, ArrowUpFromLine, CircleCheck, ImagePlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import databaseServices from "../../appwrite/database";
import VideoUpload from "./VideoUpload";
import ThumbnailUpload from "./ThumbnailUpload";
import SelectVisibility from "./SelectVisibility";


const PostForm = ({ edit = false, toggleCreate, post }) => {
    const userData = useSelector((state) => state.auth.userData);
    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();

    const [thumbnailLoader, setThumbnailLoader] = useState(false);
    const [videoLoader, setVideoLoader] = useState(false);
    const [addDetails, setAddDetails] = useState(true);
    const [videoData, setVideoData] = useState(null);
    const [thumbnailData, setThumbnailData] = useState(null);

    const textAreaLength = watch("description", "").length;
    const thumbnailList = watch("thumbnail", "");

    // THUMBNAIL UPLOAD
    useEffect(() => {
        const thumbnailUpload = async () => {
            setThumbnailLoader(true);
            const thumbnailUploadData = await databaseServices.uploadFile(thumbnailList[0]);
            if (thumbnailUploadData) {
                setThumbnailData(thumbnailUploadData);
                setThumbnailLoader(false);
            }
            else alert("Thumbnail not uploaded properly!");
        }
        if (thumbnailList && thumbnailList.length > 0) thumbnailUpload();
    }, [thumbnailList]);

    useEffect(() => {
        if (post) {
            databaseServices.getFileData(post.videoId)
                .then(video => setVideoData(video))
            databaseServices.getFileData(post.thumbnailId)
                .then(thumbnailData => setThumbnailData(thumbnailData))

            reset({
                title: post.title || "",
                description: post.description || "",
                audience: String(post.audience) || "",
                visibility: post.visibility || "public",
            });
        }
    }, [post, reset])

    // VIDEO UPLOAD FUNCTION
    const handleVideoUpload = async (event) => {
        setAddDetails(false);
        setVideoLoader(true);
        const video = event.target.files[0];
        const videoData = video ? await databaseServices.uploadFile(video) : null;
        if (videoData) {
            setVideoData(videoData);
            setVideoLoader(false);
            console.log("Video Uploaded Successfully");
        } else {
            alert("video not uploaded correctly");
            setAddDetails(true);
        }
    };

    // VIDEO DETAILS FORM SUBMITION 
    const submitForm = async (data) => {
        if (post) {
            const newPostUpdatedData = {
                title: data.title,
                description: data.description,
                visibility: data.visibility,
                audience: data.audience === "true",
            };
            try {
                const afterUpdataData = await databaseServices.updateVideoPost(post.$id, newPostUpdatedData);
                if (afterUpdataData) {
                    alert("Video successfully updated!");
                    console.log("PostForm.jsx :: Post Successful:", afterUpdataData);
                }
            } catch (error) {
                alert("Error uploadating video: " + error.message);
            }
            return;
        }

        if (!videoData || !thumbnailData) {
            console.log("'Video' and 'Thumbnail' both are mandatory for your video!");
            return;
        }

        const newPostData = {
            ...data,
            videoId: videoData.$id,
            thumbnailId: thumbnailData.$id,
            audience: data.audience === "true",
            userId: userData.$id,
            channelName: userData.name,
        };

        try {
            const postSuccess = await databaseServices.createVideoPost(newPostData);
            if (postSuccess) {
                alert("Video uploaded successfully! You can now close this window or upload a new video.");
                console.log("PostForm.jsx :: Post Successful:", postSuccess);
            }
        } catch (error) {
            alert("Error uploading video: " + error.message);
        } finally {
            // Reset form and state
            reset();
            setVideoData(null);
            setThumbnailData(null);
            setAddDetails(true);
        }
    };


    // MEMOIZED VIDEO COMPONENT
    const VideoComponent = useMemo(() => (
        <video
            className='w-full min-h-44 h-1/2 object-cover rounded-t-lg'
            src={databaseServices.getFilePreview(videoData ? videoData.$id : null)}
            controls
        ></video>
    ), [videoData]);


    return (
        <div id="outerbox" className={`flex ${edit ? "relative" : "absolute"} top-0 h-full w-full justify-center items-center border-dashed bgtransparent`}>
            <div id="innerbox" className={`flex flex-col ${edit ? "w-full h-full rounded-none dark:bg-stone-950" : "w-[62%] h-[86%] rounded-3xl dark:bg-neutral-800"} shadow-2xl bg-white `}>
                <div className={`flex justify-between p-5 pl-8 border-b ${edit ? "border-none pl-12 rounded-none" : " rounded-t-3xl"} border-slate-200 dark:border-neutral-700`}>
                    <h1 className="text-xl font-roboto font-semibold">Video-Details</h1>
                    {!edit && <X onClick={toggleCreate} className="cursor-pointer" />}
                </div>
                <div className="flex items-center flex-1 overflow-y-scroll">
                    {(addDetails && !edit) ? <VideoUpload handleVideoUpload={handleVideoUpload} /> : (
                        <div className={`flex w-full p-5 ${edit && "pt-0"} px-12 h-full gap-10 font-roboto`}>
                            <form onSubmit={handleSubmit(submitForm)} className="scroll-hidden overflow-y-scroll w-3/5 min-w-80">
                                <Input
                                    className={"border-[0.5px] focus:border-2 border-neutral-300 dark:border-neutral-600 mb-4 h-12 pl-4"}
                                    placeholder="Title*"
                                    type="text"
                                    error={errors.title}
                                    {...register("title", { required: "Title is required" })}
                                />

                                <TextArea
                                    textAreaLength={textAreaLength}
                                    {...register("description")}
                                />

                                <ThumbnailUpload
                                    thumbnailData={thumbnailData}
                                    loading={thumbnailLoader}
                                    error={errors.thumbnail}
                                    {...register("thumbnail", { required: !post })}
                                />

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

                                <SelectVisibility
                                    options={["public", "private", "unlisted"]}
                                    label="Visibility:"
                                    error={errors.visibility}
                                    {...register("visibility", { required: "Visibility is required." })}
                                />

                                <button
                                    type="submit"
                                    className="p-2 bg-green-800 text-white font-roboto font-semibold rounded-md"
                                > Upload Video
                                </button>
                            </form>
                            <div id="video-info" className="flex-1">
                                <div className={`bg-neutral-900 rounded-lg w-full ${edit && "max-w-full h-full"} max-w-80 h-3/4 relative`}>

                                    {videoLoader && <div className="absolute flex justify-center items-center z-10 w-full h-1/2 bg-red-50"><PreLoader color="gray" /></div>}

                                    {VideoComponent}

                                    <div className="p-5 pb-2">
                                        <span className="text-xs block font-semibold text-neutral-500">Video Link</span>
                                        <a href={databaseServices.getFilePreview(videoData ? videoData.$id : null)} className="text-sm truncate block text-blue-400">{videoData ? `https://cloud.appwrite.io/v1/${videoData.$id}` : <PreLoader type="bubbles" />}
                                        </a>
                                    </div>

                                    <div className="p-5 pt-2">
                                        <span className="text-xs font-semibold text-neutral-500">File Name</span>
                                        <h1>{videoData ? videoData.name : <PreLoader type="bubbles" />}</h1>
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
    );
};

export default PostForm;
