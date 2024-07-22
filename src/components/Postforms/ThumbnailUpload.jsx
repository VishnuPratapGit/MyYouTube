import { forwardRef, useId, useRef } from 'react'
import { ImagePlus, SquarePen } from "lucide-react";
import databaseServices from '../../appwrite/database'
import PreLoader from '../PreLoader';

const ThumbnailUpload = ({ loading = false, thumbnailData = null, error = false, ...props }, ref) => {
    const id = useId()

    return (
        <div className="font-roboto form-group">
            <h1 >Thumbnail</h1>
            <h1 className="text-xs mb-5 text-stone-400">
                Set a thumbnail that stands out and draws viewers'
                attention.
            </h1>

            {thumbnailData ? (
                <div className='thumbnail-img relative w-max'>
                    <img src={databaseServices.getThumbnailPreview(thumbnailData.$id)} alt="error" className="mt-3 w-40 h-20 border border-dashed dark:border-neutral-500 border-neutral-300 p-0.5"
                    />
                    <label htmlFor={id} className='thumbnail-edit-icon absolute top-1 right-1 bg-slate-800'><SquarePen size={20} /></label>
                </div>
            ) : (
                <label
                    htmlFor={id}
                    className={`flex flex-col justify-center items-center border border-dashed w-40 h-20 ${error ? "border-red-500" : "dark:border-neutral-500 border-neutral-300"})}`}
                >
                    {loading ? <PreLoader type="bars" color="gray" /> : (
                        <>
                            <ImagePlus />
                            <span className="text-xs text-stone-400 mt-2">
                                Upload File
                            </span>
                        </>
                    )}
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