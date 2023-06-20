import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const MyComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let sendData = {
        courseId: course.course,
      };
      const res = await axios.post(
        "http://localhost:5000/api/modules/course",
        sendData
      );
      console.log(res.data);
      // setData(res);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDragEnd = (result) => {
    // handle drag end logic here
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      {data.map((item) => (
        <Droppable droppableId={item.id} key={item.id}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{
                background: snapshot.isDraggingOver ? "lightblue" : "white",
                padding: "10px",
                margin: "10px",
              }}
            >
              <h3>{item.title}</h3>
              {item.children.map((child, index) => (
                <Draggable draggableId={child.id} index={index} key={child.id}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        userSelect: "none",
                        padding: "10px",
                        margin: "10px",
                        backgroundColor: snapshot.isDragging
                          ? "lightgreen"
                          : "white",
                        ...provided.draggableProps.style,
                      }}
                    >
                      {child.title}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      ))}
    </DragDropContext>
  );
};

export default MyComponent;
