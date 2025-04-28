'use client';

import { useInView } from '@/hooks/use-in-view';
import Image from 'next/image';

export default function BiographySection() {
   const { ref, inView } = useInView({ threshold: 0.1 });

   return (
      <section
         id="biography"
         ref={ref}
         className="py-24 px-6 md:px-12 bg-black relative overflow-hidden
                 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0
                 after:h-40 after:bg-gradient-to-t after:from-black after:to-transparent after:pointer-events-none"
      >
         <div className="max-w-7xl mx-auto relative z-10  ">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-sky-100">Biography</h2>

            <div className="grid md:grid-cols-2 gap-12 items-center">
               <div
                  className={`space-y-6 transition-all duration-700 ${
                     inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
               >
                  <p className="text-gray-300 leading-relaxed text-lg">
                     Introducing Noah Lynch, a Mississippi-born musician whose journey with music
                     began at the age of 6 when he first picked up a guitar. From those early days,
                     Noah&apos;s passion for music has only grown stronger, fueling his desire to
                     share his artistry with the world.
                  </p>

                  <p className="text-gray-300 leading-relaxed text-lg">
                     Drawing inspiration from legends like John Mayer and Stevie Ray Vaughan,
                     Noah&apos;s music blends the soulful melodies of blues with the infectious
                     energy of neo-rock. His sound is a reflection of his upbringing in a small town
                     nestled in Mississippi, where music isn&apos;t the typical claim to fame.
                  </p>

                  <p className="text-gray-300 leading-relaxed text-lg">
                     Noah&apos;s upbringing was marked by the serenade of his guitar strings and the
                     melodies that echoed through his soul. His authentic approach to songwriting
                     captures the essence of human emotion, creating connections with listeners
                     around the world.
                  </p>

                  <div className="pt-4">
                     <a
                        href="#music"
                        className="text-sky-100 font-medium hover:underline inline-flex items-center"
                     >
                        Explore Noah&apos;s Music
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           className="h-4 w-4 ml-2"
                           fill="none"
                           viewBox="0 0 24 24"
                           stroke="currentColor"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                           />
                        </svg>
                     </a>
                  </div>
               </div>

               <div
                  className={`transition-all duration-700 delay-300 ${
                     inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                  }`}
               >
                  <div className="relative">
                     <div className="absolute -inset-4 border border-sky-100/20 transform rotate-3"></div>
                     <div className="relative overflow-hidden">
                        <Image
                           src="/noah-portrait.jpeg"
                           alt="Noah Lynch portrait"
                           width={600}
                           height={600}
                           className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                        />
                     </div>
                     <div className="absolute -inset-4 border border-sky-100/20 transform -rotate-2 z-[-1]"></div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}
