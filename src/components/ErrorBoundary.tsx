
import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    state: State = { hasError: false, error: null };

    static getDerivedStateFromError(error: Error): State {

        return { hasError: true, error: error };

    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error('Error boundary caught an error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <p style={{ color: 'red' }}> {this.state.error?.message}</p>
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
