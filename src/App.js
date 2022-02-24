import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { Route, useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import { AppTopbar } from "./AppTopbar";
import { AppMenu } from "./AppMenu";

import { Dashboard } from "./components/Dashboard";

import { Crud } from "./pages/Crud";

import PrimeReact from "primereact/api";
import { Tooltip } from "primereact/tooltip";

import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "prismjs/themes/prism-coy.css";
import "./assets/demo/flags/flags.css";
import "./assets/demo/Demos.scss";
import "./assets/layout/layout.scss";
import "./App.scss";

const App = () => {
    const [staticMenuInactive, setStaticMenuInactive] = useState(false);
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [mobileTopbarMenuActive, setMobileTopbarMenuActive] = useState(false);
    const copyTooltipRef = useRef();
    const location = useLocation();

    PrimeReact.ripple = true;

    let menuClick = false;
    let mobileTopbarMenuClick = false;

    useEffect(() => {
        if (mobileMenuActive) {
            addClass(document.body, "body-overflow-hidden");
        } else {
            removeClass(document.body, "body-overflow-hidden");
        }
    }, [mobileMenuActive]);

    useEffect(() => {
        copyTooltipRef && copyTooltipRef.current && copyTooltipRef.current.updateTargetEvents();
    }, [location]);

    const onWrapperClick = (event) => {
        if (!menuClick) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }

        if (!mobileTopbarMenuClick) {
            setMobileTopbarMenuActive(false);
        }

        mobileTopbarMenuClick = false;
        menuClick = false;
    };

    const onToggleMenuClick = (event) => {
        menuClick = true;

        if (isDesktop()) {
            setStaticMenuInactive((prevState) => !prevState);
        } else {
            setMobileMenuActive((prevState) => !prevState);
        }

        event.preventDefault();
    };

    const onSidebarClick = () => {
        menuClick = true;
    };

    const onMobileTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;

        setMobileTopbarMenuActive((prevState) => !prevState);
        event.preventDefault();
    };

    const onMobileSubTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;

        event.preventDefault();
    };

    const onMenuItemClick = (event) => {
        if (!event.item.items) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }
    };
    const isDesktop = () => {
        return window.innerWidth >= 992;
    };

    const menu = [
        {
            items: [
                {
                    label: "Dashboard",
                    icon: "pi pi-fw pi-home",
                    to: "/",
                },
            ],
        },

        {
            icon: "pi pi-fw pi-search",
            items: [
                {
                    label: "System Configuration",
                    icon: "pi pi-fw pi-bookmark",
                    items: [
                        {
                            label: "IP Management",
                            icon: "pi pi-fw pi-bookmark",
                            to: "/crud",
                        },
                        {
                            label: "DNS Management",
                            icon: "pi pi-fw pi-bookmark",
                        },
                        {
                            label: "NTP Management",
                            icon: "pi pi-fw pi-bookmark",
                        },
                        {
                            label: "Syslog Management",
                            icon: "pi pi-fw pi-bookmark",
                        },
                        {
                            label: "Sandbox Management",
                            icon: "pi pi-fw pi-bookmark",
                        },
                        {
                            label: "User Management",
                            icon: "pi pi-fw pi-bookmark",
                        },
                        {
                            label: "Access Control List",
                            icon: "pi pi-fw pi-bookmark",
                        },
                        {
                            label: "Email Notify Settings",
                            icon: "pi pi-fw pi-bookmark",
                        },
                    ],
                },
                {
                    label: "HTTP Services",
                    icon: "pi pi-fw pi-bookmark",
                    items: [
                        {
                            label: "IP Management",
                            icon: "pi pi-fw pi-bookmark",
                        },
                        {
                            label: "DNS Management",
                            icon: "pi pi-fw pi-bookmark",
                        },
                        {
                            label: "NTP Management",
                            icon: "pi pi-fw pi-bookmark",
                        },
                        {
                            label: "Syslog Management",
                            icon: "pi pi-fw pi-bookmark",
                        },
                        {
                            label: "Sandbox Management",
                            icon: "pi pi-fw pi-bookmark",
                        },
                        {
                            label: "User Management",
                            icon: "pi pi-fw pi-bookmark",
                        },
                        {
                            label: "Access Control List",
                            icon: "pi pi-fw pi-bookmark",
                        },
                        {
                            label: "Email Notify Settings",
                            icon: "pi pi-fw pi-bookmark",
                        },
                    ],
                },
                {
                    label: "LDAP Services",
                    icon: "pi pi-fw pi-bookmark",
                    items: [
                        {
                            label: "IP Management",
                            icon: "pi pi-fw pi-bookmark",
                        },
                        {
                            label: "DNS Management",
                            icon: "pi pi-fw pi-bookmark",
                        },
                        {
                            label: "NTP Management",
                            icon: "pi pi-fw pi-bookmark",
                        },
                        {
                            label: "Syslog Management",
                            icon: "pi pi-fw pi-bookmark",
                        },
                        {
                            label: "Sandbox Management",
                            icon: "pi pi-fw pi-bookmark",
                        },
                        {
                            label: "User Management",
                            icon: "pi pi-fw pi-bookmark",
                        },
                        {
                            label: "Access Control List",
                            icon: "pi pi-fw pi-bookmark",
                        },
                        {
                            label: "Email Notify Settings",
                            icon: "pi pi-fw pi-bookmark",
                        },
                    ],
                },
                {
                    label: "RDP Services",
                    icon: "pi pi-fw pi-bookmark",
                    items: [
                        {
                            label: "IP Management",
                            icon: "pi pi-fw pi-bookmark",
                        },
                        {
                            label: "DNS Management",
                            icon: "pi pi-fw pi-bookmark",
                        },
                        {
                            label: "NTP Management",
                            icon: "pi pi-fw pi-bookmark",
                        },
                        {
                            label: "Syslog Management",
                            icon: "pi pi-fw pi-bookmark",
                        },
                        {
                            label: "Sandbox Management",
                            icon: "pi pi-fw pi-bookmark",
                        },
                        {
                            label: "User Management",
                            icon: "pi pi-fw pi-bookmark",
                        },
                        {
                            label: "Access Control List",
                            icon: "pi pi-fw pi-bookmark",
                        },
                        {
                            label: "Email Notify Settings",
                            icon: "pi pi-fw pi-bookmark",
                        },
                    ],
                },
                {
                    label: "Maintenance",
                    icon: "pi pi-fw pi-bookmark",
                    items: [
                        {
                            label: "IP Management",
                            icon: "pi pi-fw pi-bookmark",
                        },
                        {
                            label: "DNS Management",
                            icon: "pi pi-fw pi-bookmark",
                        },
                        {
                            label: "NTP Management",
                            icon: "pi pi-fw pi-bookmark",
                        },
                        {
                            label: "Syslog Management",
                            icon: "pi pi-fw pi-bookmark",
                        },
                        {
                            label: "Sandbox Management",
                            icon: "pi pi-fw pi-bookmark",
                        },
                        {
                            label: "User Management",
                            icon: "pi pi-fw pi-bookmark",
                        },
                        {
                            label: "Access Control List",
                            icon: "pi pi-fw pi-bookmark",
                        },
                        {
                            label: "Email Notify Settings",
                            icon: "pi pi-fw pi-bookmark",
                        },
                    ],
                },
                {
                    label: "Reporting",
                    icon: "pi pi-fw pi-bookmark",
                    items: [
                        {
                            label: "IP Management",
                            icon: "pi pi-fw pi-bookmark",
                        },
                        {
                            label: "DNS Management",
                            icon: "pi pi-fw pi-bookmark",
                        },
                        {
                            label: "NTP Management",
                            icon: "pi pi-fw pi-bookmark",
                        },
                        {
                            label: "Syslog Management",
                            icon: "pi pi-fw pi-bookmark",
                        },
                        {
                            label: "Sandbox Management",
                            icon: "pi pi-fw pi-bookmark",
                        },
                        {
                            label: "User Management",
                            icon: "pi pi-fw pi-bookmark",
                        },
                        {
                            label: "Access Control List",
                            icon: "pi pi-fw pi-bookmark",
                        },
                        {
                            label: "Email Notify Settings",
                            icon: "pi pi-fw pi-bookmark",
                        },
                    ],
                },
            ],
        },
    ];

    const addClass = (element, className) => {
        if (element.classList) element.classList.add(className);
        else element.className += " " + className;
    };

    const removeClass = (element, className) => {
        if (element.classList) element.classList.remove(className);
        else element.className = element.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
    };

    const wrapperClass = classNames("layout-wrapper", {
        "layout-overlay": false,
        "layout-static": true,
        "layout-static-sidebar-inactive": staticMenuInactive && true,
        "layout-overlay-sidebar-active": overlayMenuActive && false,
        "layout-mobile-sidebar-active": mobileMenuActive,
        "p-input-filled": false,
        "p-ripple-disabled": false,
        "layout-theme-light": true,
    });

    return (
        <div className={wrapperClass} onClick={onWrapperClick}>
            <Tooltip ref={copyTooltipRef} target=".block-action-copy" position="bottom" content="Copied to clipboard" event="focus" />

            <AppTopbar onToggleMenuClick={onToggleMenuClick} layoutColorMode="light" mobileTopbarMenuActive={mobileTopbarMenuActive} onMobileTopbarMenuClick={onMobileTopbarMenuClick} onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick} />

            <div className="layout-sidebar" onClick={onSidebarClick}>
                <AppMenu model={menu} onMenuItemClick={onMenuItemClick} layoutColorMode="light" />
            </div>

            <div className="layout-main-container">
                <div className="layout-main">
                    <Route path="/" exact render={() => <Dashboard colorMode="light" />} />
                    <Route path="/crud" component={Crud} />
                </div>
            </div>

            <CSSTransition classNames="layout-mask" timeout={{ enter: 200, exit: 200 }} in={mobileMenuActive} unmountOnExit>
                <div className="layout-mask p-component-overlay"></div>
            </CSSTransition>
        </div>
    );
};

export default App;
