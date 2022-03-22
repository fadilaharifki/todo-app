import ModalComponent from "../modal";
import { deleteData } from "../../../store/actions/actionTodo";
import { useDispatch } from "react-redux";
export default function Detail({ openDetail, setOpenDetail, open, setOpen, data, index, flag }) {

    const dispatch = useDispatch()

    const remove = () => {
        dispatch(deleteData(index))
    }

    return (
        <ModalComponent open={openDetail} setOpen={setOpenDetail}>
            <div className="block text-gray-700 text-sm font-bold mt-2" >Title</div>
            <div>{data.title}</div>
            <div className="block text-gray-700 text-sm font-bold mt-2" >description</div>
            <div>{data.description}</div>
            <div className="block text-gray-700 text-sm font-bold mt-2" >status</div>
            <div>{data.status}</div>

            <div className="prod-info grid gap-10 pt-5">

                <div className="flex flex-col md:flex-row justify-between items-center text-gray-900">
                    <button onClick={() => { setOpen(true); setOpenDetail(false) }} className="px-6 py-2 transition ease-in duration-200 uppercase rounded-full hover:bg-green-600 hover:text-white text-green-600 border-2 border-green-600 focus:outline-none">
                        Update
                    </button>
                    {
                        !flag && (
                            <button onClick={remove} className="px-6 py-2 ml-2 transition ease-in duration-200 uppercase rounded-full hover:bg-red-600 hover:text-white text-red-600 border-2 border-red-600 focus:outline-none">
                                Delete
                            </button>
                        )
                    }
                </div>
            </div>
        </ModalComponent>
    )
}