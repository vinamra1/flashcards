import styles from './Container.module.css';

interface ContainerProps {
  children: React.ReactNode;
}

function Container({ children }: ContainerProps) {
  return <div className={styles.container}>{children}</div>;
}

export default Container; 