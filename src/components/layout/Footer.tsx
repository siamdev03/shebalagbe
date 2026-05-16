import Link from "next/link";
import Image from "next/image";

import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white pt-24 pb-10">

      <div className="max-w-7xl mx-auto px-6">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 border-b border-white/10 pb-16">

          {/* BRAND */}
          <div>

            <Image
              src="/logo-transparent.png"
              alt="ShebaLagbe"
              width={200}
              height={110}
              className="object-contain"
            />

            <p className="mt-6 text-slate-400 leading-relaxed text-lg">
              বাংলাদেশের বিশ্বস্ত লোকাল সার্ভিস
              প্ল্যাটফর্ম। সহজেই খুঁজুন এবং বুক করুন
              আপনার প্রয়োজনীয় সার্ভিস।
            </p>

            {/* SOCIAL */}
            <div className="flex items-center gap-4 mt-8">

              <a
                href="#"
                className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-600 transition-all"
              >
                <FaFacebookF size={18} />
              </a>

              <a
                href="#"
                className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-pink-600 transition-all"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="#"
                className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-500 transition-all"
              >
                <FaLinkedinIn size={18} />
              </a>

            </div>

          </div>

          {/* QUICK LINKS */}
          <div>

            <h3 className="text-2xl font-bold mb-8">
              দ্রুত লিংক
            </h3>

            <div className="flex flex-col gap-5 text-slate-400 text-lg">

              <Link
                href="/"
                className="hover:text-white transition-all"
              >
                হোম
              </Link>

              <Link
                href="/services"
                className="hover:text-white transition-all"
              >
                সার্ভিস
              </Link>

              <Link
                href="/providers"
                className="hover:text-white transition-all"
              >
                প্রোভাইডার
              </Link>

              <Link
                href="/about"
                className="hover:text-white transition-all"
              >
                আমাদের সম্পর্কে
              </Link>

            </div>

          </div>

          {/* SERVICES */}
          <div>

            <h3 className="text-2xl font-bold mb-8">
              জনপ্রিয় সার্ভিস
            </h3>

            <div className="flex flex-col gap-5 text-slate-400 text-lg">

              <p>ল্যাপটপ রিপেয়ার</p>

              <p>আইটি সাপোর্ট</p>

              <p>সিসিটিভি সেটআপ</p>

              <p>ওয়েব সাপোর্ট</p>

              <p>কম্পিউটার সার্ভিস</p>

            </div>

          </div>

          {/* CONTACT */}
          <div>

            <h3 className="text-2xl font-bold mb-8">
              যোগাযোগ
            </h3>

            <div className="flex flex-col gap-6 text-slate-400 text-lg">

              <div className="flex items-center gap-4">

                <Phone
                  size={20}
                  className="text-blue-500"
                />

                <span>
                  +880 1341987864
                </span>

              </div>

              <div className="flex items-center gap-4">

                <Mail
                  size={20}
                  className="text-blue-500"
                />

                <span>
                  siamsalehin1@gmail.com
                </span>

              </div>

              <div className="flex items-center gap-4">

                <MapPin
                  size={20}
                  className="text-blue-500"
                />

                <span>
                  ঢাকা, বাংলাদেশ
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* BOTTOM */}
        <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500">

          <p>
            © ২০২৬ ShebaLagbe. সর্বস্বত্ব সংরক্ষিত।
          </p>

          <div className="flex items-center gap-6">

            <Link
              href="/privacy"
              className="hover:text-white transition-all"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="hover:text-white transition-all"
            >
              Terms & Conditions
            </Link>

          </div>

        </div>

      </div>
    </footer>
  );
}