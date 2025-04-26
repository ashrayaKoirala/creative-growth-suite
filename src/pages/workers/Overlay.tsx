
import ComingSoonPage from "@/components/ComingSoonPage";

const Overlay = () => {
  return (
    <ComingSoonPage
      title="Emoji Overlay Generator"
      description="Apply popping emoji overlays based on transcript keywords"
      returnPath="/workers"
      returnLabel="Back to Workers"
    />
  );
};

export default Overlay;
