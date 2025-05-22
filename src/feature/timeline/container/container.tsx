import TimelineWrapper from "../components/TimelineWrapper";

const TimelineContainer = () => {
  return (
    <section className="timelinebg  py-20">
      <div className="timelinecontainer flex flex-col items-center justify-center ">
        <h1 className="text-blue-100 mb-10 font-neighbor 2xl:text-6xl lg:text-5xl text-3xl">
          Timeline
        </h1>
        <TimelineWrapper />
      </div>
    </section>
  );
};

export default TimelineContainer;
