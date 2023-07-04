import tw from "tailwind-styled-components"

export const Container = tw.div`
container
mx-auto
`

export const H1 = tw.h1`
font-black
text-5xl
text-center
md:w-2/3
mx-auto
py-10
`

export const Card = tw.div`
max-w-sm
rounded-xl
overflow-hidden
shadow-lg
m-4
p-2
bg-gray-200
transition
ease-in-out
delay-150
hover:-translate-y-1 
hover:scale-110
duration-300
`

export const CardDiv = tw.div`
px-6
py-4
`

export const ButtonGreen = tw.button`
p-2
text-xl
text-white
bg-green-600
border-l
rounded-lg
shadow-xl
w-full
hover:bg-greem-900
transition
ease-in-out
delay-150
hover:-translate-y-1 
hover:scale-105
duration-300
`

export const ButtonRed = tw.button`
p-2
m-5
text-xl
text-white
bg-red-600
border-l
rounded-lg
shadow-xl
w-full
hover:bg-red-900
transition
ease-in-out
delay-150
hover:-translate-y-1 
hover:scale-102
duration-300
`

export const ModalDefault = tw.div`
relative
w-full
max-w-6xl
max-h-full
shadow-2xl
rounded-xl
bg-gray-200
`

export const ModalHeader = tw.div`
flex
items-start
justify-between
p-4
border-b
rounded-t
border-gray-600
`

export const ModalTitle = tw.h2`
text-xl
font-semibold
text-gray-900
`

export const ModalClose = tw.button`
text-gray-400
bg-transparent
hover:bg-gray-200
hover:text-gray-900
rounded-lg
m-1
p-1
text-xl
ml-auto
ease-in-out
delay-150
hover:-translate-y-1 
hover:scale-102
duration-300 
`
export const ModalContent = tw.div`
flex
`

export const ModalImageContainer = tw.div`
md:w-1/2
lg:w-2/5
m-2
`

export const Image = tw.img`
w-full
h-full
rounded-xl
`

export const ModalContentCointainer = tw.div`
md:w-1/2
lg:w-3/5
overflow-scroll
m-2
`

export const ModalContentHeader = tw.h3`
text-xl
font-semibold
text-gray-900
m-4
`

export const DescriptionP = tw.p`
text-base
leading-relaxed
m-4
`

export const ModalAtributesContainer = tw.div`
w-full
flex
flex-row
flex-wrap
justify-center
`
export const ModalAttributeBox = tw.div`
flex
m-4
p-2
border
rounded-lg
bg-white
border-gray-500
`