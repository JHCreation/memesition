import Navigation from "~/components/nav/Navigation";

export default function HomeWrapper ({children}) {
  return (
    <div className="">
      <div className="fixed top-0 left-0 z-30 w-full">
        <Navigation />
      </div>

      {children}
    </div>
  )
}