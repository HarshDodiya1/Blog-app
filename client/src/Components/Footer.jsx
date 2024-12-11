import { Footer } from "flowbite-react";
import React from "react";
import { BsGithub, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
import { Link } from "react-router-dom";
import Logo from "../assets/H_Logo2.svg";

export const FooterComponent = () => {
  return (
    <Footer className="border-t border-gray-200 dark:border-gray-800 shadow-inner">
      <div className="w-full max-w-7xl mx-auto p-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <Link
              to="/"
              className="flex items-center gap-3 mb-4 hover:scale-105 transition-transform duration-300"
            >
              <img
                src={Logo}
                alt="Harsh's Blog"
                className="w-10 h-10 rounded-lg"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                Harsh's Blog
              </span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Exploring ideas, sharing knowledge, and building connections
              through meaningful content.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Links
            </h2>
            <ul className="space-y-3">
              <FooterLink href="/" text="Home" />
              <FooterLink href="/about" text="About" />
              <FooterLink href="/contact" text="Contact" />
              <FooterLink href="/dashboard?tab=profile" text="Dashboard" />
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Resources
            </h2>
            <ul className="space-y-3">
              <FooterLink
                href="https://dev.to/harshdodiya1"
                text="DEV.to"
                external
              />
              <FooterLink
                href="https://github.com/HarshDodiya1"
                text="GitHub"
                external
              />
              <FooterLink href="/privacy-policy" text="Privacy Policy" />
              <FooterLink href="/terms" text="Terms & Conditions" />
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
              Follow me on social media for the latest updates and tech
              insights.
            </p>
            <div className="flex space-x-4">
              <SocialIcon
                href="https://github.com/HarshDodiya1"
                icon={BsGithub}
              />
              <SocialIcon
                href="https://www.linkedin.com/in/harsh-dodiya-197283255/"
                icon={BsLinkedin}
              />
              <SocialIcon
                href="https://twitter.com/harshh88"
                icon={BsTwitter}
              />
              <SocialIcon
                href="https://www.instagram.com/harsh_dodiya123/"
                icon={BsInstagram}
              />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} Harsh's Blog. All rights reserved.
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Made with ❤️ by{" "}
              <a
                href="https://www.linkedin.com/in/harsh-dodiya-197283255/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-500 hover:text-purple-600 transition-colors duration-300"
              >
                Harsh Dodiya
              </a>
            </div>
          </div>
        </div>
      </div>
    </Footer>
  );
};

// Helper Components
const FooterLink = ({ href, text, external }) => (
  <li>
    <a
      href={href}
      target={external ? "_blank" : "_self"}
      rel={external ? "noopener noreferrer" : ""}
      className="text-gray-500 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors duration-300"
    >
      {text}
    </a>
  </li>
);

const SocialIcon = ({ href, icon: Icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-500 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors duration-300"
  >
    <Icon className="w-5 h-5" />
  </a>
);
