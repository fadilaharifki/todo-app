import React, { useEffect } from "react"
import ModalComponent from "../components/modal"
import { useForm } from "react-hook-form";
import { createData, updateData } from "../../store/actions/actionTodo";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

export default function CreateEdit({ open, setOpen, title, create = false, update = false, data }) {
    const dispatch = useDispatch()
    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        if (update) {
            reset()
        }
    }, [create, update, data, reset])

    const onSubmit = (value) => {
        if (create && !update) {
            const reWriteValue = { ...value, status: +value.status }
            dispatch(createData(reWriteValue))
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Success added data',
                showConfirmButton: false,
                timer: 1500
            })
            reset()
            setOpen(false)
        } else if (!create && update) {
            const reWriteValue = { ...value, id: data.id, status: +value.status }
            dispatch(updateData(reWriteValue))
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Success updated data',
                showConfirmButton: false,
                timer: 1500
            })
            reset()
            setOpen(false)
        }
    }
    return (
        <ModalComponent open={open} setOpen={setOpen} title={title}>
            <form className="py-5" onSubmit={handleSubmit(onSubmit)}>
                <div className="block text-gray-700 text-sm font-bold mb-2" >Title</div>
                <input defaultValue={data?.title} className="hadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" {...register("title")} />
                <div className="block text-gray-700 text-sm font-bold mb-2">Description</div>
                <textarea defaultValue={data?.description} className="hadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows={10} cols={50} {...register("description")} />
                <div className="block text-gray-700 text-sm font-bold mb-2">Status</div>
                <select defaultValue={data?.status} className="hadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" {...register("status")}>
                    <option value="0">0</option>
                    <option value="1">1</option>
                </select>

                <button type="submit" className="px-6 py-2 mt-10 text-green-900 transition ease-in duration-200 uppercase rounded-lg hover:bg-green-800 hover:text-white border-2 border-green-900 focus:outline-none">
                    Submit
                </button>
            </form>
        </ModalComponent >
    )
}