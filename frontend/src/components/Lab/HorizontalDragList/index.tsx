import { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";

export default function HorizontalDragList(){
  const [items, setItems] = useState([
    { id: "1", content: "Item 1" },
    { id: "2", content: "Item 2" },
    { id: "3", content: "Item 3" },
    { id: "4", content: "Item 4" },
  ]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const newItems = [...items];
    const [movedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, movedItem);
    setItems(newItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="horizontal-list" direction="horizontal">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              display: "flex",
              gap: "10px",
              padding: "10px",
              overflowX: "auto",
              transition: "all 0.3s ease-in-out", 
            }}
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      padding: "15px",
                      backgroundColor: snapshot.isDragging ? "#ddd" : "#f0f0f0",
                      borderRadius: "5px",
                      cursor: "grab",
                      minWidth: "80px",
                      textAlign: "center",
                      transition: snapshot.isDragging
                        ? "none"
                        : "transform 0.3s ease-in-out, background-color 0.3s ease-in-out",
                      willChange: "transform",
                      boxShadow: snapshot.isDragging
                        ? "0px 4px 10px rgba(0, 0, 0, 0.2)"
                        : "none",
                      ...provided.draggableProps.style,
                    }}
                  >
                    {item.content}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
