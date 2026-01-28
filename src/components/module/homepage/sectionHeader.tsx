import React from 'react';
import { MdOutlineRestaurant } from 'react-icons/md';

const SectionHeader = (
    { title, subtitle }:
    {
        title: string;
        subtitle: string
    }
) => {
    return (
    <div>
            <h3 className="text-secondary uppercase text-sm flex items-center justify-center gap-3 font-semibold">
            <MdOutlineRestaurant />
                { title }
            <MdOutlineRestaurant />
            </h3>
            <p className="text-5xl mx-auto max-w-116 text-center mt-3">{subtitle}</p>
    </div>
    );
};

export default SectionHeader;