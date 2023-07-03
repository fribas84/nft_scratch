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
rounded
overflow-hidden
shadow-lg
m-4
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
hover:bg-green-900
transition
ease-in-out
delay-150
hover:-translate-y-1 
hover:scale-105
duration-300
`

export const ButtonRed = tw.button`
p-2
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
hover:scale-105
duration-300
`