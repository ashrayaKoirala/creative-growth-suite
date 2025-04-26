
import ComingSoonPage from "@/components/ComingSoonPage";

const Sessions = () => {
  return (
    <ComingSoonPage
      title="Session Logs"
      description="View history of deep work sessions: durations, tasks, dates"
      returnPath="/dashboard"
      returnLabel="Back to Dashboard"
    />
  );
};

export default Sessions;
