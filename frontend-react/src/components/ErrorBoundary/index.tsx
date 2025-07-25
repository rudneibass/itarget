import React, { Component, ReactNode } from 'react';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './style.css'

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary capturou um erro:', error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <section className="page_404">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="col-sm-12 text-center">
                  <div className="four_zero_four_bg">
                  </div>
                  <div className="contant_box_404">
                      <h1 className="text-danger">Ops! Algo deu errado.</h1>
                      <p className="text-muted">{this.state.error?.message || 'Ocorreu um erro inesperado.'}</p>
                    <a href="" className="link_404">Voltar para a Página Inicial</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
