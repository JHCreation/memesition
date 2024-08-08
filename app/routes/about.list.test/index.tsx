import { json, Outlet, useLoaderData, useSearchParams } from "@remix-run/react";
import queryOptions from '~/api/category/queryOption';


import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  useQuery,
} from '@tanstack/react-query'
import { LoaderFunctionArgs } from "@remix-run/node";
import { ReactNode, useRef } from "react";
// import pkg from '@material-tailwind/react';
// const {Button} = pkg;
// import Button from "~/components/ui/Button";


const query= (page,size)=> queryOptions.list(page, size)
const getParams= ({searchParams})=> {
  const page= searchParams.get("page");
  const size= searchParams.get("size");
  const pageVal= Number(page) || 1;
  const sizeVal= Number(size) || 10;
  return { page: pageVal, size: sizeVal }
}

export async function loader({
  request,
}: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const { page, size }= getParams({ searchParams: url.searchParams })

  const queryClient = new QueryClient()
  const { queryKey, queryFn }= query(page, size);
  await queryClient.prefetchQuery({ 
    queryKey, queryFn,
    // staleTime: 5000, 
  } );

  return json({ dehydratedState: dehydrate(queryClient) })
}

function Posts() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { page, size }= getParams({ searchParams: searchParams })
  const { queryKey, queryFn }= query(page, size);
  const { data } = useQuery({ queryKey, queryFn })
  console.log(data, 'server?? client??')

  const modal= useRef<any>(null)
  const onClose= ()=> {
    if( modal?.current ) modal?.current?.showModal()
  }
  return <div className="">
    <span className="text-orange-800">test list.......</span>
    {
      data && 
      <ul className="text-2xs">
      {
        data.category_list.map(d=>{
          return (
            <div key={d.id} className="text-red-200">{d.name}-test</div>
          )
        })
      }
      </ul>
    }
    <button className="btn">Button</button>
    <button className="btn btn-neutral">Neutral</button>
    <button className="btn btn-primary">Primary</button>
    <button className="btn btn-secondary">Secondary</button>
    <button className="btn btn-accent btn-sm md:btn-md">Accent</button>
    <button className="btn btn-ghost">Ghost</button>
    <button className="btn btn-link">Link</button>



    {/* Open the modal using document.getElementById('ID').showModal() method */}
    <button className="btn" onClick={onClose}>open modal</button>
    <dialog ref={modal} id="my_modal_1" className="modal">
      <div className="modal-box max-h-[calc(100vh-1em)]">
        <h3 className="font-bold text-lg">Hello!</h3>
        <p className="py-4">Press ESC key or click the button below to close</p>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>

    <Outlet />


    

  </div>
}

export default function PostsRoute() {
  const { dehydratedState } = useLoaderData<typeof loader>()
  return (
    <HydrationBoundary state={dehydratedState}>
      <Posts />
    </HydrationBoundary>
  )
}


/* export const loader = async () => {
  const { SOME_SECRET, REMIX_API_URL }= process.env;
  const res= await fetch(`${REMIX_API_URL}/api/category/list-all`, {
    method: 'get',
    
    // content_type: 'application/json'
  })
  const data= await res.json()
  // const secret= process.env.SOME_SECRET;
  // const data = await getUsers();
  // console.log(data)
  return data;

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  })

  return json({ dehydratedState: dehydrate(queryClient) })
  
  // return { SOME_SECRET, REMIX_API_URL }
};

export default function AboutList () {
  const data = useLoaderData<any>();
  console.log(data, 'server?? client??')
  return <div className="">
    <span className="text-orange-800">test list.......</span>
    {
      data && 
      <ul className="text-2xs">
      {
        data.category_list.map(d=>{
          return (
            <div key={d.id} className="text-red-200">{d.name}-test</div>
          )
        })
      }
      </ul>
    }
    <Outlet />

  </div>
} */