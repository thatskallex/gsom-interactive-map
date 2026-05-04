import Link from "next/link";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <h1>GSOM Indoor Map MVP</h1>
        <p>Choose a mode to explore the indoor map.</p>
        <div className={styles.links}>
          <Link className={styles.link} href="/organizer">
            Organizer mode
          </Link>
          <Link className={styles.link} href="/visitor">
            Visitor mode
          </Link>
        </div>
      </div>
    </main>
  );
}
