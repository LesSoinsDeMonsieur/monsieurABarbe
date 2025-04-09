import React from 'react';
import Link from 'next/link';

function Footer(){
    return(
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; Les soins de monsieur. All rights reserved.</p>
                <ul className="social-links">
                    <li><Link href="/Header">Facebook</Link></li>
                </ul>
            </div>
        </footer>

    )
}

export default Footer;