import logoPath from '../blocks/images/logo.svg';

export default function Header() {
  return (
      <header className="header">
        <img
          className="header__logo"
          src={logoPath}
          alt="around the u.s. logo"
        />
      </header>
  );
}
