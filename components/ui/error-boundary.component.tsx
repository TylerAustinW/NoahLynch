"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
    onError?: (error: Error, errorInfo: ErrorInfo) => void;
    resetOnPropsChange?: boolean;
    resetKeys?: Array<string | number>;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
    prevResetKeys: Array<string | number>;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            prevResetKeys: props.resetKeys || [],
        };
    }

    static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
        return {
            hasError: true,
            error,
        };
    }

    static getDerivedStateFromProps(props: ErrorBoundaryProps, state: ErrorBoundaryState): Partial<ErrorBoundaryState> | null {
        const { resetKeys } = props;
        const { prevResetKeys, hasError } = state;

        if (hasError && resetKeys && prevResetKeys) {
            const hasResetKeyChanged = resetKeys.some((resetKey, idx) => prevResetKeys[idx] !== resetKey);

            if (hasResetKeyChanged) {
                return {
                    hasError: false,
                    error: null,
                    prevResetKeys: resetKeys,
                };
            }
        }

        return { prevResetKeys: resetKeys || [] };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        if (process.env.NODE_ENV === "development") {
            console.error("Error caught by ErrorBoundary:", error, errorInfo);
            console.warn("Error Boundary Details");
            console.error("Component Stack:", errorInfo.componentStack);
            console.error("Error Stack:", error.stack);
            console.warn("--------------------------------");
        }

        this.props.onError?.(error, errorInfo);
    }

    render(): ReactNode {
        if (this.state.hasError) {
            return (
                this.props.fallback || (
                    <div className="bg-destructive/10 flex min-h-[200px] flex-col items-center justify-center rounded-md p-4">
                        <h2 className="text-destructive mb-2 text-xl font-semibold">Something went wrong</h2>
                        <p className="text-muted-foreground mb-4 text-sm">
                            {this.state.error?.message || "An error occurred while rendering this component"}
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => this.setState({ hasError: false, error: null })}
                                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm transition-colors"
                            >
                                Try again
                            </button>
                            <button
                                onClick={() => window.location.reload()}
                                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-md px-4 py-2 text-sm transition-colors"
                            >
                                Reload page
                            </button>
                        </div>
                    </div>
                )
            );
        }

        return this.props.children;
    }
}
export default ErrorBoundary;
