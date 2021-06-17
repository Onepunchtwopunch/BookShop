import React, { useContext } from 'react'
import { useParams } from 'react-router'
import { storeContext } from '../../contexts/StoreContext';

export default function BrandPage() {
    const { id } = useParams();
    const { products, fetchBrandProducts } = useContext(storeContext);

    return (
        <div>

        </div>
    )
}
