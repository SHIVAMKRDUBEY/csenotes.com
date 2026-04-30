import Interview from '@/app/homepage/Showcontent/interview/interview';
import Company from '@/app/homepage/Showcontent/company/company';
import Notes from '@/app/homepage/Showcontent/Notes/notes';
// import Main from '@/app/homepage/main/main';
 import "./homepage.css"; 

export default function Homepage() {
   return (  
    <>
      {/* 🔥 MAIN SEO H1 */}
      <h1 className="main-title">
        CSENOTES - Best Engineering Notes, Interview Question & Handwritten notes
      </h1>

      <section className="section-blue">
        <Notes />
      </section>

      <section className="section-red">
        <Interview />
      </section>

      <section className="section-green">
        <Company />
      </section>

     <section className="section-green">
        {/* <Main /> */}
      </section> 
     
    </>
   );
}
