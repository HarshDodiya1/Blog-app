import { Button } from "flowbite-react";
import LinkedInProfile from "../assets/LinkedIn.svg";

export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-9 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center ">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl">Connect with me on LinkedIn</h2>
        <p className="text-gray-500 my-2">
          Stay in the loop with my professional journey and latest updates by
          connecting on LinkedIn. Let's grow together!
        </p>
        <Button
          gradientDuoTone="purpleToPink"
          className="rounded-tl-xl rounded-bl-none"
        >
          <a
            href="https://www.linkedin.com/in/harsh-dodiya-197283255/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Go to LinkedIn
          </a>
        </Button>
      </div>
      <div className="p-4 flex-1">
        <img src={LinkedInProfile} className="rounded-md " />
      </div>
    </div>
  );
}
