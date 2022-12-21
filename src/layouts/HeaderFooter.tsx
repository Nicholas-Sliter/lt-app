import Header from "../components/Header";

function HeaderFooter({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Header />
            <main className="flex-grow">{children}</main>
            <footer />
        </div>
    );
}

export default HeaderFooter;