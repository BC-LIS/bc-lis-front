import React from 'react'

type CategoryCardProps = {
    categories: string[];
}

const CategoryCard = ({categories}: CategoryCardProps) => {
    
    return (
        <div className='w-full grid grid-cols-5 gap-2'>
            {categories.length > 0 ? (
                categories.map((category, index) => (
                    <div 
                    key={index}
                    className='group relative rounded-xl bg-udea-700 h-14 w-44 flex justify-center items-center text-white font-semibold p-2 overflow-hidden shadow-md transition-all hover:scale-105 hover:brightness-125 before:transition-all before:absolute before:-left-full before:-rotate-45 before:h-20 before:shadow-glasshover before:duration-500 hover:before:left-[calc(100%)]'
                    >

                        <h3 >{category}</h3>
                    </div>
                ))
            ) : (
                <p>Sin categorías</p>
            )}
        </div>
    )

}

export default CategoryCard