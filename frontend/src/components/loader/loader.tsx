import './loader.scss';

type LoaderProps = {
  children: string;
  className?: string;
};

function Loader({ children, className }: LoaderProps) {
  return <p className={`loader ${className ? className : ''}`}>{children}</p>;
}

export default Loader;
