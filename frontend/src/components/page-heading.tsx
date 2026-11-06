import type { ReactNode } from 'react';

interface PageHeadingProps {
  title: string;
  description?: string;
  leading?: ReactNode;
  actions?: ReactNode;
}

export function PageHeading({ title, description, leading, actions }: PageHeadingProps) {
  return (
    <header className="page-heading">
      <div className="page-heading-main">
        {leading}
        <div className="page-heading-copy">
          <h1>{title}</h1>
          {description && <p>{description}</p>}
        </div>
      </div>
      {actions && <div className="page-heading-actions">{actions}</div>}
    </header>
  );
}
