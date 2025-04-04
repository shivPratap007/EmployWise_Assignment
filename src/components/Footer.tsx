import { Github, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black text-white p-4 text-center">
      <p className="text-sm">
        Made with ❤️ by <span className="font-semibold">Shiv Pratap</span>
      </p>
      <div className="flex justify-center space-x-4 mt-2">
        <a
          href="https://github.com/shivPratap007/EmployWise_Assignment"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github className="hover:text-gray-400 cursor-pointer" />
        </a>
        <a
          href="https://www.linkedin.com/in/shiv-pratap-singh-waghel-23b925289/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Linkedin className="hover:text-gray-400 cursor-pointer" />
        </a>
      </div>
    </footer>
  );
}
