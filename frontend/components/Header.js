import React, { Component } from "react";
import Link from "next/link";

const linkStyle = {
    marginRight: 15
};

class Header extends Component {
    constructor() {
        super();
        this.state = {
            menu: []
        };
    }
    componentDidMount() {
        const menuItemsURL =
            "http://localhost:8080/wp-json/menus/v1/menus/main";
        fetch(menuItemsURL)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    menu: res.items
                });
            });
    }
    getSlug(url) {
        const parts = url.split("/");
        return parts.length > 2 ? parts[parts.length - 2] : "";
    }
    render() {
        const menuItems = this.state.menu.map((item, index) => {
            if (item.object === "custom") {
                return (
                    <Link href={item.url} key={item.ID}>
                        <a style={linkStyle}>{item.title}</a>
                    </Link>
                );
            }
            const slug = this.getSlug(item.url);
            return (
                <Link
                    as={`/${item.object}/${slug}`}
                    href={`/post?slug=${slug}&apiRoute=${item.object}`}
                    key={item.ID}
                >
                    <a style={linkStyle}>{item.title}</a>
                </Link>
            );
        });
        return (
            <div>
                <div>
                    <Link href="/">
                        <a style={linkStyle}>Home</a>
                    </Link>
                    {menuItems}
                </div>
                <img
                    src="/static/images/wordpress-plus-react-header.png"
                    width="1024"
                />
            </div>
        );
    }
}

export default Header;
