import { Container } from "@mui/material"
import Footer from "./Footer"
import { Header } from "./Header"
import { Main } from "./Main"

interface LayoutProps {
    children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {

    return (
        <Container sx={{ display: "flex", flexDirection: "column", height: "100vh"}}>
            <Header />
            <Main children={children} />
            <Footer />
        </Container>
    )
}

