import React, { Component } from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";

class Navbar extends Component {
  render() {
    return (
      <Disclosure as="nav" className="Navbar">
        {({ open }) => (
          <>
            <div className="flex items-center justify-between px-4 py-2 bg-gray-800 text-white">
              <div className="flex items-center">
                <img className="h-8 w-10" src={logo} alt="Prasetyo Library" />
                <h1 className="ml-2 text-lg font-semibold">Prasetyo Library</h1>
              </div>
              <div className="md:hidden">
                <Disclosure.Button className="p-2 focus:outline-none">
                  {open ? (
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="hidden sm:ml-6 sm:block">
              <div
                className={`flex space-x-4"}`}
                transition="max-height 0.5s ease-in-out"
              >
                <Link
                  to="/"
                  className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Daftar Peminjam
                </Link>
                <Link
                  to="/tambahPeminjam/tbh"
                  className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Peminjaman
                </Link>
              </div>
              </div>

            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link
                  to="/"
                  className="text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium"
                >
                  Daftar Peminjam
                </Link>
                <Link
                  to="/tambahPeminjam/tbh"
                  className="text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium"
                >
                  Peminjaman
                </Link>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    );
  }
}

export default Navbar;
