import { Toaster } from "react-hot-toast"

import { Helmet } from 'react-helmet'
import Header from "./Header"
import Footer from "./Footer"


const Layout = ({ children, title, description, keywords, author }) => {
    return (
        <div className="wraperAllWeb">
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <title>{title}</title>

            </Helmet>
            <Header />
            <Toaster position="top-center"
                reverseOrder={false} />
            <main>{children}</main>
            <Footer />
        </div>
    )
}

Layout.defaultProps = {
    title: "ecommerce",
    description: "Cang",
    keywords: "React.js, Node.js, MongoDb",
    author: 'Nguyễn Đình Cang'
}

export default Layout