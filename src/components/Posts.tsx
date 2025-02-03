import React from 'react'
import Tag from "@/components/Tag";

function Posts() {
  return (
    <div className=" xxs:w-full  md:w-3/4 border-2  flex flex-col rounded-lg px-4 py-4 mt-3">
          <h1 className="text-base font-light text-blue-500">
            Webcam captured/ saved Video not playing ( not UTF-8 encoded )
          </h1>
          <p className="text-sm font-light">
            I have a video that is captured from a webcam and saved to the
            server. The video is not playing in the browser. I have tried to
            convert the video to UTF-8 encoding but it is not working. Can
            anyone help me with this?
          </p>
          <div className="w-full flex flex-row flex-wrap mt-3">
            <Tag/>
          </div>
        
        </div>
  )
}

export default Posts