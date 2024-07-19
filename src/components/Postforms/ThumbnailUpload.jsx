import { forwardRef, useId } from 'react'
import { ImagePlus } from "lucide-react";
import databaseServices from '../../appwrite/database'

const ThumbnailUpload = ({ thumbnailData = null, error = false, ...props }, ref) => {
    const id = useId()
    return (
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
                    htmlFor={id}
                    className={`flex flex-col justify-center items-center border border-dashed w-40 h-20 ${error ? "border-red-500" : "dark:border-neutral-500 border-neutral-300"})}`}
                >
                    <ImagePlus />
                    <span className="text-xs text-stone-400 mt-2">
                        Upload File
                    </span>
                </label>
            )}

            <input
                ref={ref}
                className="m-5 hidden"
                type="file"
                id={id}
                {...props}
                accept="image/*"
            />
            {error && (
                <p className="text-red-500 text-xs">{error.message}</p>
            )}
        </div>
    )
}

export default forwardRef(ThumbnailUpload)