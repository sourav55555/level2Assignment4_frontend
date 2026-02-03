import React from 'react';
import MenuPage from './menuPage';
import { Env } from '@/env';
export const revalidate = 0;

const Menu = async () => {
    const data = await fetch(`${Env.BASE_URL}/meals`);
    const response = await data.json();

    return (
        <div>
            <MenuPage data={ response.data} />
        </div>
    );
};

export default Menu;