import styles from '../styles/Home.module.css';

export default function Card({ title, imgSrc, children }) {
  return (
    <div className={styles.card}>
      <img className={styles.cardImg} src={imgSrc} />
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}
