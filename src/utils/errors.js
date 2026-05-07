export function getIssueMessage(issue) {
  if (!issue) {
    return "";
  }

  if (typeof issue === "string") {
    return issue;
  }

  return issue.message || issue.detail || JSON.stringify(issue);
}

export function formatValidationFeedback({ message = "", errors = [], warnings = [] }) {
  const lines = [];

  if (message) {
    lines.push(message);
  }

  errors.map(getIssueMessage).filter(Boolean).forEach((error) => {
    lines.push(`Error: ${error}`);
  });

  warnings.map(getIssueMessage).filter(Boolean).forEach((warning) => {
    lines.push(`Warning: ${warning}`);
  });

  return lines.join("\n");
}

export function parseWarningHeader(response) {
  const rawWarnings = response.headers.get("X-LigandHub-Warnings");
  if (!rawWarnings) {
    return [];
  }

  try {
    const parsed = JSON.parse(rawWarnings);
    return Array.isArray(parsed)
      ? parsed.map(getIssueMessage).filter(Boolean)
      : [];
  } catch {
    return [];
  }
}

export async function getErrorMessage(response) {
  const textResponse = response.clone();

  try {
    const errorData = await response.json();
    const detail = errorData?.detail;

    if (detail && typeof detail === "object") {
      const formatted = formatValidationFeedback({
        message: detail.message || "",
        errors: detail.errors || [],
        warnings: detail.warnings || []
      });

      if (formatted) {
        return formatted;
      }
    }

    if (typeof errorData.detail === "string" && errorData.detail.trim()) {
      return errorData.detail;
    }

    return JSON.stringify(errorData);
  } catch {
    try {
      const errorText = await textResponse.text();
      if (errorText.trim()) {
        return errorText;
      }
    } catch {
      // Fall back to the default message below.
    }

    return `Request failed with status ${response.status}`;
  }
}

export async function getBatchErrorData(response) {
  const textResponse = response.clone();

  try {
    const errorData = await response.json();
    if (errorData && typeof errorData === "object") {
      return errorData;
    }
  } catch {
    try {
      const errorText = await textResponse.text();
      if (errorText.trim()) {
        return { detail: errorText };
      }
    } catch {
      // Fall back to a status-based message below.
    }
  }

  return { detail: `Request failed with status ${response.status}` };
}
