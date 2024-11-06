import Image from "next/image";
import illustration1 from "@/public/images/illustration-1.svg";
import illustration2 from "@/public/images/illustration-2.svg";
import illustration3 from "@/public/images/stylist illustration blue.svg";

import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

export function Grid() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="max-w-md rounded-lg  md:min-w-[600px] md:min-h-[600px]"
    >
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center  justify-center p-6">
          <Image src={illustration3} alt="title" />
        </div>
      </ResizablePanel>
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={50}>
            <div className="flex h-full items-center justify-center p-6">
              <Image src={illustration1} alt="title" />
            </div>
          </ResizablePanel>
          <ResizablePanel defaultSize={60}>
            <div className="flex h-full items-center justify-center p-6">
              <Image src={illustration2} alt="title" />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

// export default function Grid() {
//   return (
//     <div className="p-6">
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//         {cards.map((card, index) => (
//           <div
//             key={index}
//             className="relative group bg-white rounded-lg shadow-lg overflow-hidden"
//           >
//             <div className="h-64 relative">
//               <Image
//                 src={card.image}
//                 alt={card.title}
//                 layout="fill"
//                 objectFit="cover"
//               />
//             </div>
//             <div className="p-4">
//               <h3 className="text-lg font-semibold">{card.title}</h3>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
