
import ComingSoonPage from "@/components/ComingSoonPage";

const SilenceRemover = () => {
  return (
    <ComingSoonPage
      title="Silence Remover"
      description="Automatically remove silent parts from videos or audio"
      returnPath="/workers"
      returnLabel="Back to Workers"
    />
  );
};

export default SilenceRemover;
