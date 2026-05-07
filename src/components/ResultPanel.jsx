export function ResultPanel({ type = "result", title, children }) {
  if (!children) {
    return null;
  }

  if (type === "error") {
    return (
      <div className="error active">
        <strong>Error:</strong>
        <div className="error-copy">{children}</div>
      </div>
    );
  }

  return (
    <div className="result active">
      {title ? <h3>{title}</h3> : null}
      <div>{children}</div>
    </div>
  );
}
