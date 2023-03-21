import Link from 'next/link';

const Navigation = () => {
  return (
    <ul>
      <li>
        <Link href="/apidoc/scan">
          <label>Scan API</label>
        </Link>
      </li>
      <li>
        <Link href="/apidoc/products">
          <label>Products API</label>
        </Link>
      </li>
      <li>
        <Link href="/apidoc/discounts">
          <label>Discounts API</label>
        </Link>
      </li>
    </ul>
  );
};

export default Navigation;
