import React from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/Sidebar.css';

const Sidebar = ({ currentPage }) => {
    const pages = [
        { name: "General", link: "/gpt" },
        { name: "Sales", link: "/sales" },
        { name: "Diagnostics", link: "/diagnostics" },
        { name: "Warranty", link: "/warranty" },
        { name: "Training", link: "/training" },
        { name: "Learning", link: "/learning" },
        { name: "Refurbished", link: "/refurbished" },
    ];

    return (
        <div className="gpt-sidebar">
            <div className="gpt-section">
                <h3>Explore</h3>
                <ul>
                    {pages.filter(page => page.name !== currentPage).map((page) => (
                        <li key={page.name}>
                            <Link to={page.link} className="sidebar-link">
                                <button className="sidebar-button">{page.name}</button>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
