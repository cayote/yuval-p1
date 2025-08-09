"use client";

import Image from "next/image";
import { useState, FormEvent } from "react";

export default function AboutMe() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitted(true);
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <header className="mb-10 md:mb-14">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight lowercase flex items-baseline gap-3">
          <span className="text-foreground/60">#</span>
          <span>about me</span>
        </h1>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <article className="lg:col-span-7 text-base md:text-lg leading-relaxed text-foreground/90 space-y-6">
          <div className="mb-6">
            <Image
              src="/about/yuval.webp"
              alt="Portrait of Yuval Cohen"
              width={1200}
              height={1600}
              className="w-full h-auto rounded-md"
              sizes="(min-width: 1024px) 560px, 100vw"
              priority
            />
          </div>
          <p>
            I’m a graduate of Bezalel Academy of Art and Design with a B.A. in Architecture.
          </p>
          <p>
            My background in the arts - including music, drawing, and design - shapes my approach to architecture, allowing me to conceive and execute projects with a unique perspective and attention to detail.
          </p>
          <p>
            My portfolio showcases a diverse range of work, from intimate personal spaces to urban developments. I believe that each project, whether it involves residential design, complex structures, re-use, or landscape architecture, reflects my commitment to critical thinking and a comprehensive understanding of both form and function.
          </p>

          <div className="pt-2">
            <h2 className="text-xl md:text-2xl font-medium tracking-tight">Yuval cohen</h2>
          </div>
        </article>

        <aside className="lg:col-span-5 w-full">
          <div className="mb-4 flex items-center gap-3">
            <span className="uppercase tracking-wider text-xs text-foreground/60">contact:</span>
            <div className="h-px bg-foreground/20 flex-1" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name<span className="text-red-600">*</span></label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    required
                    className="w-full rounded-md border border-black/10 bg-white/70 px-3 py-2 outline-none focus:border-black/30 focus:ring-2 focus:ring-black/10"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    required
                    className="w-full rounded-md border border-black/10 bg-white/70 px-3 py-2 outline-none focus:border-black/30 focus:ring-2 focus:ring-black/10"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email<span className="text-red-600">*</span></label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                className="w-full rounded-md border border-black/10 bg-white/70 px-3 py-2 outline-none focus:border-black/30 focus:ring-2 focus:ring-black/10"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Subject<span className="text-red-600">*</span></label>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
                className="w-full rounded-md border border-black/10 bg-white/70 px-3 py-2 outline-none focus:border-black/30 focus:ring-2 focus:ring-black/10"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Message<span className="text-red-600">*</span></label>
              <textarea
                name="message"
                placeholder="Write your message..."
                required
                rows={6}
                className="w-full rounded-md border border-black/10 bg-white/70 px-3 py-2 outline-none focus:border-black/30 focus:ring-2 focus:ring-black/10"
              />
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-medium transition-colors hover:bg-foreground/90"
              >
                Send
              </button>
              {isSubmitted && (
                <span className="text-sm text-foreground/80">Thank you!</span>
              )}
            </div>
          </form>
        </aside>
      </section>
    </div>
  );
}
