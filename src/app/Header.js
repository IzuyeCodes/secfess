
export default function Header() {
    return (
        <nav
            className="flex w-full flex-wrap items-center justify-between bg-zinc-50 py-3 shadow-dark-mild lg:py-4 fixed" style={{backgroundColor: "black", height: "70px", borderBottom: "solid 0.1px white"}}>
            <div className="flex w-full flex-wrap items-center justify-between px-3">
                <div className="ms-2 navBrand">
                    <a className="text-xl text-black dark:text-white lg:mx-40" href="#">Fess</a>
                </div>
            </div>
        </nav>
    )
}
