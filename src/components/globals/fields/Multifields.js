import React, { useState } from 'react'

const Multifields = () => {

  const [technologies, setTechnologies] = useState([
    { category: "", name: "", description: "" },
  ]);

  const [pictures, setPictures] = useState([{ caption: "", imageUrl: "" }]);




    const addTechnology = () => {
        setTechnologies([
          ...technologies,
          { category: "", name: "", description: "" },
        ]);
      };
    
      // const handleUploadFiles = () => {
      //   const storageRef = firebaseStorage;
    
      //   selectedFiles.forEach((file, index) => {
      //     const fileRef  = ref(firebaseStorage, `/Images/${file?.name}`);
    
      //   });
      // };
    
      const addPicture = () => {
        setPictures([...pictures, { caption: "", imageUrl: "" }]);
      };
    
      const handleTechnologyChange = (index, event) => {
        const updatedTechnologies = [...technologies];
        updatedTechnologies[index][event.target.name] = event.target.value;
        setTechnologies(updatedTechnologies);
      };
    
      const handlePictureChange = (index, event) => {
        const updatedPictures = [...pictures];
        updatedPictures[index][event.target.name] = event.target.value;
        setPictures(updatedPictures);
      };
  return (
    <div>
          <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Technologies
          </label>
          {technologies.map((technology, index) => (
            <div key={index} className="mb-4">
              <input
                type="text"
                name="category"
                className="block appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Category"
                value={technology.category}
                onChange={(e) => handleTechnologyChange(index, e)}
              />
              <input
                type="text"
                name="name"
                className="block appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Technology Name"
                value={technology.name}
                onChange={(e) => handleTechnologyChange(index, e)}
              />
              <input
                type="text"
                name="description"
                className="block appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Description"
                value={technology.description}
                onChange={(e) => handleTechnologyChange(index, e)}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addTechnology}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Technology
          </button>
        </div>
    </div>
  )
}

export default Multifields