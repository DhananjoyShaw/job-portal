import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Github } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <div>
                            <h2 className="text-2xl font-bold text-white">Job<span className="text-[#F83002]">Forge</span></h2>
                            <p className="text-gray-300 mt-2 text-sm">
                                Connecting talented professionals with their dream opportunities.
                                Find your next career move or hire the perfect candidate.
                            </p>
                        </div>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="https://twitter.com" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="https://linkedin.com" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="https://instagram.com" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="https://github.com" className="text-gray-400 hover:text-white transition-colors" aria-label="GitHub">
                                <Github className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* For Job Seekers */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">For Job Seekers</h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><Link to="/jobs" className="hover:text-white transition-colors">Browse Jobs</Link></li>
                            <li><Link to="/browse" className="hover:text-white transition-colors">Search Jobs</Link></li>
                            <li><Link to="/profile" className="hover:text-white transition-colors">My Profile</Link></li>
                            <li><a href="#" className="hover:text-white transition-colors">Career Advice</a></li>
                        </ul>
                    </div>

                    {/* For Admin */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">For Admin</h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><Link to="/admin/companies" className="hover:text-white transition-colors">Post a Job</Link></li>
                            <li><Link to="/admin/jobs" className="hover:text-white transition-colors">Manage Jobs</Link></li>
                            <li><a href="#" className="hover:text-white transition-colors">Pricing Plans</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
                        </ul>
                    </div>

                    {/* Contact & Support */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Contact & Support</h3>
                        <div className="space-y-3 text-sm text-gray-300">
                            <div className="flex items-center space-x-2">
                                <Mail className="w-4 h-4 text-gray-400" />
                                <span>support@jobforge.com</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Phone className="w-4 h-4 text-gray-400" />
                                <span>+91 9982484784</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <MapPin className="w-4 h-4 text-gray-400" />
                                <span>700105, New Town, Kolkata</span>
                            </div>
                        </div>
                        <div className="pt-2">
                            <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Help Center</a>
                            <span className="text-gray-500 mx-2">•</span>
                            <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Contact Us</a>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-800 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-sm text-gray-400">
                            <p>&copy; 2024 JobForge. All rights reserved.</p>
                        </div>
                        <div className="flex space-x-6 text-sm text-gray-400">
                            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                            <a href="#" className="hover:text-white transition-colors">Accessibility</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

