import PropTypes from 'prop-types'
import { useState } from 'react'

import DeleteModal from '../../Modal/DeleteModal'
import { Link } from 'react-router-dom'

const RoomDataRow = ({ asset, handleDelete }) => {
    let [isOpen, setIsOpen] = useState(false)
    const closeModal = () => {
        setIsOpen(false)
    }

    return (
        <tr>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{asset?.date}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{asset?.product}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{asset?.quantity}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>${asset?.type}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <button
                    onClick={() => setIsOpen(true)}
                    className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
                >
                    <span
                        aria-hidden='true'
                        className='absolute inset-0 bg-red-200 opacity-50 rounded-full'
                    ></span>
                    <span className='relative'>Delete</span>
                </button>
                <DeleteModal
                    isOpen={isOpen}
                    closeModal={closeModal}
                    handleDelete={handleDelete}
                    id={asset?._id}
                />
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <span className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
                    <span
                        aria-hidden='true'
                        className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
                    ></span>
                     <Link to={`/dashboard/update/${asset?._id}`}>
                        <span className='relative'>Update</span>
                    </Link>
                </span>
            </td>
        </tr>
    )
}

RoomDataRow.propTypes = {
    asset: PropTypes.object.isRequired,
    refetch: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
}

export default RoomDataRow
