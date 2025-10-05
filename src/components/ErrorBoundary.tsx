// src/components/ErrorBoundary.tsx
import React from 'react';

type Props = { children: React.ReactNode };

type State = { hasError: boolean; error?: any };

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, info: any) {
    console.error('App crashed:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 text-center">
          <div>
            <h1 className="text-2xl font-bold mb-2">Une erreur est survenue</h1>
            <p className="text-sm text-muted-foreground">Recharge la page. Si le problème persiste, nous corrigerons rapidement.</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
