import React, { useState } from "react"
import Detail from "../components/detail";
import CreateEdit from "./createEdit"

export default function Card({ data, index, flag }) {
    const [openDetail, setOpenDetail] = useState(false)
    const [open, setOpen] = useState(false)

    const detail = () => {
        setOpenDetail(!openDetail)
    }


    return (
        <div className="w-full p-4 cursor-pointer hover:scale-125">
            <div onClick={detail} className="card flex flex-col justify-center p-10 bg-white rounded-lg shadow-2xl">
                <div className="prod-title">
                    <p className="text-lg uppercase text-gray-900 ">
                        {data.title}
                    </p>
                </div>
                <div className="prod-title">
                    <p className="text-left text-gray-900 ">
                        {data.description}
                    </p>
                </div>
                <div className="prod-title">
                    <p className="text-left text-gray-900 ">
                        Status : {data.status}
                    </p>
                </div>
            </div>
            <Detail openDetail={openDetail} setOpenDetail={setOpenDetail} open={open} setOpen={setOpen} data={data} />

            <CreateEdit open={open} setOpen={setOpen} data={data} title={"Update"} update index={index} flag={flag} />
        </div>
    )
}