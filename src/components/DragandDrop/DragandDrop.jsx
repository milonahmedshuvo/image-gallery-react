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
]


const DragandDrop = () => {
  const [count, setCount] = useState(0)
  const [elements, setelements] = useState(imageList);
  const [imageSelect, setImageSelect]= useState([])
  
 



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



   









     

  

 
    

  function  handleValueToCount  (value, event){
    if(event.target.checked){
      setCount(count + 1)
      setImageSelect([...imageSelect, value])  
    }else{
      setCount(count - 1)
      console.log( "Delete", value)
    }
 }


  var array1;
  const handleDeleteFiles = ( ) => {
   
    // array1 = array1.filter(val => !array2.includes(val));   
    array1 = elements.filter(val => !imageSelect.includes(val) );
    console.log(array1)
    setelements(array1)
    setCount(0)
        
  }
 
  
  





  
  return (

    <div>
        <div className="flex justify-between items-center mx-2 md:mx-5">
        <h2 className="text-xl font-sans font-bold mt-4">
         Files Selected {count}
      </h2>
       {
        count ? <p onClick={ ()=> handleDeleteFiles()} className="text-lg text-red-400 font-serif">Delate files</p> : ""
       }
        </div>




      <ul className="py-4 grid  grid-cols-5 gap-5">
        {elements.map((item, index) => (
          <li
            key={index}
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
            // onClick={()=> deleteElement(item)}
            
            className={`border ease-in-out border-gray-300 duration-300 rounded-xl item relative  mb-2 ${
              index === 0 ? "col-span-2 row-span-2" : "col-span-1 row-span-1"
            } relative group ${
              draggedItem === item ? "shadow-md opacity-0" : ""
            } transition-opacity `}
          >
           
            <img src={item} className="rounded-xl child w-full h-full" alt=""></img>

            <input onClick={()=> handleValueToCount(item, event)} type="checkbox" id="vehicle1" name="vehicle1" className="absolute top-5 checkbox hidden left-5 w-6 h-6" value="Bike"></input>
          </li>
        ))}
        {draggedOverIndex !== null && (
          <li
            className="bg-transparent p-2 mb-2 h-8"
            style={{ visibility: "hidden" }}
          >
            &nbsp; {/* Placeholder item */}
          </li>
        )}
      </ul>
    </div>
  );
};

export default DragandDrop;
