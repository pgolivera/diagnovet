import "./WorkInProgress.css";

interface WorkInProgressProps {
  title?: string;
  message?: string;
  showLogo?: boolean;
}

function WorkInProgress({
  title = "Coming Soon",
  message = "Transforming veterinary medicine with artificial intelligence. Stay tuned!",
  showLogo = true,
}: WorkInProgressProps) {
  return (
    <div className="wip-container">
      <div className="wip-content">
        {showLogo && (
          <div className="wip-logo">
            <span className="wip-logo-text">DV</span>
          </div>
        )}
        <h1 className="wip-title">{title}</h1>
        <p className="wip-message">{message}</p>
      </div>
    </div>
  );
}

export default WorkInProgress;
