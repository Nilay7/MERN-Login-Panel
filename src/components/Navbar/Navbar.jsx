import './Navbar.css';

export default function Navbar() {
    return (
        <nav>
            <div className="container">
                <a href="/" className="logo">Login<span>Panel</span></a>
                <ul>
                    <li><a href='/register'>Register</a></li>
                    <li><a href='/login'>Login</a></li>
                </ul>
            </div>
        </nav>
    );
}