import { CloudUpload } from "lucide-react";

const VideoUpload = ({ handleVideoUpload }) => {

    return (
        <div className="flex flex-col mx-auto border-dashed border-2 rounded-lg border-neutral-300 dark:border-neutral-600 justify-center items-center gap-8 h-4/5 w-4/5">
            <CloudUpload
                size={"35%"}
                strokeWidth={1}
                className="box-content text-neutral-400 rounded-full"
            />

            <div className="flex flex-col items-center ">
                <h1 className="text-sm font-roboto font-semibold">
                    Drag and drop video files to upload
                </h1>
                <h1 className="mt-2 text-xs font-roboto text-neutral-400">
                    Your videos will be private until you publish them.
                </h1>
            </div>

            <div>
                <label
                    htmlFor="video"
                    className="bg-neutral-900 border-transparent border-2 hover:dark:border-blue-600 cursor-pointer font-semibold font-roboto active:bg-neutral-600 text-white p-3 rounded-lg"
                >
                    Select Video
                </label>
                <input
                    onChange={handleVideoUpload}
                    type="file"
                    name="video"
                    id="video"
                    className="hidden"
                    accept="video/*"
                    required
                />
            </div>
        </div>
    )
}

export default VideoUpload