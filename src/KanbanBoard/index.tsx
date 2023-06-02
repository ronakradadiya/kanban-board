import { useState } from "react";
import dynamic from "next/dynamic";
import { DropResult } from "react-beautiful-dnd";

const DragDropContext = dynamic(
  () =>
    import("react-beautiful-dnd").then((mod) => {
      return mod.DragDropContext;
    }),
  { ssr: false }
);
const Droppable = dynamic(
  () =>
    import("react-beautiful-dnd").then((mod) => {
      return mod.Droppable;
    }),
  { ssr: false }
);
const Draggable = dynamic(
  () =>
    import("react-beautiful-dnd").then((mod) => {
      return mod.Draggable;
    }),
  { ssr: false }
);

const coursesData = [
  {
    id: 1,
    courseName: "UX Design",
    topics: [
      {
        id: 1,
        name: "Topic 1",
      },
      {
        id: 2,
        name: "Topic 2",
      },
      {
        id: 3,
        name: "Topic 3",
      },
      {
        id: 4,
        name: "Topic 4",
      },
    ],
  },
];

const KanbanBoardContainer = () => {
  const [courses, setCourses] = useState(coursesData);
  const [topics, setTopics] = useState([]);
  const [topicsDone, setTopicsDone] = useState([]);

  const handleSelectCourse = (course: any) => {
    setTopics(course.topics);
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    console.log(result);

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = topics;
    let complete = topicsDone;

    if (source.droppableId === "topics") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === "topics") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setTopicsDone(complete);
    setTopics(active);
  };
  console.log(topics);

  return (
    <section className="flex gap-x-4">
      <aside className="bg-slate-600 h-screen w-[200px] p-3">
        {courses.map((item) => (
          <h3
            key={item.id}
            className="text-center"
            role="button"
            onClick={() => handleSelectCourse(item)}
          >
            {item.courseName}
          </h3>
        ))}
      </aside>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex-1">
          <div className="flex gap-x-4">
            <div className="bg-slate-600 basis-[30%] p-2">
              <h3 className="text-center my-4">Topics</h3>
              <Droppable droppableId="topics">
                {(provided) => (
                  <div
                    className="h-[calc(100%-40px)]"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <div className="flex flex-col gap-y-4">
                      {topics.map((item: any, index: number) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id.toString()}
                          index={index}
                        >
                          {(draggableProvided) => (
                            <div
                              className="bg-white border rounded text-black h-[100px] flex justify-center items-center"
                              ref={draggableProvided.innerRef}
                              {...draggableProvided.draggableProps}
                              {...draggableProvided.dragHandleProps}
                            >
                              {item.name}
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>

            <div className="bg-slate-600 h-screen basis-[30%] p-2">
              <h3 className="text-center my-4">Topics Done</h3>
              <Droppable droppableId="topicsDone">
                {(provided) => (
                  <div
                    className="h-[calc(100%-40px)]"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <div className="flex flex-col gap-y-4">
                      {topicsDone.map((item: any, index: number) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id.toString()}
                          index={index}
                        >
                          {(draggableProvided) => (
                            <div
                              key={item.id}
                              className="bg-white border rounded text-black h-[100px] flex justify-center items-center"
                              ref={draggableProvided.innerRef}
                              {...draggableProvided.draggableProps}
                              {...draggableProvided.dragHandleProps}
                            >
                              {item.name}
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        </div>
      </DragDropContext>
    </section>
  );
};

export default KanbanBoardContainer;
