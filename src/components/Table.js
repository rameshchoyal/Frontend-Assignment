"use client";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import AddDesign from "./AddDesign";
import { initialStatesData } from "../data/KurtaData";
import Image from "next/image";

export default function Table() {
  const [states, setStates] = useState(initialStatesData);
  const [variantCount, setVariantCount] = useState(2);
  const [notification, setNotification] = useState("");
  const [showAddDesign, setShowAddDesign] = useState(false);
  const [designStateIndex, setDesignStateIndex] = useState(null);
  const [designVariantIndex, setDesignVariantIndex] = useState(null);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification("");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const showNotification = (message) => {
    setNotification(message);
  };

  const handleAddState = () => {
    const newState = {
      id: `${states.length + 1}`,
      filter: ["New Filter"],
      variant: Array(variantCount).fill({
        title: "New Variant",
        img: "",
      }),
    };
    setStates([...states, newState]);
    showNotification("✅ State added");
  };

  const handleRemoveState = (index) => {
    const newStates = [...states];
    newStates.splice(index, 1);
    setStates(newStates);
    showNotification("❎ State removed");
  };

  const handleAddVariant = () => {
    setVariantCount(variantCount + 1);
    const newStates = states.map((state) => ({
      ...state,
      variant: [...state.variant, { title: "New Variant", img: "" }],
    }));
    setStates(newStates);
    showNotification("✅ Variant added");
  };

  const handleRemoveVariant = (index) => {
    if (variantCount > 1) {
      setVariantCount(variantCount - 1);
      const newStates = states.map((state) => ({
        ...state,
        variant: state.variant.slice(0, -1),
      }));

      setStates(newStates);
      showNotification("❎ Variant removed");
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedStates = Array.from(states);
    const [removed] = reorderedStates.splice(result.source.index, 1);
    reorderedStates.splice(result.destination.index, 0, removed);
    setStates(reorderedStates);
  };

  const handleShowAddDesign = (stateIndex, variantIndex) => {
    setDesignStateIndex(stateIndex);
    setDesignVariantIndex(variantIndex);
    setShowAddDesign(true);
  };

  const closeAddDesign = () => {
    setShowAddDesign(false);
  };

  const handleSelectDesign = (design) => {
    if (designStateIndex !== null && designVariantIndex !== null) {
      const newStates = [...states];
      newStates[designStateIndex].variant[designVariantIndex] = {
        title: design.title,
        img: design.img,
      };
      setStates(newStates);
      showNotification("✅ Design added");
      closeAddDesign();
    }
  };

  return (
    <div className="relative p-4 mt-4 bg-[#f9fbfc] border rounded-lg">
      {showAddDesign && (
        <div className="absolute z-50 flex text-center justify-center mt-20 ">
          <AddDesign
            onClose={closeAddDesign}
            onSelectDesign={handleSelectDesign}
          />
        </div>
      )}
      {notification && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 text-black p-2 shadow-md rounded z-50">
          {notification}
        </div>
      )}
      <div className="overflow-x-auto">
        <div className="min-w-max mt-12">
          <div className="flex p-2 mb-2">
            <div className="w-16"></div>
            <div className="w-96  font-semibold mr-12 text-center ">
              Product Filter
            </div>
            {Array.from({ length: variantCount }).map((_, i) => (
              <div key={i} className="w-44 font-semibold text-center mr-12 ">
                {`Variant ${i + 1}`}
                <button className="ml-4">&#8942;</button>
              </div>
            ))}
          </div>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="states">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {states.map((state, index) => (
                    <Draggable
                      key={state.id}
                      draggableId={state.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="  p-2 mb-2 flex items-center group bg-[#f9fbfc]"
                        >
                          <div
                            className="flex items-center cursor-move mr-4 relative  "
                            {...provided.dragHandleProps}
                          >
                            <div className="w-8 text-center text-3xl font-sans">
                              {index + 1}
                            </div>
                            <Image
                              src="https://cdn-icons-png.flaticon.com/128/17/17704.png"
                              alt="drag handle"
                              width={16}
                              height={16}
                            />
                            <button
                              className="absolute bottom-8 right-0 text-white opacity-0 group-hover:opacity-100"
                              onClick={() => handleRemoveState(index)}
                            >
                              <Image
                                src="https://cdn-icons-png.flaticon.com/128/6861/6861362.png"
                                alt="delete icon"
                                width={16}
                                height={16}
                                className="cursor-pointer"
                              />
                            </button>
                          </div>

                          <div className="flex-1 flex items-center mt-8">
                            <div className=" w-96 h-40 p-2 border-dashed border-2 text-center bg-white rounded-lg m mr-12 z-20 pt-16">
                              {state.filter.join(", ")}
                            </div>
                            {state.variant.map((variant, i) => (
                              <div
                                key={i}
                                className="  w-44 h-40 p-2 border-dashed border-2 text-center m-1 bg-white rounded-lg mr-12 overflow-hidden  "
                              >
                                {variant.title === "New Variant" && (
                                  <div className="mt-14">
                                    <button
                                      onClick={() =>
                                        handleShowAddDesign(index, i)
                                      }
                                      className="border p-1 rounded-md"
                                    >
                                      Add Design
                                    </button>
                                  </div>
                                )}
                                {variant.title != "New Variant" && (
                                  <Image
                                    src={variant.img}
                                    alt="Variant Image"
                                    width={210}
                                    height={200}
                                    className="rounded-md "
                                  />
                                )}
                                {variant.title != "New Variant" && (
                                  <span className="text-sm">
                                    {variant.title}
                                  </span>
                                )}
                              </div>
                            ))}
                            <button
                              className="ml-2 p-2 bg-white border"
                              onClick={() => handleAddVariant(index)}
                            >
                              ➕
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
      <div className="flex justify-between mb-2">
        <button className="p-2 m-4 bg-white border" onClick={handleAddState}>
          ➕
        </button>
        <div>
          <button
            className="p-2 bg-red-500 text-white"
            onClick={() => handleRemoveVariant(variantCount - 1)}
          >
            Remove Variant
          </button>
        </div>
      </div>
    </div>
  );
}
