import {createContext, ReactNode, useState} from "react";

interface BasketContextProps {
    basketCount: number;
    setBasketCount: (basketCount: number) => void;
    totalPrice: number;
    setTotalPrice: (totalPrice: number) => void;
}

const BasketContext = createContext<BasketContextProps>({
    basketCount: 0,
    setBasketCount: () => {},
    totalPrice: 0,
    setTotalPrice: () => {},
});

export const BasketProvider = ({ children }: { children: ReactNode }) => {
    const [basketCount, setBasketCount] = useState<number>(0);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    return (
        <BasketContext.Provider value = {{ basketCount, setBasketCount, totalPrice, setTotalPrice}}>
            { children }
        </BasketContext.Provider>
    );
};

export default BasketContext;