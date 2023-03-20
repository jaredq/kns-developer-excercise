import { Inter } from 'next/font/google';
import styles from '../../page.module.css';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>/products</p>
      </div>

      <div className={styles.grid}>
        <a
          href="/apidoc/products/save-product"
          className={styles.card}
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            Save Product <span>-&gt;</span>
          </h2>
          <p className={inter.className}>Add a product.</p>
        </a>
      </div>
    </main>
  );
}
