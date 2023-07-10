import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';

import { Fragment } from 'react';

import { cc } from '../util';

const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
];

export function Navbar() {
  return <nav className="bg-gray-800"></nav>;
}
