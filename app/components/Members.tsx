"use client"
import React, { useState, useEffect } from 'react';
import { UserPlus2 } from 'lucide-react';
import { getMemberData, adddata, updateData } from '../firebase/addData';

const MemberTable: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [members, setMembers] = useState<any[]>([]); // Adjust the type as necessary
    const [error, setError] = useState<string | null>(null);
    const [newMember, setNewMember] = useState({
        email: '',
        title: 'Club Lead',
        status: 'current member'
    });

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editMember, setEditMember] = useState({
        id: '',
        email: '',
        title: '',
        status: ''
    });

    const openEditModal = (member: any) => {
        setEditMember(member);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
    };

    const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditMember({ ...editMember, [name]: value });
    };

    const handleEditFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { id, email, title, status } = editMember;

        if (!id || !email || !title || !status) {
            console.error("Edit member data is incomplete.");
            return;
        }

        const { result, error } = await updateData("members", id, { email, title, status });

        if (error) {
            console.error("Error updating member: ", error);
        } else {
            setMembers(members.map(m => (m.id === id ? { id, email, title, status } : m)));
            setIsEditModalOpen(false);
        }
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    useEffect(() => {
        const fetchMembers = async () => {
            const { result, error } = await getMemberData();
            if (error) {
                setError(error);
                console.error("Error fetching members: ", error);
            } else if (result.length === 0) {
                setError("No records found");
            } else {
                setMembers(result);
            }
        };

        fetchMembers();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewMember({ ...newMember, [name]: value });
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { email, title, status } = newMember;

        if (!email || !title || !status) {
            console.error("New member data is incomplete.");
            return;
        }

        const { result, error } = await adddata("members", { email, title, status });

        if (error) {
            console.error("Error adding member: ", error);
        } else {
            setMembers([...members, newMember]);
            setIsModalOpen(false);
        }
    };

    return (
        <div className='min-h-[100vh]'>
            <div className='flex justify-between p-4'>
                <button
                    data-modal-target="authentication-modal"
                    data-modal-toggle="authentication-modal"
                    className="h-min w-min block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button"
                    onClick={toggleModal}
                >
                    <UserPlus2 />
                </button>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Member Title
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email Id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {error ? (
                            <tr className="bg-white border-b hover:bg-gray-50">
                                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                                    {typeof error === 'string' ? error : "Error fetching data"}
                                </td>
                            </tr>
                        ) : (
                            members.map((member) => (
                                <tr key={member.id} className="bg-white border-b hover:bg-gray-50">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {member.title}
                                    </th>
                                    <td className="px-6 py-4">
                                        {member.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {member.status}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <a href="#" className="font-medium text-blue-600 hover:underline" onClick={() => openEditModal(member)}>Edit</a>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div id="authentication-modal" tabIndex={-1} aria-hidden="true" className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Add a Member
                                </h3>
                                <button
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                    data-modal-hide="authentication-modal"
                                    onClick={toggleModal}
                                >
                                    X
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="p-4 md:p-5">
                                <form className="space-y-4" onSubmit={handleFormSubmit}>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Member email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                            placeholder="name@iiitkottayam.ac.in"
                                            required
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Member Title</label>
                                        <select
                                            name="title"
                                            id="title"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                            required
                                            onChange={handleInputChange}
                                        >
                                            <option value="Club Lead">Club Lead</option>
                                            <option value="Tech Lead">Tech Lead</option>
                                            <option value="Design Lead">Design Lead</option>
                                            <option value="PR Lead">PR Lead</option>
                                            <option value="Research Lead">Research Lead</option>
                                            <option value="Creative Lead">Creative Lead</option>
                                            <option value="Core Member">Core Member</option>
                                            <option value="Tech Sub Lead">Tech Sub Lead</option>
                                            <option value="Design Sub Lead">Design Sub Lead</option>
                                            <option value="PR Sub Lead">PR Sub Lead</option>
                                            <option value="Research Sub Lead">Research Sub Lead</option>
                                            <option value="Creative Sub Lead">Creative Sub Lead</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                                        <select
                                            name="status"
                                            id="status"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                            
                                            required
                                            onChange={handleInputChange}
                                        >
                                            <option value="current member">current member</option>
                                            <option value="legacy member">legacy member</option>
                                            <option value="previous member">previous member</option>
                                        </select>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        Add Member
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {isEditModalOpen && (
                <div id="edit-modal" tabIndex={-1} aria-hidden="true" className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Edit Member
                                </h3>
                                <button
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                    data-modal-hide="edit-modal"
                                    onClick={closeEditModal}
                                >
                                    X
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="p-4 md:p-5">
                                <form className="space-y-4" onSubmit={handleEditFormSubmit}>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Member email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                            placeholder="name@iiitkottayam.ac.in"
                                            value={editMember.email}
                                            onChange={handleEditInputChange}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Member Title</label>
                                        <select
                                            name="title"
                                            id="title"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                            value={editMember.title}
                                            onChange={handleEditInputChange}
                                        >
                                            <option value="Club Lead">Club Lead</option>
                                            <option value="Tech Lead">Tech Lead</option>
                                            <option value="Design Lead">Design Lead</option>
                                            <option value="PR Lead">PR Lead</option>
                                            <option value="Research Lead">Research Lead</option>
                                            <option value="Creative Lead">Creative Lead</option>
                                            <option value="Core Member">Core Member</option>
                                            <option value="Tech Sub Lead">Tech Sub Lead</option>
                                            <option value="Design Sub Lead">Design Sub Lead</option>
                                            <option value="PR Sub Lead">PR Sub Lead</option>
                                            <option value="Research Sub Lead">Research Sub Lead</option>
                                            <option value="Creative Sub Lead">Creative Sub Lead</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                                        <select
                                    
                                            name="status"
                                            id="status"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                            value={editMember.status}
                                            onChange={handleEditInputChange}
                                        >
                                            <option value="current member">current member</option>
                                            <option value="legacy member">legacy member</option>
                                            <option value="previous member">previous member</option>
                                        </select>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        Update Member
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MemberTable;
