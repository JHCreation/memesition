import Navigation from "~/components/nav/Navigation";
import { LinkText_1 } from "../ui/LinkText";

export default function HomeWrapper ({children}) {
  return (
    <div className="">
      <div className="fixed top-0 left-0 z-30 w-full">
        <Nav />
      </div>

      {children}
    </div>
  )
}


const Nav= ()=> {
  return (
    <nav className="bg-paper border-b">
      <div className="flex w-full mx-auto justify-between pl-6 pr-8 py-2">
        <a className="btn btn-ghost btn-sm text-md md:text-xl">memesition</a>
        <ul className="flex items-center gap-10">
          <li className="list_item_1 flex pl-3">
            <span className="leading-none">
              <LinkText_1>About</LinkText_1>
            </span>
          </li>
          <li className="list_item_1 flex pl-3">
            <span className="leading-none">Contact</span>
          </li>
          {/* <li className="list_item_1 flex pl-3">
            <span className="leading-none">about</span>
          </li> */}
        </ul>

        {/* <div className="d_btn links">
          <span className="relative z-10">Login</span>
        </div> */}
      </div>
    </nav>
  )
}