import Image from "next/image";
import React from "react";

export default function TempHeader() {
  return (
    <div className="px-[2vw] flex flex-row items-center justify-between h-[12vh] border-b border-gray-300 text-gray-800">
      <div className="flex-1">
        <Image
          src={"/logo.svg"}
          alt=""
          width={1000}
          height={2000}
          className="w-[3.4rem]"
        />
      </div>
      <div className="flex-1 flex flex-row items-center justify-end">
        <button className="px-4 py-2 border border-gray-500 bg-white rounded-[15px]">Feedback</button>
      </div>
    </div>
  );
}
