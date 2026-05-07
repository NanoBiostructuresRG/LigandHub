export function BackendStatus({ status }) {
  if (status === "online") {
    return <div className="status-box status-ok">Service status: online</div>;
  }

  if (status === "checking") {
    return <div className="status-box status-bad">Checking service status...</div>;
  }

  return <div className="status-box status-bad">Service status: unavailable</div>;
}
