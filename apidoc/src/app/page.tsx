import { Inter } from 'next/font/google';
import styles from './page.module.css';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>API Documents</p>
      </div>

      <div className={styles.grid}>
        <a
          href="/apidoc/products"
          className={styles.card}
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            Products <span>-&gt;</span>
          </h2>
          <p className={inter.className}>Add a product.</p>
        </a>

        <a
          href="/apidoc/discounts"
          className={styles.card}
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            Discounts <span>-&gt;</span>
          </h2>
          <p className={inter.className}>Add a discount deal.</p>
        </a>

        <a
          href="/apidoc/scan"
          className={styles.card}
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            Scan <span>-&gt;</span>
          </h2>
          <p className={inter.className}>Scan the basket.</p>
        </a>
      </div>
    </main>
  );
}
