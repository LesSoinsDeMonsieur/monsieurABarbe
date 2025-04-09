import React from 'react';
import Link from 'next/link';

function Footer(){
    return(
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; Les soins de monsieur. All rights reserved.</p>
                <ul className="social-links">
                    <li><Link href="#">Facebook</Link></li>
                    <li><Link href="#">Twitter</Link></li>
                    <li><Link href="#">LinkedIn</Link></li>
                </ul>
            </div>
        </footer>

    )
}

export default Footer;