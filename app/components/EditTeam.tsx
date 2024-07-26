import React, { useEffect, useState } from "react";
import { cn } from "../utils/cn";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid1";
import { getTeamData, updateTeamPhoto, addTeamData } from "../firebase/addData"; // Adjust the import path as needed
import { Edit2Icon, PlusIcon } from "lucide-react";

export default function TeamGrid({ year = "2024" }) {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ name: "", title: "Club Lead", image: null, year: "" });
    const [selectedItemId, setSelectedItemId] = useState(null);

    const roles = [
        "Club Lead", "Tech Lead", "Design Lead", "PR Lead",
        "Research Lead", "Creative Lead", "Tech Sub Lead",
        "Design Sub Lead", "PR Sub Lead", "Research Sub Lead",
        "Creative Sub Lead"
    ];

    useEffect(() => {
        async function fetchData() {
            const { result, error } = await getTeamData(year);
            if (error) {
                setError(error);
            } else {
                const sortedItems = result.sort((a, b) => {
                    return roles.indexOf(a.title) - roles.indexOf(b.title);
                });
                setItems(sortedItems);
            }
        }

        fetchData();
    }, [year]);

    const handleFileChange = async (event, itemId) => {
        const file = event.target.files[0];
        if (file) {
            const { error } = await updateTeamPhoto(itemId, file);
            if (error) {
                setError(error);
            } else {
                // Refresh data after upload
                const { result, error } = await getTeamData(year);
                if (error) {
                    setError(error);
                } else {
                    const sortedItems = result.sort((a, b) => {
                        return roles.indexOf(a.title) - roles.indexOf(b.title);
                    });
                    setItems(sortedItems);
                }
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const { name, title, year, image } = formData;
        if (selectedItemId) {
            // Update existing item logic if needed
        } else {
            // Add new item logic
            const { result, error } = await addTeamData("team", { name, title, year });
            if (error) {
                setError(error);
            } else if (image && result.id) {
                const { error: uploadError } = await updateTeamPhoto(result.id, image);
                if (uploadError) {
                    setError(uploadError);
                }
            }
            setFormData({ name: "", title: "", image: null, year: "" });
            setIsModalOpen(false);
            const { result: updatedItems, error: fetchError } = await getTeamData(year);
            if (fetchError) {
                setError(fetchError);
            } else {
                const sortedItems = updatedItems.sort((a, b) => {
                    return roles.indexOf(a.title) - roles.indexOf(b.title);
                });
                setItems(sortedItems);
            }
        }
    };

    const openEditModal = (item) => {
        setSelectedItemId(item.id);
        setFormData({ name: item.name, title: item.title, image: null, year: item.year });
        setIsModalOpen(true);
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
                {items.map((item, i) => (
                    <BentoGridItem
                        key={i}
                        title={item.name}
                        description={
                            <div className="grid grid-cols-2">
                                <span className="col-span-1">
                                    {item.title} (Click to Edit)
                                </span>
                            </div>
                        }
                        header={
                            <div className="w-full h-52 overflow-hidden rounded-xl flex items-center justify-center">
                                <img src={item.path} alt={item.name} className="w-full h-full object-cover rounded-xl" />
                            </div>
                        }
                        className={item.className || "md:col-span-1"}
                        icon=""
                        onClick={() => openEditModal(item)}
                    />
                ))}
                <div className="flex items-center justify-center w-full h-20 bg-gray-200 rounded-lg cursor-pointer" onClick={() => { setIsModalOpen(true); setSelectedItemId(null); }}>
                    <PlusIcon className="w-8 h-8 text-gray-600" />
                </div>
            </BentoGrid>

            {isModalOpen && (
                <div id="authentication-modal" tabIndex={-1} aria-hidden="true" className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    {selectedItemId ? "Edit Member" : "Add Member"}
                                </h3>
                                <button
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    X
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="p-4 md:p-5">
                                <form className="space-y-4" onSubmit={handleFormSubmit}>
                                    <div>
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Member Name</label>
                                        <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="John Doe" required value={formData.name} onChange={handleInputChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Member Title</label>
                                        <select name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required value={formData.title} onChange={handleInputChange}>
                                            {roles.map((role) => (
                                                <option key={role} value={role}>{role}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="year" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Year</label>
                                        <input type="text" name="year" id="year" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="2024" required value={formData.year} onChange={handleInputChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Member Image</label>
                                        <input type="file" name="image" id="image" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" accept="image/*" onChange={handleImageChange} />
                                    </div>
                                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{selectedItemId ? "Edit Member" : "Add Member"}</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
