// import Logo from './LogoTypeA.svg';

export default function TheHeader({}) {
  return (
    <header>
      <img className="logo" src="/img/logo.png" />
      <style jsx>{`
        header {
          padding: 2rem 0 1rem;
          text-align: center;
          width: 100%;
        }
        .logo {
          width: 132px;
        }
      `}</style>
    </header>
  );
}
