import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchdata } from "../../store/actions/actionTodo"
import Card from "./card"
import CreateEdit from "./createEdit"
import EmptyData from '../components/emptyData'

export default function Home() {
    const dispatch = useDispatch()
    const { data } = useSelector((state) => state)

    const [flag, setFlag] = useState(false)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        dispatch(fetchdata())
    }, [dispatch])

    return (
        <div className="w-screen">
            <div className="flex justify-center m-5">
                <div className="uppercase text-3xl font-bold text-orange-600">To-do List</div>
            </div>
            <div className="flex justify-between m-5">
                <div>
                    <button onClick={() => { setFlag(false); }} className={`px-2 text-sm md:text-base md:px-6 py-2 transition ease-in duration-200 uppercase rounded-full ${!flag ? 'bg-green-600 text-white border-2 border-green-600' : 'hover:bg-orange-600 text-orange-600 hover:text-white border-2 border-orange-600 '} focus:outline-none`}>
                        Status 0
                    </button>
                    <button onClick={() => setFlag(true)} className={`px-2 md:px-6 text-sm md:text-base py-2 ml-2 md:mt-0 transition ease-in duration-200 uppercase rounded-full ${flag ? 'bg-green-600 text-white border-2 border-green-600' : 'hover:bg-orange-600 text-orange-600 hover:text-white border-2 border-orange-600 '} focus:outline-none`}>
                        Status 1
                    </button>
                </div>
                <div>
                    <button onClick={() => setOpen(true)} className="px-2 md:px-6 text-sm md:text-base py-2 transition ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none">
                        Create
                    </button>
                </div>
            </div>
            {
                flag ? (
                    <>
                        {
                            data?.dataStatus1.length > 0 ? (
                                <div className="flex flex-wrap px-4 lg:px-24 py-6 md:py-10 2xl:py-24">
                                    {
                                        data?.dataStatus1.map((e, i) => {
                                            return (
                                                <div key={i} className="w-80 flex justify-center items-center">
                                                    <Card data={e} index={i} flag={flag} />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            ) : <EmptyData />
                        }
                    </>
                ) : (
                    <>
                        {
                            data?.dataStatus0.length > 0 ? (
                                <div className="flex flex-wrap px-4 lg:px-24 py-6 md:py-10 2xl:py-24">
                                    {
                                        data?.dataStatus0.map((e, i) => {
                                            return (
                                                <div key={i} className="w-80 flex justify-center items-center">
                                                    <Card data={e} index={i} flag={flag} />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            ) : <EmptyData />
                        }
                    </>

                )
            }
            <CreateEdit open={open} setOpen={setOpen} title={"Create"} create />
        </div>
    )
}