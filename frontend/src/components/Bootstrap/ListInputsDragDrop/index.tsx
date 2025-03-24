import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import InputText from "./InputText";
import InputTextarea from "./InputTextarea";
import InputSelect from "./InputSelect";
import InputSelectSearchable from "./InputSelectSearchable";
import InputCheckbox from "./InputCheckbox";

type ListInputsType = {
  data: Array<{
    id: string;
    rules?: string;
    options?: Array<{ option_value: string; option_text: string }>;
    attributes: Record<string, string>;
  }> | undefined;
  actions?: {
    edit?: (itemId: string) => void;
    remove?: (itemId: string) => void;
    activeDeactive?: (itemId: string) => void;
    reorder?: (reorderedList: []) => void;
  };
};

export default function ListInputsDragDrop({ data: initialData, actions }: ListInputsType) {
  const [data, setData] = useState(initialData || []);

  function onDragEnd(result: DropResult){
    if (!result.destination) return;
    const reorderedData = [...data];
    const [movedItem] = reorderedData.splice(result.source.index, 1);
    reorderedData.splice(result.destination.index, 0, movedItem);
    
    handleReorder([])
    setData(reorderedData);
  };

  function handleReorder(reorderedList: []){
    if(actions?.reorder){
      actions.reorder([]);
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="input-list">
        {(provided) => (
          <div className="row" ref={provided.innerRef} {...provided.droppableProps}>
            {data.map((field, index) => (
              <Draggable key={field.id} draggableId={field.id} index={index}>
                {(provided, snapshot) => {
                  return (
                    <div 
                      className={`col-md-${field.attributes?.grid}`} 
                      ref={provided.innerRef} 
                      {...provided.draggableProps} 
                      {...provided.dragHandleProps} 
                    >
                      {(() => {
                        switch (field.attributes?.type) {
                          case "text":
                            return <InputText data={{ id: field.id, attributes: field.attributes, rules: field.rules }} actions={actions} />;
                          case "textarea":
                            return <InputTextarea data={{ id: field.id, attributes: field.attributes, rules: field.rules }} actions={actions} />;
                          case "select":
                            return <InputSelect data={{ id: field.id, attributes: field.attributes, rules: field.rules }} actions={actions} />;
                          case "searchable":
                            return <InputSelectSearchable data={{ id: field.id, attributes: field.attributes, rules: field.rules }} actions={actions} />;
                          case "checkbox":
                            return <InputCheckbox data={{ id: field.id, attributes: field.attributes }} actions={actions} />;
                          default:
                            return null;
                        }
                      })()}
                    </div>
                  );
                }}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
