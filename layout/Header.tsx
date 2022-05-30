import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Branch } from '../schema';
import { getBranches } from '../services';
import logo from '../public/hololive_logo.png';

const Header = () => {
    const [branches, setBranches] = useState<Branch[]>([]);

    useEffect(() => {
        getBranches().then((branch) => setBranches(branch));
    }, []);

    return (
        <div className="container mx-auto mb-8 px-10">
            <div className="inline-block w-full border-b border-blue-400 py-4">
                <div className="block md:float-left">
                    <Link href="/">
                        <Image
                            src={logo}
                            alt="Hololive Production"
                            height="40px"
                            width="150px"
                            className="cursor-pointer align-middle"
                        />
                    </Link>
                </div>
                <div className="hidden md:float-left md:contents">
                    {branches.map((cat) => (
                        <Link key={cat.slug} href={`/branch/${cat.slug}`}>
                            <span className="mt-4 ml-4 cursor-pointer align-middle text-lg font-semibold text-cyan-400 hover:border-b-2 hover:border-b-cyan-700 md:float-right">
                                {cat.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Header;
