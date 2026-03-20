export const siteConfig = {
    name: "E-Shop",
    description: "Premium E-commerce Platform",
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    ogImage: "/og.png",
    links: {
        twitter: "https://twitter.com/eshop",
        github: "https://github.com/eshop",
    },
    mainNav: [
        { title: "Home", href: "/" },
        { title: "Products", href: "/products" },
        { title: "Categories", href: "/categories" },
    ],
    adminNav: [
        { title: "Dashboard", href: "/admin" },
        { title: "Products", href: "/admin/products" },
        { title: "Orders", href: "/admin/orders" },
        { title: "Categories", href: "/admin/categories" },
        { title: "Users", href: "/admin/users" },
    ],
};
