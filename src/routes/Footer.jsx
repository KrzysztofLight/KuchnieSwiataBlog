"use client";

import React, { useState, useEffect, useContext } from 'react';
import { DarkThemeToggle } from 'flowbite-react';
import { Footer } from 'flowbite-react';
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from 'react-icons/bs';

function useThemeMode() {
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    const updateTheme = () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      setTheme(isDarkMode ? 'light' : 'dark');
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => {
      observer.disconnect();
    };
  }, []);
  return theme;
}

function FooterComponent() {

    const theme = useThemeMode();
    const [logo, setLogo] = useState('/Images/LogoLight.png');
    useEffect(() => {
      setLogo(theme === 'dark' ? '/Images/LogoDark.png' : '/Images/LogoLight.png');
    }, [theme]);

  return (
    <Footer container className='mt-10'>
      <div className="w-full ">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div>
            <Footer.Brand
              href="/"
              src={logo}
              alt="KuchnieSwiataBlog Logo"
              name="KuchnieSwiataBlog"
            />
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link href="/">KuchnieSwiataBlog</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link href="https://github.com/KrzysztofLight" target='_blank'>Github</Footer.Link>
                <Footer.Link href="https://discord.com/" target='_blank'>Discord</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="https://www.sejm.gov.pl/prawo/konst/polski/kon1.htm" target='_blank'>Privacy Policy</Footer.Link>
                <Footer.Link href="https://www.sejm.gov.pl/prawo/konst/polski/kon1.htm" target='_blank'>Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href="#" by="KuchnieSwiataBlog™" year={new Date().getFullYear()} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="https://www.facebook.com/" target='_blank' icon={BsFacebook} />
            <Footer.Icon href="https://www.instagram.com/" target='_blank' icon={BsInstagram} />
            <Footer.Icon href="https://x.com" target='_blank' icon={BsTwitter} />
            <Footer.Icon href="https://github.com/KrzysztofLight" target='_blank' icon={BsGithub} />
            <Footer.Icon href="#" icon={BsDribbble} />
          </div>
        </div>
      </div>
    </Footer>
  );
}

export default FooterComponent;