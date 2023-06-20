import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const MyComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDragEnd = (result) => {
    // handle drag end logic here
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable-area">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {data.map((item, index) => (
              <Draggable
                draggableId={item.id.toString()}
                index={index}
                key={item.id}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      background: snapshot.isDragging ? "lightgreen" : "white",
                      padding: "10px",
                      margin: "10px",
                    }}
                  >
                    <h3 {...provided.dragHandleProps}>{item.title}</h3>
                    <p>{item.body}</p>
                    <Droppable droppableId={item.id.toString()}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
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

export default MyComponent;
