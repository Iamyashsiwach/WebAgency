import React from 'react';
import styles from './Footer.module.css';
import StyledLink from '@/components/ui/StyledLink/StyledLink';

const Footer = () => (
  <footer className={styles.footer}>
    <div>Copyright © {new Date().getFullYear()} All rights reserved</div>
    <div>Made with ❤️ by <StyledLink aria-label='Yash Siwach - Portfolio' external href="https://yashsiwach.space">
    Yash Siwach
    </StyledLink></div>
  </footer>
);

export default Footer;
