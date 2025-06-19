interface SubmissionMessageProps {
  leaderName: string;
}

const SubmissionMessage = ({ leaderName }: SubmissionMessageProps) => {
  return (
    <div className="bg-[#1A1650] p-4 rounded-xl text-sm">
      <p><strong>Message!</strong></p>
      <p>Please submit your payment through ...</p>
      <p>If you have any problem, please contact {leaderName || "our team"} 😊</p>
    </div>
  );
};

export default SubmissionMessage;
