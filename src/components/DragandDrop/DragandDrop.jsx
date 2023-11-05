import React, { useState } from "react";
import image1 from "../../image/image-1.webp";
import image2 from "../../image/image-2.webp";
import image3 from "../../image/image-3.webp";
import image4 from "../../image/image-4.webp";
import image5 from "../../image/image-5.webp";
import image6 from "../../image/image-6.webp";
import image7 from "../../image/image-7.webp";
import image8 from "../../image/image-8.webp";
import image9 from "../../image/image-9.webp";
import image10 from "../../image/image-10.jpeg";
import image11 from "../../image/image-11.jpeg";

let imageList = [
  image11,
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
];

const DragandDrop = () => {
  const [count, setCount] = useState(0);
  const [elements, setelements] = useState(imageList);
  const [imageSelect, setImageSelect] = useState([]);
  const [imageIndex, setimageIndex] = useState([]);

  const [draggedItem, setDraggedItem] = useState(null);
  const [draggedOverIndex, setDraggedOverIndex] = useState(null);

  const handleDragStart = (e, index) => {
    console.log(elements[index]);
    setDraggedItem(elements[index]);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index);
  };

  const handleDragOver = (e, index) => {
    // console.log(index, elements[index])
    e.preventDefault();
    const draggedOverItem = elements[index];

    if (draggedItem !== draggedOverItem) {
      const newelements = [...elements];
      newelements.splice(elements.indexOf(draggedItem), 1);
      newelements.splice(index, 0, draggedItem);
      setelements(newelements);
      setDraggedOverIndex(index);
    }
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDraggedOverIndex(null);
  };

  function handleValueToCount(value, event) {
    if (event.target.checked) {
      setCount(count + 1);
      setImageSelect([...imageSelect, value]);
    } else {
      const newImageSelect = imageSelect.filter((img) => img !== value);
      setImageSelect(newImageSelect);
      setCount(count - 1);
    }
  }

  const toggleImageIndex = (index) => {
    if (imageIndex.includes(index)) {
      setimageIndex(imageIndex.filter((i) => i !== index));
    } else {
      setimageIndex([...imageIndex, index]);
    }
  };

  const handleDeleteFiles = () => {
    const remainingImages = elements.filter(
      (_, index) => !imageIndex.includes(index)
    );
    setimageIndex([]);

    setelements(remainingImages);
    setCount(0);
  };

  const handleImageUpload = (e) => {
    console.log(e.target.files[0]);

    const image = e.target.files[0];
    const fromData = new FormData();
    fromData.append("image", image);

    fetch(
      "https://api.imgbb.com/1/upload?&key=fb70d1eaaaaf3643c06f16d2e654b7a0",
      {
        method: "POST",
        body: fromData,
      }
    )
      .then((res) => res.json())
      .then((imgData) => {
        const img = imgData.data.url;
        setelements([...elements, img]);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className=" px-1 md:px-4 ">


      <div className="flex justify-between items-center mx-2 md:mx-5 mb-3">
        {count ? (
          <div className="flex justify-center items-center mt-4  ">
            <input
              type="checkbox"
              defaultChecked
              id="vehicle1"
              name="vehicle1"
              className="w-6 h-6 mr-2"
              value="Bike"
            ></input>
            <h2 className="text-xl font-sans font-bold">
              Files Selected {count}
            </h2>
          </div>
        ) : (
          <h2 className="text-xl font-sans font-bold mt-4"> Gallery </h2>
        )}
        {count ? (
          <p
            onClick={() => handleDeleteFiles()}
            className="text-lg text-red-400 font-serif"
          >
            Delate files
          </p>
        ) : (
          ""
        )}
      </div>

      <ul className="py-4 grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-3 lg:gap-5 mt-2 border-t-2">
        {elements.map((item, index) => (
          <li
            key={index}
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
            // onClick={()=> deleteElement(item)}

            className={`border  ease-in-out border-gray-300 hover:bg-black duration-500 rounded-xl relative container   mb-2 ${
              index === 0 ? "col-span-2 h-full row-span-2 " : "col-span-1 md:h-[280px] h-44 row-span-1"
            } relative group ${
              draggedItem === item ? "shadow-md opacity-0" : ""
            } transition-opacity `}
          >
            <img
              src={item}
              className={`${
                imageIndex.includes(index) ? "opacity-50" : "opacity-100"
              }    rounded-xl child bg-white hover:opacity-50 duration-300 w-full h-full`}
              alt=""
            ></img>

            <input
              onClick={() => handleValueToCount(item, event)}
              onChange={() => toggleImageIndex(index)}
              checked={imageIndex.includes(index)}
              type="checkbox"
              className="absolute top-5 checkInput hidden left-5 w-6 h-6 al"
            ></input>

          </li>
        ))}
    <label htmlFor="fileInput" className="cursor-pointer   rounded-md">
        <div className="text-center md:h-[280px] h-44 f border-2  border-gray-300 border-dashed rounded-lg p-6 flex justify-center items-center flex-col">
         
          <img
            className="mx-auto h-8 w-8"
            src="https://www.svgrepo.com/show/357902/image-upload.svg"
            alt=""
          ></img>

          <input
            type="file"
            className="hidden"
            id="fileInput"
            onChange={handleImageUpload}
          />
        
         
            Add Image
        </div>
          </label>

        {draggedOverIndex !== null && (
          <li
            className="bg-transparent p-2 mb-2 h-8"
            style={{ visibility: "hidden" }}
          >
            &nbsp; 
          </li>
        )}
      </ul>
    </div>
  );
};

export default DragandDrop;
