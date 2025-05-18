import TimelineWrapper from "../components/TimelineWrapper";

const TimelineContainer = () => {
  return (
    <section className="timelinebg min-h-screen  py-44">
      <div className="timelinecontainer flex flex-col items-center justify-center ">
        <h1 className="text-blue-100 mb-10 font-neighbor text-5xl">Timeline</h1>
        <TimelineWrapper />
      </div>
    </section>
  );
};

export default TimelineContainer;
