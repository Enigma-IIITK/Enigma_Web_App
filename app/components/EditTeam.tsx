import React, { useEffect, useState } from "react";
import { cn } from "../utils/cn";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid1";
import { getTeamData, updateTeamPhoto, addTeamData } from "../firebase/addData"; // Adjust the import path as needed
import { Edit2Icon, PlusIcon } from "lucide-react";

export default function TeamGrid({ year }) {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ name: "", title: "", image: null,year:"" });
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
                setItems(result);
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
                    setItems(result);
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
        const { name, title, image } = formData;
        if (selectedItemId) {
            // Update existing item logic if needed
        } else {
            // Add new item logic
            const { result, error } = await addTeamData("team", { name, title });
            if (error) {
                setError(error);
            } else if (image && result.id) {
                const { error: uploadError } = await updateTeamPhoto(result.id, image);
                if (uploadError) {
                    setError(uploadError);
                }
            }
            setFormData({ name: "", title: "", image: null ,year:""});
            setIsModalOpen(false);
            const { result: updatedItems, error: fetchError } = await getTeamData(year);
            if (fetchError) {
                setError(fetchError);
            } else {
                setItems(updatedItems);
            }
        }
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
                                    {item.title}
                                </span>
                                <div className="col-span-1">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        id={`file-input-${item.id}`}
                                        onChange={(event) => handleFileChange(event, item.id)}
                                    />
                                    <label
                                        htmlFor={`file-input-${item.id}`}
                                        className="mt-2 inline-block backdrop-blur-md text-white font-medium px-4 rounded cursor-pointer"
                                    >
                                        <Edit2Icon />
                                    </label>
                                </div>
                            </div>
                        }
                        header={
                            <div>
                                <img src={item.path} alt={item.name} className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl" />
                            </div>
                        }
                        className={item.className || "md:col-span-1"}
                        icon=""
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
                                        <input type="text" name="year" id="year" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="John Doe" required value={formData.year} onChange={handleInputChange} />
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

TeamGrid.defaultProps = {
    year: "2024", // default year
};
