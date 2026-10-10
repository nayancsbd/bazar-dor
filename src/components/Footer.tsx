import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#fdfdfd] border-t border-gray-200/80 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-gray-500">
          <div className="font-normal text-center sm:text-left text-gray-600">
            বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </div>

          <div className="font-normal text-center sm:text-right text-gray-500">
            সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
