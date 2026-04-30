import { notFound } from "next/navigation";
import AboutUs from "@/app/components/info/about/page";
//import Contact from "../components/info/contact/page";
import Contact from "../contact/page";
import Disclaimer from "@/app/components/info/disclaimer/page";
import Privacypolicy from "@/app/components/info/privacypolicy/page";
import Login from "@/app/components/login/login";
import Forgot from "@/app/components/forgot/forgot";

// Map slugs to components
const pageMap = {
  about: <AboutUs />,
  contact: <Contact />,
  disclaimer: <Disclaimer />,
  privacypolicy: <Privacypolicy />,
  login: <Login />,
  forgot: <Forgot />,
};

export default async function Page({ params }) {
  const { slug } = await params; 

  const page = pageMap[slug];

  if (!page) {
    notFound();
  }

  return page;
}
