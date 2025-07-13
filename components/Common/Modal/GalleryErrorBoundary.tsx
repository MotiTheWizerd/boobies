"use client";

import React from "react";

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class GalleryErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Gallery error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex h-full w-full items-center justify-center bg-gray-100 p-4 text-gray-600">
            <div className="text-center">
              <h3 className="mb-2 text-lg font-semibold">Something went wrong</h3>
              <p className="text-sm">{this.state.error?.message || "Failed to load gallery"}</p>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
