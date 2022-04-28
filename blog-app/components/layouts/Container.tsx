import classnames from 'classnames';

export interface IContainerProps {
  children: React.ReactNode;
  wide?: boolean;
}

export function Container({ children, wide }: IContainerProps) {
  return (
    <div
      className={classnames('container mx-auto px-5', {
        'max-w-3xl': !wide,
      })}
    >
      {children}
    </div>
  );
}
