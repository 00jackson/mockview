"use client";
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

function Header() {
    const path = usePathname();
    const router = useRouter();

    useEffect(() => {
        console.log(path);
    }, [path]);

    const navigateTo = (route) => {
        router.push(route);
    };

    return (
        <div className='flex p-4 items-center justify-between bg-secondary shadow-md'>
            <Image src={'/logo.svg'} width={24} height={24} alt='logo' />
            <ul className='hidden md:flex gap-6'>
                <li
                    className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                    ${path === '/dashboard' ? 'text-primary font-bold' : ''}`}
                    onClick={() => navigateTo('/dashboard')}
                >
                    Dashboard
                </li>
                <li
                    className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                    ${path === '/dashboard/question' ? 'text-primary font-bold' : ''}`}
                    onClick={() => navigateTo('/dashboard/question')}
                >
                    Questions
                </li>
                <li
                    className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                    ${path === '/dashboard/upgrade' ? 'text-primary font-bold' : ''}`}
                    onClick={() => navigateTo('/dashboard/upgrade')}
                >
                    Upgrade
                </li>
                <li
                    className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                    ${path === '/dashboard/how' ? 'text-primary font-bold' : ''}`}
                    onClick={() => navigateTo('/dashboard/how')}
                >
                    How it works?
                </li>
            </ul>
            <UserButton />
        </div>
    );
}

export default Header;