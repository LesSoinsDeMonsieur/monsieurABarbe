import Link from 'next/link';

function Header(){
    return (
        <header>
            <h1>Les soins de Monsieur</h1>
            <Link href="Home"><img src="/logo.png" alt="Logo" width={100} height={100} /></Link>
            <div>
                <Link href="Login">Se connecter</Link>
            </div>
        </header>
    );
};

export default Header;
