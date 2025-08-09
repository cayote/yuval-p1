import Image from "next/image";
import Link from "next/link";

export default function AboutMe() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start max-w-2xl">
        <div className="text-center sm:text-left">
          <h1 className="text-4xl font-bold mb-4 tracking-tight">About Me</h1>
          <div className="w-16 h-1 bg-foreground mb-8 mx-auto sm:mx-0"></div>
        </div>
        
        <div className="space-y-6 text-base leading-relaxed text-gray-700 dark:text-gray-300">
          <p>
            Welcome to my portfolio! I&apos;m a passionate developer with a love for creating 
            innovative digital experiences. My journey in technology began with curiosity 
            and has evolved into a career focused on building meaningful solutions.
          </p>
          
          <p>
            I specialize in modern web development, with expertise in technologies like 
            React, Next.js, and TypeScript. I believe in writing clean, maintainable code 
            and creating user-centered applications that make a difference.
          </p>
          
          <p>
            When I&apos;m not coding, you can find me exploring new technologies, contributing 
            to open source projects, or sharing knowledge with the developer community. 
            I&apos;m always excited to take on new challenges and collaborate on interesting projects.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full mt-8">
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-3">Skills</h3>
            <ul className="space-y-2 text-sm">
              <li>• JavaScript/TypeScript</li>
              <li>• React & Next.js</li>
              <li>• Node.js</li>
              <li>• CSS & Tailwind</li>
              <li>• Git & Version Control</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-3">Interests</h3>
            <ul className="space-y-2 text-sm">
              <li>• Web Development</li>
              <li>• Open Source</li>
              <li>• UI/UX Design</li>
              <li>• Tech Innovation</li>
              <li>• Community Building</li>
            </ul>
          </div>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="mailto:contact@example.com"
          >
            Get in Touch
          </a>
          <Link
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto"
            href="/"
          >
            Back to Home
          </Link>
        </div>
      </main>
      
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Home
        </Link>
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/about"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          About
        </Link>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="mailto:contact@example.com"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Contact
        </a>
      </footer>
    </div>
  );
}
