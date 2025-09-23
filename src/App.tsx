import "./App.css";
import MultiStepForm from "./components/MultiStepForm";
import RatingForm from "./components/RatingForm";
import SocialLinksForm from "./components/SocialLinkForm";

function App() {
  return (
    <>
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <MultiStepForm />
      </div>
      <SocialLinksForm />
      <RatingForm />
    </>
  );
}

export default App;
